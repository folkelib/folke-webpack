#!/usr/bin/env node

"use strict";
const webpack = require('webpack');
const config = require('folke-webpack-config');
const colors = require("supports-color");

const compiler = webpack(config);

const watch = process.argv.length > 2 && process.argv[2] === "-w";

let lastHash = null;
function callback(err, stats){
    if(!watch) {
        // Do not keep cache anymore
        compiler.purgeInputFileSystem();
    }
    if(err) {
        lastHash = null;
        console.error(err.stack || err);
        if(err.details) console.error(err.details);
        if(!watch) {
            process.on("exit", function() {
                process.exit(1);
            });
        }
        return;
    }

    if(stats.hash !== lastHash) {
        lastHash = stats.hash;
        process.stdout.write(stats.toString({colors: colors}) + "\n");
    }
}

if (watch){
    compiler.watch({}, callback);
}
else{
    compiler.run(callback)
}