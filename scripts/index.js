const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#element-template").content;
const cards = document.querySelector(".elements");
//Добавляем 6 карточек из массива
initialCards.forEach((item) => {
  const card = createNewCard(item.name, item.link);
  renderNewCard(card, cards);
});

const popupEditButton = document.querySelector(".button_type_edit");
const popupAddButton = document.querySelector(".button_type_add");
const popupCloseButtons = document.querySelectorAll(".button_type_close");

const cardNameInput = document.querySelector(".form__input_type_place");
const cardLinkInput = document.querySelector(".form__input_type_link");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile-info");
const popupAdd = document.querySelector(".popup_type_add-place-card");
const popupPhotoView = document.querySelector(".popup_type_photo-viewing");

const photoInPopup = popupPhotoView.querySelector(".popup__photo");
const photoTitleInPopup = popupPhotoView.querySelector(".popup__photo-title");

const popupEditForm = document.forms.edit_form;
const popupAddForm = document.forms.add_form;

const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//Функция вывода сообщения об ошибке
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add("form__input_type_error");
  errorElement.textContent = errorMessage;
}
//Функция скрытия сообщения об ошибке
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove("form__input_type_error");
  errorElement.textContent = "";
}
//Функция проверки на валидность строки ввода для отображения/скрытия ошибки
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
//Функция установки слушатей на все поля формы
function setEventListeners(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(".form__input"));
  const buttonElement = formElement.querySelector(".button_type_submit");
  toggleSubmitButton(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    //ниже убираем все ошибки при открытии поп-апа
    if (inputElement.closest(".popup").classList.contains("popup_opened")) {
      hideInputError(formElement, inputElement);
    }
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      toggleSubmitButton(inputList, buttonElement);
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
function toggleSubmitButton(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("button_type_submit_disabled");
  } else {
    buttonElement.classList.remove("button_type_submit_disabled");
  }
}
//Функция активации валидации формы
function enableValidation(formElement) {
  setEventListeners(formElement);
}
//Функция открытия поп-апа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Функция закрытия поп-апа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
//Закрывание кликом
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("button_type_close") ||
      evt.target.classList.contains("popup")
    ) {
      closePopup(evt.target.closest(".popup"));
    }
  });
});
//Закрывание кнопкой Esc
document.addEventListener("keydown", (evt) => {
  popups.forEach((popup) => {
    if (evt.key === "Escape" && popup.classList.contains("popup_opened")) {
      closePopup(popup);
    }
  });
});
//Функция открытия поп-апа редактирования профиля
function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  enableValidation(popupEditForm);
}

popupEditButton.addEventListener("click", openPopupEdit);
//Функция открытия поп-апа добавления карточки
function openPopupAdd() {
  openPopup(popupAdd);
  cardNameInput.value = "";
  cardLinkInput.value = "";
  enableValidation(popupAddForm);
}

popupAddButton.addEventListener("click", openPopupAdd);
//Функция открытия поп-апа просмотра фотографии карточки
function openPopupPhotoView(item) {
  openPopup(popupPhotoView);
  photoInPopup.style.backgroundImage = item.style.backgroundImage;
  const card = item.closest(".element");
  photoTitleInPopup.textContent =
    card.querySelector(".element__title").textContent;
}
//Функция создания новой карточки
function createNewCard(name, link) {
  const newCard = cardTemplate.querySelector(".element").cloneNode(true);
  const cardName = newCard.querySelector(".element__title");
  const cardPhoto = newCard.querySelector(".element__photo");
  cardName.textContent = name;
  cardPhoto.style.backgroundImage = `url(${link})`;
  newCard
    .querySelector(".button_type_like")
    .addEventListener("click", (evt) => {
      toggleLike(evt.target);
    });

  newCard
    .querySelector(".button_type_delete")
    .addEventListener("click", (evt) => {
      deleteCard(evt.target);
    });

  newCard.querySelector(".element__photo").addEventListener("click", (evt) => {
    openPopupPhotoView(evt.target);
  });
  return newCard;
}
//Функция добавления новой карточки
function renderNewCard(card, container) {
  container.prepend(card);
}
//Функция добавления/убирания лайка
function toggleLike(item) {
  item.classList.toggle("button_type_like_active");
}
//Функция удаления карточки
function deleteCard(item) {
  const card = item.closest(".element");
  card.remove();
}
//Функция кастомной отправки формы редактирования профиля
function handleFormSubmitForEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
//Функция кастомной отправки формы добаления карточки
function handleFormSubmitForAddNewCard(evt) {
  evt.preventDefault();
  const card = createNewCard(cardNameInput.value, cardLinkInput.value);
  renderNewCard(card, cards);
  closePopup(popupAdd);
}

popupEditForm.addEventListener("submit", handleFormSubmitForEditProfile);
popupAddForm.addEventListener("submit", handleFormSubmitForAddNewCard);
