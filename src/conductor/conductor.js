
/**
 * Intention: Loads Test Files and provides a callback or iteration system
 * Resources:
 *  * https://github.com/mochajs/mocha/wiki/Using-Mocha-programmatically
 *  * https://github.com/mochajs/mocha/issues/2753
 *  * Runner Events: https://mochajs.org/api/runner
 * Usage:
 * var { Conductor } = require('./src/engine/conductor');
 *
 * var config = {
 *     root: './src',
 *     inclusions: ' * / * * / * . s p e c . j s ',
 * };
 * var conductor = new Conductor(config);
 * 
 * conductor.subscribe( Conductor.events.EVENT_RUN_BEGIN, (e) => console.log('@AXLE start', e) );
 * conductor.subscribe( Conductor.events.EVENT_TEST_PASS, (e) => console.log('@AXLE pass', e) );
 * conductor.subscribe( Conductor.events.EVENT_TEST_FAIL, (e) => console.log('@AXLE fail', e) );
 * conductor.subscribe( Conductor.events.EVENT_RUN_END, (e) => console.log('@AXLE end', e) );
 * conductor.files
 *     .then( (files) => conductor.drive() )
 *     .then( () => runner.addListener( Conductor.events.EVENT_RUN_END, (e) => console.log('@AXLE end again', e) ) )
 *     ;
 * 
 * TODO:
 *  * Determine how to provide control to client-code to run tests using Mocha/Chai/etc
 *  * Try to obtain Runner instance to listen to "start" event before calling .run()
 * 
 */
var Mocha = require('mocha')
  , Runner = require('mocha/lib/runner')
  , globby = require('globby')
  ;

var DEFAULT_CONFIG = {
    root: './src',
    inclusions: '*/**/*.spec.js',
    recursive: true,
    ui: 'tdd',
    reporter: 'list',
    delay: 500,
    timeout: (1000 * 10),
};
var events = Runner.constants;  // https://mochajs.org/api/runner

class Conductor extends Mocha {  // rename Conductor to Block (Engine BLock)?
    
    constructor(config = DEFAULT_CONFIG) {
        super(config);
        var config = { ...DEFAULT_CONFIG, ...config };
        var api = new Mocha(this.config);  // TODO: use DI
        var globs = [].concat(config.inclusions).map( (glob) => `${config.root}/${glob}` );
        
        this.events = events;  // TODO: use DI
        this.config = config;
        this.glob = globs;
        this.api = api;
        this.runner = null;
        this.listeners = [ ];
        this.files = this.init();
        
        return this;
    }
    async init() {
        var { api } = this;
        var files = await globby(this.glob);
        var addFile = (file) => api.addFile( file );
        
        files.forEach( (file) => addFile(file) );
        
        return files;
    }
    
    async drive() {
        var { api } = this;
        var files = await this.files;
        var runner = api.run( this.handleExecution.bind(this) );  // https://github.com/mochajs/mocha/issues/2753
        
        if (!files) return Promise.reject( new Error(`No files`) );
        this.runner = runner;
        this.listeners.forEach( ({ channel, handler }) => runner.addListener(channel, handler) );  // broken, may need to run before .run
        
        return runner;
    }
    
    subscribe(channel, handler) {
        this.listeners.push({ channel, handler });
        return this;
    }
    
    handleExecution(failures) {
        var code = { 'true': 1, 'false': 0 }[ !failures ];
        var details = { code, failures };
        console.log(' @Conductor: finished execution with', details);
        process.exitCode = code;
    }
    
}
Conductor.events = events;

module.exports = Conductor;
