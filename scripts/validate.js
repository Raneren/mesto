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
//Функция сброса сообщений об ошибке внутри формы
function skipErrorMessages(formElement, { inputSelector, inputErrorClass }) {
  formElement.querySelectorAll(inputSelector).forEach((inputElement) => {
    const errorElement = formElement.querySelector(
      `.${inputElement.name}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
  });
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
  formElement.addEventListener("reset", function () {
    disableSubmitButton(buttonElement, { inactiveButtonClass });
  });
  formElement.addEventListener("submit", function () {
    disableSubmitButton(buttonElement, { inactiveButtonClass });
  });
  inputList.forEach((inputElement) => {
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
    disableSubmitButton(buttonElement, { inactiveButtonClass });
  } else {
    activeSubmitButton(buttonElement, { inactiveButtonClass });
  }
}
//Функция отключения кнопки сабмита
function disableSubmitButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.disabled = true;
}
//Функция включения кнопки сабмита
function activeSubmitButton(buttonElement, { inactiveButtonClass }) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.disabled = false;
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
