function testWebP(e){let t=new Image;t.onload=t.onerror=function(){e(2===t.height)},t.src="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"}testWebP((function(e){e?document.documentElement.classList.add("webp"):document.documentElement.classList.add("no-webp")}));let data=[{name:"foiegras",titleTop:"Нямушка",titleBottom:"с фуа-гра",portions:"10 порций",mice:"мышь в подарок",addInfo:"",weight:"0,5",description:"Печень утки разварная с артишоками.",isAvailable:!0,isChecked:!1},{name:"fish",titleTop:"Нямушка",titleBottom:"с рыбой",portions:"40 порций",mice:"2 мыши в подарок",addInfo:"",weight:"2",description:"Головы щучьи с чесноком да свежайшая сёмгушка.",isAvailable:!0,isChecked:!0},{name:"chicken",titleTop:"Нямушка",titleBottom:"с курой",portions:"100 порций",mice:"5 мышей в подарок",addInfo:"заказчик доволен",weight:"5",description:"Филе из цыплят с трюфелями в бульоне.",isAvailable:!1,isChecked:!0}];const template=document.querySelector("template"),goodsList=document.querySelector("ul.goods"),itemTemplate=template.content.children[0],checkboxTemplate=template.content.children[1],topDefaultText="Сказочное заморское яство",topOutOfFocusText="Котэ не одобряет?",bottomDefaultHTML='Чего сидишь? Порадуй котэ, <span class="item__buy">купи.</span>';function makeNumbersBold(e){let t=e.split(" ");return isFinite(t[0])&&(t[0]=`<b>${t[0]}</b>`),t.join(" ")}function parseInfo(e){for(let t of e){let e=itemTemplate.cloneNode(!0),o=checkboxTemplate.cloneNode(!0);o.id=t.name,o.value=t.name,o.checked=t.isChecked,e.dataset.name=t.name,e.dataset.isAvailable=t.isAvailable,e.dataset.isChecked=t.isChecked,e.dataset.description=t.description,e.querySelector(".item__title--top").textContent=t.titleTop,e.querySelector(".item__title--bottom").textContent=t.titleBottom,e.querySelector(".item__portions").innerHTML=makeNumbersBold(t.portions),e.querySelector(".item__mice").innerHTML=makeNumbersBold(t.mice),e.querySelector(".item__additional-info").textContent=t.addInfo,e.querySelector(".item__weight-num").textContent=t.weight,goodsList.append(e),document.forms.chosenitems.append(o),setCheckbox(e),setBottomText(e)}}function setBottomText(e){let t=e.querySelector(".item__bottom-text");"false"!==e.dataset.isAvailable?"false"===e.dataset.isChecked?t.innerHTML=bottomDefaultHTML:t.innerHTML=e.dataset.description:t.innerHTML=`Печалька, ${e.querySelector(".item__title--bottom").textContent} закончился.`}function setCheckbox(e){let t=document.querySelector("#"+e.dataset.name);if("false"===e.dataset.isAvailable)return t.checked=!1,void(t.disabled=!0);"false"===e.dataset.isChecked?t.checked=!1:t.checked=!0}function itemClickHandler(){let e=event.target.closest(".item__background")||event.target.closest(".item__buy");e&&(e=e.closest(".item"),"false"!==e.dataset.isAvailable&&("false"===e.dataset.isChecked?e.dataset.isChecked="true":e.dataset.isChecked="false",setCheckbox(e),setBottomText(e)))}function itemLeaveHandler(){let e=event.target.closest(".item__background")||event.target.closest(".item__buy");e&&(e=e.closest(".item"),"false"!==e.dataset.isAvailable&&(e.classList.add("mouseout"),"true"===e.dataset.isChecked&&(e.querySelector(".item__header").textContent=topOutOfFocusText)))}function itemEnterHandler(){let e=event.target.closest(".item__background")||event.target.closest(".item__buy");e&&(e=e.closest(".item"),"false"!==e.dataset.isAvailable&&(e.classList.remove("mouseout"),"true"===e.dataset.isChecked&&(e.querySelector(".item__header").textContent=topDefaultText)))}parseInfo(data),document.addEventListener("click",itemClickHandler),document.addEventListener("mouseout",itemLeaveHandler),document.addEventListener("mouseover",itemEnterHandler);