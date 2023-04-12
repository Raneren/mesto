import Popup from "./Popup.js";
//Создаём класс для попапа удаления карточки
export default class PopupDeleteCard extends Popup {
  constructor(popupSelector,{formSubmitCallback}) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector(".form");
  }
  //Помимо открывания получаем Id карточки
  open(cardId) {
    super.open();
    this._cardId = cardId;
  }
  //Устанавливаем слушатели
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._cardId);
      this.close();
    });
  }
}
