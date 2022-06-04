function htmlToXpath(htmlElement) {
  let res = "";
  let current = htmlElement

  if (htmlElement.closest("html") === null) {
    throw new Error("[Error]: This element is not a part of visible dom. Please add element NOT from document.createElement.");
  }

  // check if element is part of full DOM tree
  while (current.tagName.toLowerCase() !== "html") {
    // find nth children this element is located, translate this to xpath and add to res
    const index = [...current.parentElement.children].filter(x => x.tagName === current.tagName).findIndex(x => x.isSameNode(current));

    if (current.parentElement.tagName.toLowerCase() === "html") {
      res = `//html/${current.tagName.toLowerCase()}[${index+1}]` + res
    } else {
      res = `/${current.tagName.toLowerCase()}[${index+1}]` + res
    }

    // update current element to it's parent
    current = current.parentElement;
  }

  return res;
}

module.exports = htmlToXpath;