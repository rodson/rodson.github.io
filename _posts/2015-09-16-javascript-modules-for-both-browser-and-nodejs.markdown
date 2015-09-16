---
layout: post
permalink: javascript-modules-for-both-browser-and-nodejs
date: 2015-09-16 10:03
categories: javascript module nodejs
---

Sometimes, we will want to write some modules which can be reused
in both client and server. Especially when we want to create a
module<!--more--> providing some helper functions.

In this post, I will create a module from scratch. The module will be very simple, just provide a method to escape HTML entities.

## Create a scope
Javascript has function scope, we create private scope for our module
using IIFE. This is important when we working on client side in which
all variables defined outside a function belong to the global scope. 

<pre class="prettyprint language-js">
(function(root, factory) {
    // define the module for varing running environment
}(this, function() {
    // the implement of the module
}));
</pre>

We passed `this` and a `factory` function to the IIFE. The `this` value depends on the running environment. 
<pre class="prettyprint language-js">
// In browser
this === window;
// In NodeJs
this === module.exports;
</pre>
The `factory` function is where we implement our module. Let's get started.

## Write the Module
<pre class="prettyprint language-js">
(function(root, factory) {
    // define the module for varing running environment
}(this, function() {
    var myModule = {};
    myModule.escape = function(html) {
        return String(html)
            .replace(/&/g, '&amp;amp;')
            .replace(/"/g, '&amp;quot;')
            .replace(/'/g, '&amp;#39;')
            .replace(/</g, '&amp;lt;')
            .replace(/>/g, '&amp;gt;');
    }
    return myModule;
}));
</pre>
In the `factory` function. We create a module called `myModule`, define the `escape` function and return `myModule`.

## Define the Module
<pre class="prettyprint language-js">
(function(root, factory) {
    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else {
        root.myModule = factory();
    }
}(this, function() {
    // the implement of the module
}));
</pre>
The `factory` function is being invoked and we can assign it to the relevant
environment inside. In nodeJs, `export.modules = factory();` . In requireJs,
`define([], factory);`. In the browser, `root.myModule = factory();`, because `root === window`, we can use `myModule` as a global variable.

## Conclusion
That's all for how to create a module working in both browser and nodejs. If you want to share your module with others, you need to publish your module by using npm or bower.

