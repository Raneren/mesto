//Создаём класс валидации формы
class FormValidator {
  constructor(object, formElement) {
    this._formElement = formElement;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
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

  //Метод сброса сообщений об ошибке внутри формы
  skipErrorMessages() {
    this._formElement
      .querySelectorAll(this._inputSelector)
      .forEach((inputElement) => {
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
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._formElement.addEventListener("reset", () => {
      this._disableSubmitButton(buttonElement);
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleSubmitButton(inputList, buttonElement);
      });
    });
  }

  //Метод проверки на валидность строки ввода
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Метод переключения активного состояния кнопки отправки
  _toggleSubmitButton(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._activeSubmitButton(buttonElement);
    }
  }
  //Метод отключения кнопки сабмита
  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.disabled = true;
  }
  //Метод включения кнопки сабмита
  _activeSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.disabled = false;
  }
  //Метод активации валидации формы
  enableValidation() {
    this._setEventListeners();
  }
}
