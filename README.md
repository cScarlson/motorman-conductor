
Motorman Conductor
====

## tl;dr
As of now, the tests (`./test.js`) and the source are the best documentation. That said, it ain't Rocket Surgery, but it will keep you from pulling cats & herding teeth to configure a test-runner with some hooks so you can cross your I's and dot your T's on your next project. This is just a simple wrapper around Mocha.

## About
Uses [globby](https://www.npmjs.com/package/globby) for file patterns.

## Installation
    npm i @motorman/conductor -D

## Usage
``` javascript
    var { Conductor } = require('@motoman/conductor');

    var config = {  // see Mocha docs for configs
        root: './src',
        inclusions: '*/**/*.spec.js',  // see @About #globby
    };
    var conductor = new Conductor(config);

    conductor
        .subscribe( Conductor.events[x], () => {} )  // see Mocha docs for events
        .subscribe( Conductor.events[y], () => {} )
        .subscribe( Conductor.events[z], () => {} )
        ;
    conductor.files
        .then( (files) => conductor.drive() )  // <-- returns new promise resolution chain
        .then( (runner) => runner.addListener( Conductor.events[x], () => {} ) )
        ;
```
## Interface
``` javascript
    expect(conductor.files).to.ok;
    expect(conductor.subscribe).to.ok;
    expect(conductor.drive).to.ok;
    expect(conductor.files).to.be.an.instanceof(Promise);
    assert.isFunction(conductor.subscribe);
    assert.isFunction(conductor.drive);
```

## Configuration
See @Usage & MochaJS docs.
### `.root: string`
Where Conductor should start its search for `.inclusions`. The `.root` serves as the prependix to all patterns of inclusions.
### `.inclusions: string | string[]`
Files to include. May be a glob string or an array of glob strings. See [globby](https://www.npmjs.com/package/globby) for more info.
### [EVERYTHING ELSE]
See MochaJS configurations.

## API
### `.files: Promise<string>`
The `.files` property is a Promise which encapsulates an array of paths to files which were found by `.config.inclusions`.
### `.subscribe(channel: string, handler: (...splat) => {}): Conductor`
### `.drive(): Promise<MochajsRunner>`

## ToDo
- @About
- @Configuration docs
- @API docs
- `.npmignore`?
