import { logParameters, confirmable } from './method-decorator';
import { logProperty, event, EventEmitter } from './property-decorator';
import { logParameter } from './parameter-decorator';
import { logClass } from './class-decorator';

@logClass()
export class Test {
  @confirmable('Are you sure?')
  @confirmable('Are you super duper sure?')
  log(message?: string): string {
    message = message || 'Log function has executed...';
    console.log(message);
    return message;
  } 

  @logParameters('---- ')
  multiple(num1: number, num2: number) {
    return num1 * num2;
  }

  // @logProperty() propOne: string = 'Nathan';


  @event() bangBang: EventEmitter;

  fireAnEvent() {
    this.bangBang.emit({ message: 'Hope this works!'});
  }

  sayHi(@logParameter() message: string) {
    console.log(`hello ${message}`);
  }
}


// const testA = new Test();
// const result = testA.multiple(2,2);
// console.log('testA.multiple(2,2) result = ' + result);

