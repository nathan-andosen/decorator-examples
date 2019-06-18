
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

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    var _this = undefined;
    /**
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
    // DECORATOR EXAMPLES //////////////////////////////////////////////////////////
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
        __decorate([
            confirmable('Are you sure?'),
            confirmable('Are you super duper sure?')
        ], Test.prototype, "log", null);
        __decorate([
            logParameters('---- ')
        ], Test.prototype, "multiple", null);
        return Test;
    }());
    var testA = new Test();
    var result = testA.multiple(2, 2);
    console.log('testA.multiple(2,2) result = ' + result);

    exports.Test = Test;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
