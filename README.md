# Demostrate behavior for import vs require in webpack

Demostrates an issue were compilation errors unexpectly with a dynamic `require` statement with cycles but does not error when using `import`.

to compile

node node_modules/.bin/webpack --config webpack.config.js

to run, open index.html in a web browser.

open index.html


## case 1:

comment out `const enter = require('./deps/enter');` in index.js and ensure `import enter from './deps/enter';` is not commented out.

file: index.js
  imports enter.js
    file: enter.js
      import depB from './dep-b';
        file: dep-b.js
          import depA from './dep-a';
            file: dep-a
              import { bsFunction } from './dep-b';

callstack
  index.js enter()
    deps/enter.js depB()
      deps/dep-b.js depA()
        deps/dep-a.js bsFunction() // works!

## case 2:

comment out `const enter = require('./deps/enter');` in index.js and ensure `import enter from './deps/enter';` is not commented out.

file: index.js
  requires enter.js from within a setTimeout
    file: enter.js
      import depB from './dep-b';
        file: dep-b.js
          import depA from './dep-a';
            file: dep-a
              import { bsFunction } from './dep-b';

callstack
  index.js enter()
    deps/enter.js depB()
      deps/dep-b.js depA()
        deps/dep-a.js bsFunction() // bsFunction is undefined!
