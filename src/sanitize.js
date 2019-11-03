import { minify } from './utilities'

const safetyTests = [
  {
    test: code => !minify(code).includes('document.') && !minify(code).includes('=document'),
    error: `Access to the document is restricted for this challenge.`
  },
  {
    test: code => !minify(code).includes('window.') && !minify(code).includes('=window'),
    error: `Access to the window is restricted for this challenge.`
  }
]

export default code => {
  let isSafe = true;
  let error = "";

  for(let i = 0; i < safetyTests.length; i++){
    try {
      let passedTest = safetyTests[i].test(code);
      if(!passedTest){
        isSafe = false;
        error = safetyTests[i].error;
        break;
      }
    } catch (e) {
      console.error(e)
      isSafe = false;
      error = `The code you entered could not be determined to be safe to run.`
      break;
    }
  }

  return {isSafe, error}
}
