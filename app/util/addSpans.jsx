const addSpans = data => {
  // const regexSpan = /<span th:[^>]*>.*?<\/span>/g;
  // const regexVariable = /\${[^$]*\}/;
  // const matchedStrings = data.match(regexSpan);
  // if (matchedStrings) {
  //   matchedStrings.forEach(matchedString => {
  //     const dynamicVariable = matchedString.match(regexVariable);
  //     data = data.replace(matchedString, dynamicVariable[0]);
  //   });
  // }
  // var data='<span th:if="${!#strings.isEmpty(#strings.trim(balance))}"> <span th:if="${#strings.contains(balance,\'-\')}" th:remove="tag"> Balance: (<span th:remove="tag" th:text="${balance}">${balance}</span>) </span> <span th:if="${!#strings.contains(balance,\'-\')}" th:remove="tag"> Bala.nce: <span th:remove="tag" th:text="${balance}">${balance}</span> </span> </span>'
  let can = 0,i = 0, ans = [];
  while (i < data.length) {
    if (can === 0 && data[i] == "$" && data[i + 1] == "{") {
      let j = i;
      while (j < data.length && data[j] != "}") {
        j++;
      }
      ans.push({ start: i, end: j });
      i = j;
    } else if (data[i] == "<") {
      if (
        data[i + 1] == "s" &&
        data[i + 2] == "p" &&
        data[i + 3] == "a" &&
        data[i + 4] == "n"
      ) {
        can++;
      } else if (
        data[i + 1] == "/" &&
        data[i + 2] == "s" &&
        data[i + 3] == "p" &&
        data[i + 4] == "a" &&
        data[i + 5] == "n"
      ) {
        can--;
      }
    }
    i++;
  }
  ans.forEach(position => {
    const newData = `<span th:remove="tag" th:text="${data.substring(position["start"], position["end"]+1)}">${data.substring(position["start"], position["end"]+1)}</span>`;
    data =
      data.substring(0, position["start"]) +
      newData +
      data.substring(position["end"] + 1, data.length);
    const newAddition = newData.length - (position["end"] - position["start"] +1);
    ans.forEach(value=> {

      value["start"] = value["start"] + newAddition;
      value["end"] = value["end"] + newAddition;
    })
  });
  return data;
};

export default addSpans;
