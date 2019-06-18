import { logParameters, confirmable } from './method-decorator';

export class Test {
  @confirmable('Are you sure?')
  @confirmable('Are you super duper sure?')
  log(message?: string) {
    if (message) {
      console.log(message); return;
    }
    console.log('Log function has executed...');
  } 

  @logParameters('Num:')
  multiple(num1: number, num2: number) {
    return num1 * num2;
  }
}


