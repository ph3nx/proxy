# Proxy

HTTP(S) Traffic Investigation

## Installation

```
$ npm i [-g] https://github.com/ph3nx/proxy.git
```

## Usage

a. As Node module

```js
var Proxy = require('proxy')
```

b. As command line program

```
$ proxy [port]
```

(requires that the module is installed globally, default port is 8080)

## Tests

To run the test suite, first install the dependencies, then run npm test:

```
$ npm i
$ npm t
```