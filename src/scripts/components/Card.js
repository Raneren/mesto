//Создаём класс для карточек
export default class Card {
  constructor(
    name,
    link,
    likes,
    handleCardClick,
    handleCardDelete,
    templateSelector
  ) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  //Метод добавления/убирания лайка карточки
  _toggleLike(item) {
    item.classList.toggle("button_type_like_active");
  }
  //Метод удаления карточки
  _deleteCard() {
    this._element.remove();
  }
  //Метод установки слушателей на карточку
  _setEventListeners() {
    this._elementPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._element
      .querySelector(".button_type_delete")
      .addEventListener("click", () => {
        this._handleCardDelete();
        document.addEventListener("submit", (evt) => {
          this._deleteCard();
        });
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
    this._elementPhoto = this._element.querySelector(".element__photo");
    this._elementTitle = this._element.querySelector(".element__title");
    this._elementLikesCounter = this._element.querySelector(
      ".element__likes-counter"
    );
    this._elementTitle.textContent = this._name;
    this._elementPhoto.style.backgroundImage = `url(${this._link})`;
    this._elementLikesCounter.textContent = this._likes.length;

    this._setEventListeners();

    return this._element;
  }
}
