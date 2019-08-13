
Motorman Conductor
====

### tl;dr
As of now, the tests (`./test.js`) and the source are the best documentation. That said, it ain't Rocket Surgery, but it will keep you from pulling cats & herding teeth to configure a test-runner with some hooks so you can cross your I's and dot your T's on your next project. This is just a simple wrapper around Mocha.

## About
Uses [globby](https://www.npmjs.com/package/globby) for file patterns.

## Installation
    npm i @motorman/conductor -D

## Usage
```javascript
    var { Conductor } = require('./');

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

## Configuration
## Methods

## ToDo
- @About
- @Configuration docs
- @Methods docs
- `.npmignore`?
