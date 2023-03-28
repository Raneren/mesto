//Создаём класс для попапов
export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }
  //Метод открытия попапа
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }
  //Метод закрытия поп-апа
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
  //Метод на закрывание попапа кнопкой Esc
  _handleEscClose = (evt)=>{
    if (evt.key === "Escape") {
      this.close();
    }
  };
  //Метод установки слушателей
  setEventListeners() {
    this._popup.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("button_type_close") ||
        evt.target.classList.contains("popup_opened")
      ) {
        this.close();
      }
    });
  }
}
