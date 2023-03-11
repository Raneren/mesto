//Создаём класс валидации формы
class FormValidator {
  constructor(object) {
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._submitButtonSelector = object.submitButtonSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
  }
  //Метод вывода сообщения об ошибке
  _showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
  }

  //Метод скрытия сообщения об ошибке
  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
  }

  //Метод сброса сообщений об ошибке внутри формы
  _skipErrorMessages(formElement) {
  formElement.querySelectorAll(this._inputSelector).forEach((inputElement) => {
  const errorElement = formElement.querySelector(
  `.${inputElement.name}-error`
  );
  inputElement.classList.remove(this._inputErrorClass);
  errorElement.textContent = "";
  });
  }

  //Метод проверки на валидность строки ввода для отображения/скрытия ошибки
  _checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }

  //Метод установки слушатей на все поля формы
  _setEventListeners(formElement) {
    const inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    formElement.addEventListener("reset", () => {
      this._disableSubmitButton(buttonElement);
    });
    formElement.addEventListener("submit", () => {
      this._disableSubmitButton(buttonElement);
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(formElement, inputElement);
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
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      this._setEventListeners(formElement);
    });
  }
}
