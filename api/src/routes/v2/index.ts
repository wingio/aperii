import { Router } from 'express';
import {scan} from 'dree';
import parseParams from '../../middleware/parseParams';
import Errors from '../../middleware/Errors';

export const v2Router = Router();

const options = {
    extensions: [ 'js' ]
};

let tree;
tree = scan(__dirname , options, file => {
    let path = "/" + file.relativePath.replace(/\#/g, ":").replace(/\\/g, "/").replace(/\.js$/, "").replace("index", "");
    if(path == "/") return;
    console.log(`Loading route: ${path}`);
    const routeFile = require(file.path);
    v2Router.use(path, parseParams(), Errors(),routeFile.default as Router);
});