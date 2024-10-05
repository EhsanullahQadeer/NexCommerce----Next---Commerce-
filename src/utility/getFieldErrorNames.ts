type FormikErrors = {
    [key: string]: any;
  };
  
  export const getFieldErrorNames = (formikErrors: FormikErrors): string[] => {
    const transformObjectToDotNotation = (
      obj: FormikErrors, 
      prefix: string = "", 
      result: string[] = []
    ): string[] => {
      Object.keys(obj).forEach(key => {
        const value = obj[key];
        if (!value) return;
  
        const nextKey = prefix ? `${prefix}.${key}` : key;
        if (typeof value === "object" && !Array.isArray(value)) {
          transformObjectToDotNotation(value, nextKey, result);
        } else {
          result.push(nextKey);
        }
      });
  
      return result;
    };
  
    return transformObjectToDotNotation(formikErrors);
  };
  