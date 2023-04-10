import Popup from "./Popup.js";
//Создаём класс для попапа удаления карточки
export default class PopupDeleteCard extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.close();
    });
  }
}
