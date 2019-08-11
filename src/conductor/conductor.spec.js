
var { expect, assert } = require('chai');
var { Conductor } = require('./index');

var mock = {
    listeners: [],
    files: Promise.resolve([]),
    subscribe: () => {},
    drive: () => {},
};

describe("Conductor", () => {
    
    describe("Instantiation", () => {
        
        it("should have default configuration", () => {
            var conductor = new Conductor({  });
            expect(conductor.config.root).to.equal('./src');
            expect(conductor.config.inclusions).to.equal('*/**/*.spec.js');
            expect(conductor.config.recursive).to.equal(true);
            expect(conductor.config.ui).to.equal('tdd');
            expect(conductor.config.reporter).to.equal('list');
            expect(conductor.config.delay).to.equal(500);
        });
        
    });
    
    
    describe("API", () => {
        
        it("should have static events", () => {
            expect(Conductor.events).to.be.ok;
            expect(Conductor.events).to.not.be.empty;
        });
        
        it("should have public interface", () => {
            var conductor = new Conductor({  });
            expect(conductor.files).to.ok;
            expect(conductor.subscribe).to.ok;
            expect(conductor.drive).to.ok;
            expect(conductor.files).to.be.an.instanceof(Promise);
            assert.isFunction(conductor.subscribe);
            assert.isFunction(conductor.drive);
        });
        
        describe(".subscribe(channel, handler)", () => {
            var conductor = new Conductor({  });
            
            it("should add listeners and return Conductor instance", () => {
                expect( conductor.subscribe('', () => {}) ).to.equal(conductor);
                expect(conductor.listeners.length).to.equal(1);
            });
            
        });
        
        describe(".drive()", () => {
            var conductor = new Conductor({  });
            
            it("should return a promise", () => {
                conductor.drive().catch( (error) => expect(error).to.be.ok );
                conductor.files.then( files => conductor.drive() ).then( runner => expect(runner).to.be.ok );
            });
            
            it("should fail when no files are present", () => {
                // await assert.rejects( () => conductor.drive() );
                conductor.drive().catch( error => expect(error).to.be.ok );
                // expect( () => conductor.drive() ).to.throw();
                // try { conductor.drive() } catch (error) {
                //     expect(error).to.be.ok;
                // }
            });
            it("should succeed when files are present", () => {
                conductor.files.then( files => conductor.drive() ).then( runner => expect(runner).to.be.ok );
            });
            
        });
        
    });
    
    
    describe("File Aggregation", () => {
        var conductor = new Conductor({ root: '../../noop', inclusions: '*/**/*.spec.js' });
        
        it("should use glob patterns to find files", () => {
            conductor.files.then( files => assert.isAtLeast(files.length, 1, "there are at least 1 No-Op files") );
        });
        
    });
    
});
