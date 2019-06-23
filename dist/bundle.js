
(function(l, i, v, e) { v = l.createElement(i); v.async = 1; v.src = '//' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; e = l.getElementsByTagName(i)[0]; e.parentNode.insertBefore(v, e)})(document, 'script');
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.DecoratorExamples = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var _this = undefined;
    /**
     * Method Decorator
     *
     * Simple decorator to log the method name, parameters and output to the console
     *
     * @param {string} prefix Prefix message to add to the console log
     * @returns
     */
    var logParameters = function (prefix) {
        /**
         * target = Either the constructor function of the class for a static member,
         *          or the prototype of the class for an instance member.
         *
         * propertyKey = The name of the member.
         *
         * descriptor = The Property Descriptor for the member. For example, if we
         *              used this decorator on a class called Maths and on a method
         *              called multiple, then the descriptor would be equal to us
         *              doing the below:
         *              Object.getOwnPropertyDescriptor(Maths.prototype, "multiple")
         */
        return function (target, propertyKey, descriptor) {
            // log all the parameters for debugging. Look in your console logs for a 
            // closer look
            console.log('target', target);
            console.log('propertyKey', propertyKey);
            console.log('descriptor', descriptor);
            // keep a reference to the original method
            var originalMethod = descriptor.value;
            // set the method to our new method that will get fired
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                // convert our parameters into a string for logging later
                var params = args.map(function (a) { return JSON.stringify(a); }).join(',');
                // fire our original method and get the result
                var result = originalMethod.apply(_this, args);
                // get the result of our original method as a string
                var output = JSON.stringify(result);
                // log the method call, parameters and out to the console
                console.log(prefix + "Called: " + propertyKey + "(" + params + ") => " + output);
                // return our original method result
                return result;
            };
        };
    };
    // CONFIRMABLE METHOD DECORATOR EXAMPLE //////////////////////////////////////
    /**
     * Decorator that shows a confirm dialog, if the user confirms, the method
     * is executed, if the user cancels, the method is not executed
     *
     * @param {string} message
     * @returns
     */
    var confirmable = function (message) {
        return function (target, propertyKey, descriptor) {
            var originalMethod = descriptor.value;
            descriptor.value = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (confirm(message)) {
                    return originalMethod.apply(_this, args);
                }
                else {
                    return null;
                }
            };
            return descriptor;
        };
    };

    /**
     * Event emitter class to dispatch custom events
     *
     * @export
     * @class EventEmitter
     */
    var EventEmitter = /** @class */ (function () {
        function EventEmitter(target, options) {
            this.target = target;
            this.options = options;
        }
        EventEmitter.prototype.emit = function (data) {
            var eventDetails = __assign({ detail: data }, this.options);
            var event = new CustomEvent(eventDetails.eventName, eventDetails);
            // if we use the @event decorator on a custom element, we can dispatch
            // the event from there, otherwise just use the window object
            if (this.target.dispatchEvent) {
                this.target.dispatchEvent(event);
            }
            else {
                window.dispatchEvent(event);
            }
        };
        return EventEmitter;
    }());
    /**
     * Event property decorator to easily emit events
     *
     *
     * @param {(string|IEventOptions)} [options]
     * @returns
     */
    var event = function (options) {
        return function (target, propertyName) {
            /**
             * Convert camel case to kebab (myEvent becomes my-event)
             *
             * @param {*} string
             * @returns
             */
            var camelToKebab = function (string) {
                return string.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2')
                    .toLowerCase();
            };
            // do not use arrow function for getter, as this is the instance of the
            // class
            var getter = function () {
                var eventOptions;
                if (typeof options === 'string') {
                    eventOptions = { eventName: options };
                }
                else if (options) {
                    eventOptions = options;
                }
                else {
                    eventOptions = {};
                }
                if (!eventOptions.eventName) {
                    eventOptions.eventName = camelToKebab(propertyName);
                }
                return new EventEmitter(this, eventOptions);
            };
            // do not use arrow function for setter, as this is the instance of the
            // class
            var setter = function (newVal) { };
            // delete the property and re-assign it
            if (delete target[propertyName]) {
                Object.defineProperty(target, propertyName, {
                    get: getter,
                    set: setter,
                    enumerable: false,
                    configurable: false
                });
            }
        };
    };

    var Test = /** @class */ (function () {
        function Test() {
        }
        Test.prototype.log = function (message) {
            message = message || 'Log function has executed...';
            console.log(message);
            return message;
        };
        Test.prototype.multiple = function (num1, num2) {
            return num1 * num2;
        };
        Test.prototype.fireAnEvent = function () {
            this.bangBang.emit({ message: 'Hope this works!' });
        };
        __decorate([
            confirmable('Are you sure?'),
            confirmable('Are you super duper sure?')
        ], Test.prototype, "log", null);
        __decorate([
            logParameters('---- ')
        ], Test.prototype, "multiple", null);
        __decorate([
            event()
        ], Test.prototype, "bangBang", void 0);
        return Test;
    }());
    // const testA = new Test();
    // const result = testA.multiple(2,2);
    // console.log('testA.multiple(2,2) result = ' + result);

    exports.Test = Test;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
