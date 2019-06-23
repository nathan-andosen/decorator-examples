# Decorator Examples

This repo will help you understand decorator's and give you a good starting point for creating your own decorators. Check out the directory _/src_ for useful information and examples of each type of decorator.

_work in progress_

## Class decorator

_Todo_

## Method decorator

[Method decorator](src/method-decorator.ts)

* Allows you to override a method's funciton
* Execute code before or after it runs.

## Property decorator

[Property decorator](src/property-decorator.ts)

* Can listen to state changes on a class using Javascript's [Property Descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

# Decorator starting templates

### Class decorator

_Todo_

### Method decorator

```javascript
export const methodDecorator = (options: any) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // keep a reference to the original method
    const originalMethod = descriptor.value;

    // set the method to our new method that will get fired
    descriptor.value = (...args: any[]) => {
      // fire our original method and get the result
      const result = originalMethod.apply(this, args);

      // return our original method result
      return result;
    };
  };
};
```

### Property Decorator

```javascript
export const propertyDecorator = (options: any) => {
  return (target: Object, propertyName: string) => {
    // our property value
    let _val = target[propertyName];

    // our property get method
    const getter = function(this: any) {
      return _val;
    };

    // our property set method
    const setter = function(this: any, newVal) {
      _val = newVal;
    };

    // delete the property and re-assign it
    if (delete target[propertyName]) {
      Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  };
};
```