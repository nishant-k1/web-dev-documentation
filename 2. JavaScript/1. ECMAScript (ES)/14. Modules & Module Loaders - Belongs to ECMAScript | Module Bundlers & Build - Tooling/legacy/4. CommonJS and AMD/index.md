# CommonJS and AMD

- It permanently solved the problem of designing a module in a way that we won't have the interference of global scope where we can overwrite certain variables.
- commonjs solved two problems:
  1. dependency resolution
  2. polution of the global scope.
- we can import different modules or different files using require.

```javascript
var module1 = require("module1");
var module2 = require("module2");
```

- we can export object using export.

```javascript
module.exports = {
  fight: fight,
};
```

- commonjs was createad mainly for the server with nodejs in mind to use for servers and desktop applications. And it's acutally one of the reasons that nodejs became so popular.
- This common JS import and export module system that came before we even had it in the browser made code very easy to share for nodejs programmers.
- people using common js were able to share their code to other programmers so that in nodejs shareing code and using third party code became really really easy.
- With common js, modules load synchronously (javascript has only one callstack).
- So if a module takes a reallly long time to load, we're just waiting there until thate gets loaded and then the next one gets loaded and then we get to run our script. This would not be ideal for browsers where we have useres clicking on buttons, entering data into forms, a lot of interaction, synchronous code on the browser can get really problematic. And that is why commonjs was mainly used on the server.
-
