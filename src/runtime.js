import { captureLogs } from "./utilities";
import testCodeSafety from './sanitize'

let releaseLogs;

export const executeCode = code => (
  new Promise((resolve, reject) => {
    const { isSafe, error } = testCodeSafety(code)
    if(isSafe){
      try {
        releaseLogs = captureLogs();
        // eslint-disable-next-line no-eval
        const result = eval(`(function(){
      ${code}
    })()`);
        const capturedLogs = releaseLogs();
        resolve({ logs: capturedLogs, result, crashed: false });
      } catch (e) {
        releaseLogs();
        resolve({
          result: undefined,
          crashed: true,
          logs: [
            {
              type: "error",
              message: e.message,
            },
            {
              type: "error",
              message: e.stack
            }
          ]
        });
      }
    }else{
      resolve({
        result: undefined,
        crashed: true,
        logs: [
          {
            type: "error",
            message: error
          }
        ]
      })
    }
  })
);

export const testResult = (result, challenge, code) => {
  let passed = true;
  let i = 0;
  while(i < challenge.tests.length && passed === true){
    try {
      passed = (challenge.tests || [])[i](result, challenge, code)
      if(!passed && process.env.NODE_ENV === 'development'){
        console.log(`Failed test at index ${i}`)
      }
    } catch (err) {
      console.error(err)
      passed = false;
    }
    i++;
  }
  return passed;
}
