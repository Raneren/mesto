//Функция вывода сообщения об ошибке
function showInputError(
  formElement,
  inputElement,
  { inputErrorClass },
  errorMessage
) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
}
//Функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement, { inputErrorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = "";
}
//Функция проверки на валидность строки ввода для отображения/скрытия ошибки
function checkInputValidity(formElement, inputElement, { inputErrorClass }) {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      { inputErrorClass },
      inputElement.validationMessage
    );
  } else {
    hideInputError(formElement, inputElement, { inputErrorClass });
  }
}
//Функция установки слушатей на все поля формы
function setEventListeners(
  formElement,
  { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }
) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleSubmitButton(inputList, buttonElement, { inactiveButtonClass });
  inputList.forEach((inputElement) => {
    //ниже убираем все ошибки при открытии поп-апа
    if (inputElement.closest(".popup").classList.contains("popup_opened")) {
      hideInputError(formElement, inputElement, { inputErrorClass });
    }
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, { inputErrorClass });
      toggleSubmitButton(inputList, buttonElement, { inactiveButtonClass });
    });
  });
}
//Функция проверки на валидность строки ввода
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}
//Функция переключения активного состояния кнопки отправки
function toggleSubmitButton(inputList, buttonElement, { inactiveButtonClass }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
}
//Функция активации валидации формы
function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
}) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, {
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
    });
  });
}
