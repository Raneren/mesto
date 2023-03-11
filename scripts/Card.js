import {
  openPopup,
  popupPhotoView,
  photoInPopup,
  photoTitleInPopup,
} from "./index.js";
//Создаём класс для карточек
export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }
  //Метод добавления/убирания лайка карточки
  _toggleLike(item) {
    item.classList.toggle("button_type_like_active");
  }
  //Метод удаления карточки
  _deleteCard(item) {
    const card = item.closest(".element");
    card.remove();
  }
  //Метод открытия окна для просмотра фото карточки
  _openPhoto(item) {
    openPopup(popupPhotoView);
    photoInPopup.style.backgroundImage = item.style.backgroundImage;
    const card = item.closest(".element");
    photoTitleInPopup.textContent =
      card.querySelector(".element__title").textContent;
  }
  //Метод установки слушателей на карточку
  _setEventListeners() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", (evt) => {
        this._openPhoto(evt.target);
      });

    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", (evt) => {
        this._deleteCard(evt.target);
      });

    this._element
      .querySelector(".button_type_like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt.target);
      });
  }
  //Метод создания карточки
  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".element__title").textContent = this._name;
    this._element.querySelector(
      ".element__photo"
    ).style.backgroundImage = `url(${this._link})`;

    this._setEventListeners();

    return this._element;
  }
}
