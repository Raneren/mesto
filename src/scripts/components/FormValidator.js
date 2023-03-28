//Создаём класс валидации формы
export default class FormValidator {
  constructor(object, formElement) {
    this._formElement = formElement;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;

    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
  }
  //Метод вывода сообщения об ошибке
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  //Метод скрытия сообщения об ошибке
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  //Метод сброса ошибок валидации
  resetValidation() {
    this._toggleSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  //Метод проверки на валидность строки ввода для отображения/скрытия ошибки
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //Метод установки слушатей на все поля формы
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButton();
      });
    });
  }

  //Метод проверки на валидность строки ввода
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод переключения активного состояния кнопки отправки
  _toggleSubmitButton() {
    if (this._hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._activeSubmitButton();
    }
  }
  //Метод отключения кнопки сабмита
  _disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  //Метод включения кнопки сабмита
  _activeSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.disabled = false;
  }
  //Метод активации валидации формы
  enableValidation() {
    this._setEventListeners();
  }
}
