# folke-webpack
Call webpack with the default Folke configuration

## Usage:
Browse to your source directory.

```
npm init
npm install -g typescript typings
npm install folke-webpack --save-dev
npm install folke-default-application
typings init
typings install knockout -S
typings install github:Sidoine/promise -SG
typings install dt~whatwg-fetch -SG
tsc --init
```
Edit your ``package.json`` file. Your ``script`` section should look like this:

```
"scripts": {
    "prepublish": "typings install && folke-webpack",
    "build": "folke-webpack",
    "watch": "folke-webpack -w"
  }
```
You must have an ``index.ts`` script within a ``src`` directory. It should at the minimum contain this:

```
import * as services from './services/services';
import * as ko from 'knockout';
import * as defaultApp from 'folke-default-application';

declare function require(name: string): string;
require('./site.less');

const { folke, defaultMenu } = defaultApp.register(services.services)
folke.start();
```

After these steps you'll need to have CsTs create the services.
