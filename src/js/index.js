// webptest.js

const template = document.querySelector("template");
const goodsList = document.querySelector("ul.goods");
const itemTemplate = template.content.children[0];
const checkboxTemplate = template.content.children[1];
const topDefaultText = "Сказочное заморское яство";
const topOutOfFocusText = "Котэ не одобряет?";
const bottomDefaultHTML = `Чего сидишь? Порадуй котэ, <span class="item__buy">купи.</span>`;

// data.js

function makeNumbersBold(text) {
  let textArr = text.split(' '); 
  if (isFinite(textArr[0])) {
    textArr[0] = `<b>${textArr[0]}</b>`;
  }
  return textArr.join(' ')
}

function parseInfo(receivedInfo) {
  for (let itemObj of receivedInfo) {
    let itemElem = itemTemplate.cloneNode(true);
    let checkboxElem = checkboxTemplate.cloneNode(true);
    checkboxElem.id = itemObj.name;
    checkboxElem.value = itemObj.name;
    checkboxElem.checked = itemObj.isChecked;
    itemElem.dataset.name = itemObj.name;
    itemElem.dataset.isAvailable = itemObj.isAvailable;
    itemElem.dataset.isChecked = itemObj.isChecked;
    itemElem.dataset.description = itemObj.description;
    itemElem.querySelector(".item__title--top").textContent = itemObj.titleTop;
    itemElem.querySelector(".item__title--bottom").textContent =
      itemObj.titleBottom;
    itemElem.querySelector(".item__portions").innerHTML = makeNumbersBold(itemObj.portions);
    itemElem.querySelector(".item__mice").innerHTML = makeNumbersBold(itemObj.mice);
    itemElem.querySelector(".item__additional-info").textContent =
      itemObj.addInfo;
    itemElem.querySelector(".item__weight-num").textContent = itemObj.weight;
    goodsList.append(itemElem);
    document.forms.chosenitems.append(checkboxElem);
    setCheckbox(itemElem);
    setBottomText(itemElem);
  }
}

parseInfo(data);

function setBottomText(item) {
  let btmText = item.querySelector(".item__bottom-text");
  if (item.dataset.isAvailable === "false") {
    btmText.innerHTML = `Печалька, ${item.querySelector('.item__title--bottom').textContent} закончился.`
    return;
  }
  if (item.dataset.isChecked === "false") {
    btmText.innerHTML = bottomDefaultHTML;
  } else {
    btmText.innerHTML = item.dataset.description;
  }
}

function setCheckbox(item) {
  let checkbox = document.querySelector(`#${item.dataset.name}`);
  if (item.dataset.isAvailable === "false") {
    checkbox.checked = false;
    checkbox.disabled = true;
    return;
  }
  if (item.dataset.isChecked === "false") {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
}

function itemClickHandler() {
  let item =
    event.target.closest(".item__background") ||
    event.target.closest(".item__buy");
  if (!item) return;
  item = item.closest(".item");

  if (item.dataset.isAvailable === "false") return;

  if (item.dataset.isChecked === "false") {
    item.dataset.isChecked  = "true";
  } else {
    item.dataset.isChecked = "false";
  }
  setCheckbox(item);
  setBottomText(item);
}

document.addEventListener("click", itemClickHandler);

function itemLeaveHandler() {
  let item =
    event.target.closest(".item__background") ||
    event.target.closest(".item__buy");
  if (!item) return;
  item = item.closest(".item");
  if (item.dataset.isAvailable === "false") return;
  item.classList.add('mouseout');
  if (item.dataset.isChecked === "true") {
    item.querySelector('.item__header').textContent = topOutOfFocusText
  }
}

function itemEnterHandler() {
  let item =
    event.target.closest(".item__background") ||
    event.target.closest(".item__buy");
  if (!item) return;
  item = item.closest(".item");
  if (item.dataset.isAvailable === "false") return;
  item.classList.remove('mouseout');
  if (item.dataset.isChecked === "true") {
    item.querySelector('.item__header').textContent = topDefaultText;
  }
}

document.addEventListener("mouseout", itemLeaveHandler);
document.addEventListener("mouseover", itemEnterHandler);