const innerTextOfSpans = data => {
  const element = document.createElement("div");
  element.innerHTML = data;
  const ans = element.innerText;
  return ans;
};

export default innerTextOfSpans;
