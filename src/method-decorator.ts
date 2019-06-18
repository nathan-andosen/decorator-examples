
export const logParameters = (prefix: string, postfix?: string) => {
  /**
   * target = Either the constructor function of the class for a static member,
   *          or the prototype of the class for an instance member.
   * 
   * propertyKey = The name of the member.
   * 
   * descriptor = The Property Descriptor for the member.
   */
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    console.log('target', target);
    console.log('propertyKey', propertyKey);
    console.log('descriptor', descriptor);
  };
}




// DECORATOR EXAMPLES //////////////////////////////////////////////////////////

/**
 * Decorator that shows a confirm dialog, if the user confirms, the method
 * is executed, if the user cancels, the method is not executed
 *
 * @param {string} message
 * @returns
 */
export const confirmable = (message: string) => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalFunction = descriptor.value;

    descriptor.value = (...args: any[]) => {
      if (confirm(message)) {
        return originalFunction.apply(this, args);
      } else {
        return null;
      }
    }

    return descriptor;
  };
}