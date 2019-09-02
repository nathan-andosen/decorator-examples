
/**
 * Method Decorator
 * 
 * Simple decorator to log the method name, parameters and output to the console
 *
 * @param {string} prefix Prefix message to add to the console log
 * @returns
 */
export function logParameters(prefix: string) {
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
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    // log all the parameters for debugging. Look in your console logs for a 
    // closer look
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);

    // keep a reference to the original method
    const originalMethod = descriptor.value;

    // set the method to our new method that will get fired
    descriptor.value = function() {
      const args: any = arguments;

      // convert our parameters into a string for logging later
      const params = args.map( a=> JSON.stringify(a)).join(',');
      
      // fire our original method and get the result
      const result = originalMethod.apply(this, args);

      // get the result of our original method as a string
      const output = JSON.stringify(result);

      // log the method call, parameters and out to the console
      console.log(`${prefix}Called: ${propertyKey}(${params}) => ${output}`);

      // return our original method result
      return result;
    };
  };
}




// CONFIRMABLE METHOD DECORATOR EXAMPLE //////////////////////////////////////

/**
 * Decorator that shows a confirm dialog, if the user confirms, the method
 * is executed, if the user cancels, the method is not executed
 *
 * @param {string} message
 * @returns
 */
export const confirmable = (message: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function() {
      const args = arguments;
      if (confirm(message)) {
        return originalMethod.apply(this, args);
      } else {
        return null;
      }
    }

    return descriptor;
  };
}