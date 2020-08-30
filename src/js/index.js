const template = document.querySelector("template");
const goodsList = document.querySelector("ul.goods");
const itemTemplate = template.content.children[0];
const checkboxTemplate = template.content.children[1];

// Представим, что получили это с сервера
let info = [
  {
    name: "foiegras",
    titleTop: "Нямушка",
    titleBottom: "с фуа-гра",
    portions: "10 порций",
    mice: "мышь в подарок",
    addInfo: "",
    weight: "0,5",
    description: "Печень утки разварная с артишоками.",
    isAvailable: "yes",
  },
  {
    name: "fish",
    titleTop: "Нямушка",
    titleBottom: "с рыбой",
    portions: "40 порций",
    mice: "2 мыши в подарок",
    addInfo: "",
    weight: "2",
    description: "Головы щучьи с чесноком да свежайшая сёмгушка.",
    isAvailable: "yes",
  },
  {
    name: "chicken",
    titleTop: "Нямушка",
    titleBottom: "с курой",
    portions: "100 порций",
    mice: "5 мышей в подарок",
    addInfo: "заказчик доволен",
    weight: "5",
    description: "Филе из цыплят с трюфелями в бульоне.",
    isAvailable: "no",
  },
];

function parseInfo(receivedInfo) {
  for (let itemObj of receivedInfo) {
    let itemElem = itemTemplate.cloneNode(true);
    let checkboxElem = checkboxTemplate.cloneNode(true);
    checkboxElem.id = itemObj.name;
    checkboxElem.value = itemObj.name;
    itemElem.dataset.name = itemObj.name;
    itemElem.querySelector(".item__title--top").textContent = itemObj.titleTop;
    itemElem.querySelector(".item__title--bottom").textContent =
      itemObj.titleBottom;
    itemElem.querySelector(".item__portions").textContent = itemObj.portions;
    itemElem.querySelector(".item__mice").textContent = itemObj.mice;
    itemElem.querySelector(".item__additional-info").textContent =
      itemObj.addInfo;
    itemElem.querySelector(".item__weight-num").textContent = itemObj.weight;
    goodsList.append(itemElem);
    document.forms.chosenitems.append(checkboxElem);
  }
}
parseInfo(info);

function itemClickHandler() {
  let item =
    event.target.closest(".item__background") ||
    event.target.closest(".item__buy");
  if (!item) return;
  item = item.closest(".item");
  item.dataset.isSelected === "false"
    ? (item.dataset.isSelected = "true")
    : (item.dataset.isSelected = "false");
  let checkbox = document.querySelector(`#${item.dataset.name}`);
  item.dataset.isSelected === "false"
    ? (checkbox.checked = false)
    : (checkbox.checked = true);
}

document.addEventListener("click", itemClickHandler);
