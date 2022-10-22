# simpledom

A tiny, simple, strict, typescript-oriented DOM manipulation API.

* Zero dependencies
* Requires ES6 runtime (for `Array.from()`)
* Library size: 2,064 bytes minified (877 bytes gzip-compressed)
* Works well with `tsc --strict`


## Installation

`npm install @srhazi/simpledom`


## Building

* Note: Minified standalone build depends on [closure-compiler](http://code.google.com/closure/compiler).
* Version `1.1.0` built with
  * typescript version: 2.6.2
  * node version: 4.1.1
  * amdclean version: 2.7.0
  * Closure Compiler version: v20200517 (Built on: 2020-05-18 22:36)


1. `git clone https://github.com/sufianrhazi/simpledom.git`
2. `cd simpledom`
3. `npm install`
4. `s/dist`

## Usage

All functions are named exports with concise names:

```typescript
import * as dom from '@srhazi/simpledom';

// Typesafe document.querySelector()
let form: HTMLFormElement = dom.one(HTMLFormElement, 'form.login');

// Typesafe document.querySelector()
let maybeForm: HTMLFormElement | undefined = dom.ge(HTMLFormElement, 'form.login');

// Typesafe document.querySelectorAll()
let buttons: HTMLButtonElement[] = dom.all(HTMLButtonElement, 'button.primary');

// Typesafe el.querySelector()
let submit: HTMLButtonElement = dom.oneFrom(form, HTMLButtonElement, 'button.submit');

// Typesafe el.querySelector()
let maybeSubmit: HTMLButtonElement | undefined= dom.oneFrom(form, HTMLButtonElement, 'button.submit');

// Typesafe el.querySelectorAll()
let formCheckboxes: HTMLInputElement[] = dom.allFrom(form, HTMLInputElement, 'input[type="checkbox"]');

// Typesafe jQuery.on-lookalike
dom.on(form, 'keypress', HTMLInputElement, 'input[type="text"][name="dotcom-2.0-name"]', (event, el) => {
    // event inferred as KeyboardEvent
    // el inferred as HTMLInputElement
    if ('aeiou'.indexOf(e.key) !== -1) {
        event.preventDefault();
    }
});

// String to Element constructor
let container = dom.build(`
    <ul>
        <li>One</li>
        <li>Two</li>
    </ul>
`);

document.body.appendChild(container);

// String to DocumentFragment constructor
let moreItems = dom.buildMany(`
    <li>Three</li>
    <li>Four</li>
`);

container.appendChild(moreItems);
```
