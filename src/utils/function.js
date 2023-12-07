export function extractParamsValue(url, key) {
    if (!url || url === "/") {
      return "";
    }
  
    try {
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);
      const keyValue = searchParams.get(key);
      if (!keyValue) {
        return "";
      }
      return keyValue;
    } catch (error) {
      return "";
    }
  }
  
  export function removeCharsBeforeComma(inputString) {
    const commaIndex = inputString.indexOf(",");
    if (commaIndex !== -1) {
      return inputString.slice(commaIndex + 1);
    }
    return inputString;
  }
  