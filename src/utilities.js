export const captureLogs = () => {
  let capturedLogs = []
  const oldLog = console.log;
  console.log = function (...messages) {
      capturedLogs = [...capturedLogs, ...messages.map(message => ({
        type: "log",
        message
      }))]
      oldLog.apply(console, arguments);
  };
  const oldWarn = console.warn;
  console.warn = function (...messages) {
      capturedLogs = [...capturedLogs, ...messages.map(message => ({
        type: "warn",
        message
      }))]
      oldWarn.apply(console, arguments);
  };
  const oldError = console.error;
  console.error = function (...messages) {
      capturedLogs = [...capturedLogs, ...messages.map(message => ({
        type: "error",
        message
      }))]
      oldError.apply(console, arguments);
  };
  return () => {
    console.log = oldLog;
    console.warn = oldWarn;
    console.error = oldError;
    return capturedLogs;
  }
}
