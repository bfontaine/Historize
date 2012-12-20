Historize
=========

Historize is a jQuery plugin which allows you to keep an history on an input and
a tab-completion system, like in a shell.

**[in development]**

Usage
-----

```js
$('#my-input').historize( options );
```

`options` is an optional object, providing the following optional keys:

* `target`: A function which is called on the input when the user press `Enter`.
  By default, it trigger an 'enter' event and delete the content of the input.
* `complete`: A list of words that should be used for tab-completion, **or**
  a function which gets the input’s value and return a string which will replace
  the current word in the input. If the function has a second argument, it will
  be used as a callback.
* `keys`: An object which can be used to redefine the default keys (`enter` is
  the key number of the `Enter` key, `completion` is the key number of the `tab`
  key, `up` and `down` are used to browse the history)
