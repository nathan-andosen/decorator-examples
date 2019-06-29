# Decorator Examples

This repo will help you understand decorator's and give you a good starting point for creating your own decorators. 

Check out the directory _/src_ for useful information and examples of each type of decorator.

Big thanks to this [codeburst article](https://codeburst.io/decorate-your-code-with-typescript-decorators-5be4a4ffecb4).

## Class decorator

[Class decorator](src/class-decorator.ts)

* Allows you to override the constructor of a class

## Method decorator

[Method decorator](src/method-decorator.ts)

* Allows you to override a method's funciton
* Execute code before or after it runs

## Property decorator

[Property decorator](src/property-decorator.ts)

* Can listen to state changes on a class using Javascript's [Property Descriptors](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

# Decorator starting templates

### Class decorator

```javascript
export const classDecorator = (options: any) => {
  return (target: Function) => {
    // save a reference to the original constructor
    const original = target;
  
    // a utility function to generate instances of a class
    function construct(constructor, args) {
      const c: any = function () {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }
  
    // the new constructor behaviour
    const f: any = function (...args) {
      console.log(`New: ${original['name']} is created`);
      return construct(original, args);
    }
  
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
  
    // return new constructor (will override original)
    return f;
  };
};
```

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