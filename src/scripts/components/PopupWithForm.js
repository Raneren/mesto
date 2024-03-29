import Popup from "./Popup.js";
//Создаём класс для попапов с формой
export default class PopupWithForm extends Popup {
  constructor(popupSelector, { formSubmitCallback }) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;

    this._form = this._popup.querySelector(".form");
    this._inputList = Array.from(this._form.querySelectorAll(".form__input"));
  }
  //Метод сбора данных полей формы
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }
  //Метод установки слушателей
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmitCallback(this._getInputValues());
    });
  }
  //Метод закрытия попапа
  close() {
    super.close();
    this._form.reset();
  }
}
