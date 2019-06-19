// const replaceDynamicVariable = (data, dynamicData) => {
//   if (!dynamicData) {
//     return data;
//   }
//   const regex = /\${\w+\}/g;
//   let match = "";
//   // eslint-disable-next-line no-cond-assign
//   while ((match = regex.exec(data))) {
//     let matchedString = data.substring(match.index + 2, regex.lastIndex - 1);
//     debugger
//     if (dynamicData[matchedString]) {
//       data = data.replace(
//         data.substring(match.index, regex.lastIndex),
//         dynamicData[matchedString]
//       );
//     }
//   }
//   return data;
// };

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
