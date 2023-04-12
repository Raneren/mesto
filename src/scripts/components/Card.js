//Создаём класс для карточек
export default class Card {
  constructor(
    {
      data,
      myId,
      handleCardClick,
      handleCardDelete,
      handleCardLike,
      handleCardDeleteLike,
    },
    templateSelector
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._myId = myId;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._handleCardDeleteLike = handleCardDeleteLike;
  }
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }
  //Метод проверки установленного пользователем лайка
  _likedCard() {
    return this._likes.some((data) => data._id === this._myId);
  }
  //Метод добавления/убирания лайка карточки
  _toggleLike() {
    if (this._likedCard()) {
      this._handleCardDeleteLike(this._cardId);
    } else {
      this._handleCardLike(this._cardId);
    }
  }
  //Метод отрисовки добавления/убирания лайка карточки и их колличества
  renderLikes(data) {
    this._likes = data.likes;
    this._elementLikesCounter.textContent = this._likes.length;
    if (this._likedCard()) {
      this._likeButton.classList.add("button_type_like_active");
    } else {
      this._likeButton.classList.remove("button_type_like_active");
    }
  }

  //Метод удаления карточки
  deleteCard() {
    this._element.remove();
  }
  //Метод установки слушателей на карточку
  _setEventListeners() {
    this._elementPhoto.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._deleteButton
      .addEventListener("click", () => {
        this._handleCardDelete(this);
      });

    this._likeButton.addEventListener("click", () => {
      this._toggleLike();
    });
  }
  //Метод создания карточки
  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector(".element__photo");
    this._elementTitle = this._element.querySelector(".element__title");
    this._likeButton = this._element.querySelector(".button_type_like");
    this._elementLikesCounter = this._element.querySelector(
      ".element__likes-counter"
    );
    this._deleteButton = this._element
      .querySelector(".button_type_delete");
    this._elementTitle.textContent = this._name;
    this._elementPhoto.style.backgroundImage = `url(${this._link})`;
    this._elementLikesCounter.textContent = this._likes.length;

    this.renderLikes(this._data);
    //убираем кнопки удаления с чужих карточек
    if (this._userId !== this._myId) {
      this._deleteButton.style.display = "none";
    }
    this._setEventListeners();

    return this._element;
  }
}
