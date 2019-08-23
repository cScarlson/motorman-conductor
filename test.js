
var { Conductor } = require('@motorman/conductor');

var config = {
    root: './src',
    inclusions: '*/**/*.spec.js',
};
var conductor = new Conductor(config);

conductor.files
    .then( (files) => conductor.drive() )
    ;
