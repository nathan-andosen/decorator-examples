/**
 * Class Decorator
 * 
 * NOTES:
 * - These decorators are called when the class is declared, not when a 
 *   new instance is created
 * 
 * The example below shows how we can override the constructor of the class,
 * add in extra functionality to it. In this example, we log the name of the
 * construtor
 * 
 */
export function logClass() {
  /**
   * target = constructor of the class
   */
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
    // this is an example of how we are overriding the original constructor,
    // adding in extra functionality, which is logging the name
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

