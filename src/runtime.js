import { captureLogs } from "./utilities";

let releaseLogs;

export const executeCode = code => {
  try {
    releaseLogs = captureLogs();
    // eslint-disable-next-line no-eval
    const result = eval(`(function(){
  ${code}
})()`);
    const capturedLogs = releaseLogs();
    return { logs: capturedLogs, result, crashed: false };
  } catch (e) {
    releaseLogs();
    return {
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
    };
  } finally {
  }
};

export const testResult = (result, challenge) => {
  let passed = true;
  let i = 0;
  while(i < challenge.tests.length && passed === true){
    passed = challenge.tests[i](result, challenge)
    i++;
  }
  return passed;
}
