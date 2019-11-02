export const isType = (result, type = "") => {
  type = type.toLowerCase();
  if(type === "array"){
    return Array.isArray(result);
  }else{
    return typeof result === type;
  }
}

export const isArray = result => Array.isArray(result)

export const hasLength = (result, length) => {
  try {
    let test = result.length === length;
    return test;
  } catch (e) {
    return false;
  }
}
