
const replaceDynamicVariable = (data, dynamicData) => {
  if (!dynamicData) {
    return data;
  }
  const regex = /\${[^$]*\}/g;
  const dynamicVariables = data.match(regex);
  if (dynamicVariables) {
    dynamicVariables.forEach(dynamicVariable => {
      const matchedString = dynamicVariable.substring(
        2,
        dynamicVariable.length - 1
      );
      if (dynamicData[matchedString]) {
        data = data.replace(dynamicVariable, dynamicData[matchedString]);
      }
    });
  }
  return data;
};

export default replaceDynamicVariable;
