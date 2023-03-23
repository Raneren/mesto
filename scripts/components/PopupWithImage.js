import Popup from "./Popup.js";
//Создаём класс для попапов с фото
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._elementPhoto = this._popup.querySelector(".popup__photo");
    this._elementTitle = this._popup.querySelector(".popup__photo-title");
  }
  //Метод открытия окна для просмотра фото карточки
  open(name, link) {
    super.open();
    this._elementTitle.textContent = name;
    this._elementPhoto.style.backgroundImage = `url('${link}')`;
  }
}
