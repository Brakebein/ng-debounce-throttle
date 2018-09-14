# ng-debounce-throttle

AngularJS services for debounce and throttle.

## Why another AngularJS debounce/throttle module?

I know that there already are various versions of modules that provide services for debounce and throttle. However, most of them had something missing. I wanted:

* debounce and throttle service combined in one module
* `leading`, `trailing` flags
* `invokeApply` flags
* `cancel()` method

Code and documentation is partly adopted from

* [Angular Debounce](https://github.com/shahata/angular-debounce) Copyright (c) 2013 Steve
* [angular.throttle](https://github.com/BaggersIO/angular.throttle)

Other/similar modules are: [ng-debottle](https://github.com/ex-machine/ng-debottle), [angular-debounce-throttle](https://github.com/alterx/angular-debounce-throttle), [angular-throttle-debounce](https://github.com/tsaikd/angular-throttle-debounce), [angular-debounce](https://github.com/rubenv/angular-debounce)

## Installation

Install via Bower:

    bower install --save ng-debounce-throttle

```html
<script src="bower_components/ng-debounce-throttle/ng-debounce-throttle.js"></script>
 ```

Install via NPM:

    npm install --save ng-debounce-throttle

```html
<script src="node_modules/ng-debounce-throttle/ng-debounce-throttle.js"></script>
```

Add dependency to your app module:

```javascript
angular.module('myApp', ['ngDebounceThrottle']);
```

## Usage

### $debounce

Service that creates and returns a new debounced version of the passed function, which will postpone its execution until after **delay** milliseconds have elapsed since the last time it was invoked. Useful for implementing behavior that should only happen *after* the input has stopped arriving. For example: recalculating a layout after the window has stopped being resized.

    $debounce(func, delay, [leading=false], [invokeApply=true]);

#### Arguments

|Param|Type|Details|
|---|---|---|
|func|function|The function we want to debounce.|
|delay|number|Number of  milliseconds to wait before invoking the debounced function.|
|leading (optional)|boolean|If true, the function is triggered on the leading instead of the trailing edge of the **delay** interval. Useful for circumstances like preventing accidental double-clicks on a "submit" button from firing a second time. Default: `false`|
|invokeApply (optional)|boolean|If true, an angular digest cycle is triggered (see [$timeout](https://docs.angularjs.org/api/ng/service/$timeout) service for more details). Default: `true`|

#### Returns

A debounced version of the passed function. Any arguments passed to this function will be also passed.

The returned function also has a `cancel()` method, which can be used in case you want to reset the current debounce state. This will prevent the function from being triggered even after **delay** milliseconds have passed from last input. In case **leading** is `true`, the next user input will trigger the debounce.

#### Example

```javascript
angular.module('myApp').controller('myCtrl', ['$element', '$debounce', function ($element, $debounce) {

    var onMouseMove = $debounce(function () {
        console.log('Mouse is resting inside element');
    }, 1000, false, false);

    $element.on('mousemove', onMouseMove);

    $element.on('mouseleave', function () {
        onMouseMove.cancel();
    });

}]);
```

### $throttle

Service that creates and returns a new throttled version of the passed function, which will trigger its execution only every **delay** milliseconds. This is useful to tear down fast iterative events, like `window.resize`.

    $throttle(func, delay, [leading=false], [trailing=true], [invokeApply=false]);

#### Arguments

|Param|Type|Details|
|---|---|---|
|func|function|The function we want to throttle.|
|delay|number|Number of milliseconds to wait between each input before invoking the function.|
|leading (optional)|boolean|If true, the function will be invoked at the startup. Default: `false`|
|trailing (optional)|boolean|If true, the function will be invoked at end of the operation. Default: `true`|
|invokeApply (optional)|boolean|If true, an an angular digest cycle is triggered each time the function is invoked. Default: `false`|

#### Returns

A throttled version of the passed function. Any arguments passed to this function will be also passed.

The returned function also has a `cancel()` method, which can be used in case you want to reset the current throttle state. This will cause that the next input will trigger the function immediately.

#### Example

```javascript
angular.module('myApp').controller('myCtrl', ['$element', '$throttle', function ($element, $throttle) {

    var onMouseMove = $throttle(function (event) {
        console.log(event.offsetX, event.offsetY);
    }, 500);

    $element.on('mousemove', onMouseMove);

}]);
```

## License

See [License](LICENSE)