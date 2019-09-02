
export function logParameter() {
  /**
   * target = Current objects prototype. Example: if you had a User 
   *          object / class, target would be User.prototype
   * 
   * propertyKey = name of the method
   * 
   * parameterIndex = position of the parameter in the argument array
   * 
   * 
   */
  return (target: Object, propertyKey: string, parameterIndex: number)=> {
    // log all the parameters for debugging. Look in your console logs for a 
    // closer look
    console.log('target', target);
    console.log('propertyName', propertyKey);
    console.log('index', parameterIndex);
  
    // generate metadatakey for the respective method
    // to hold the position of the decorated parameters
    const metadataKey = `log_${propertyKey}_parameters`;
    if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(parameterIndex);
    }
    else {
        target[metadataKey] = [parameterIndex];
    }
  }
}
