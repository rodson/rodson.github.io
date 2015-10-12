---
layout: post
permalink: react-components-with-es6+-classes
title: React Components With ES6+ Classes
date: 2015-10-12 12:00
categories: react es6 javascript
---

React is a JavaScript library for creating user interfaces by Facebook. I have learned React for a couple weeks and used it to implement<!--more--> <a href="https://github.com/rodson/react-es6-flux-todolist">TodoMVC</a>. The feature I like most is that we can create React components with ES6+ classes, which provides an elegant way to write OOP code.

In this post, I will create a TextInput Component using both React.createClass method and ES6+ class that extends React.Component. So that we can know the differences between the two ways and have a better understanding of how ES6+ class works.

## Using React.createClass method

<pre class="prettyprint language-js">
var React = require('react');

var TextInput = React.createClass({
  // specify prop types
  propTypes: {
    value: React.PropTypes.string.isRequired
  },
  // set default props
  getDefaultProps: function() {
    return {
      value: ''
    };
  },
  // set initial state
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },
  // render component
  render: function() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    ); 
  },
  // input text change callback
  handleChange: function(e) {
    this.setState({
      value: e.target.value
    });
  }
});

module.exports = TextInput;
</pre>

The TextInput component is very simple, it's nothing more than a normal text input. If we write OOP code like `Java` before, the code above seems not intuitive for defining a component.

## Using ES6+ class

<pre class="prettyprint language-js">
import React from 'react';

class TextInput extends React.Component {

  // specify prop types
  static propTypes = {
    value: React.PropTypes.string.isRequired
  }
  // set default props
  static defaultProps = {
    value: ''
  }
  // set initial state
  state = {
    value: this.props.value
  }
  // render component
  render() {
    return (
      <input
        type="text"
        value={this.state.value}
        onChange={this.handleChange}
      />
    );
  }
  // input text change callback
  handleChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }

}

export default TextInput;
</pre>

As we can see, ES6+ syntax is more terse. We can define method with just method name and parentheses, using static properties for prop types and defaults.

One thing should be noticed is that we use arrow funcion for `handleChange` callback, because method defined with ES6+ will not perform auto binding to component's instance. The body of ES6 arrow functions share the same lexical this as the code that surrounds them.

## Conclusion

ES6 are making things much easier for developers, which enable us to write code similar to many OOP languages such as Java. Although many features of ES6 is not implemented in modern browsers, <a href="http://babeljs.io/">babel</a> provide a way to compile ES6+ code into ES5, so that we can enjoy using ES6+ language features to write React code as much as we do. 