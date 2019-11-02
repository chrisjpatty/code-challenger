export const isType = (result, type = "") => {
  type = type.toLowerCase();
  if(type === "array"){
    return isArray(result);
  }else{
    return typeof result === type;
  }
}

export const isArray = result => {
  if(typeof result === 'function'){
    return false;
  }else{
    return Array.isArray(result)
  }
}

export const hasLength = (result, length) => {
  if(isType(result, 'function')) return false;
  try {
    let test = result.length === length;
    return test;
  } catch (e) {
    return false;
  }
}

const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export const usedSnippet = (code = '', snippet = '') => {
  let minified = code.replace(/\s+/g, '').replace(/[\n\r]/g, '').toLowerCase();
  snippet = snippet.toLowerCase();
  return minified.includes(snippet)
}

export const usedNumOfSnippet = (code = '', snippet = '', number = 0) => {
  let minified = code.replace(/\s+/g, '').replace(/[\n\r]/g, '').toLowerCase();
  snippet = snippet.toLowerCase();
  const regex = new RegExp(escapeRegExp(snippet), 'g')
  return (minified.match(regex) || []).length === number;
}

export const usedAtLeastNumOfSnippet = (code = '', snippet = '', number = 0) => {
  let minified = code.replace(/\s+/g, '').replace(/[\n\r]/g, '').toLowerCase();
  snippet = snippet.toLowerCase();
  const regex = new RegExp(escapeRegExp(snippet), 'g')
  return (minified.match(regex) || []).length >= number;
}

export const isObject = result => typeof result === 'object' && !isArray(result) && result !== null;
