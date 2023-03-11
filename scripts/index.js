import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

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

const formSelectors = {
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit_disabled",
  inputErrorClass: "form__input_type_error",
};

const cardsContainer = document.querySelector(".elements");

const popupEditButton = document.querySelector(".button_type_edit");
const popupAddButton = document.querySelector(".button_type_add");
const popupCloseButtons = document.querySelectorAll(".button_type_close");

const cardNameInput = document.querySelector(".form__input_type_place");
const cardLinkInput = document.querySelector(".form__input_type_link");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile-info");
const popupAdd = document.querySelector(".popup_type_add-place-card");
export const popupPhotoView = document.querySelector(".popup_type_photo-viewing");

export const photoInPopup = popupPhotoView.querySelector(".popup__photo");
export const photoTitleInPopup = popupPhotoView.querySelector(".popup__photo-title");

const popupEditForm = document.forms.edit_form;
const popupAddForm = document.forms.add_form;

const nameInput = document.querySelector(".form__input_type_name");
const jobInput = document.querySelector(".form__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");


//Добавляем 6 карточек из массива
initialCards.forEach((item) => {
  const card = new Card(item.name, item.link, "#element-template");
  const cardElement = card.generateCard();
  renderNewCard(cardElement, cardsContainer);
});

//Активация проверки на валидацию
const popupEditFormValidator = new FormValidator(formSelectors, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddFormValidator = new FormValidator(formSelectors, popupAddForm);
popupAddFormValidator.enableValidation();

//Функция открытия поп-апа
 export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeOnEscButtton);
}

//Функция закрытия поп-апа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeOnEscButtton);
}
//Функция на закрывание попапа по клику на кнопку или оверлей
function closeOnClick(evt) {
  if (
    evt.target.classList.contains("button_type_close") ||
    evt.target.classList.contains("popup_opened")
  ) {
    closePopup(evt.target.closest(".popup"));
  }
}

popups.forEach((popup) => {
  popup.addEventListener("mousedown", closeOnClick);
});
//Функция на закрывание попапа кнопкой Esc
function closeOnEscButtton(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}
//Функция открытия поп-апа редактирования профиля
function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEditFormValidator.skipErrorMessages();
}

popupEditButton.addEventListener("click", openPopupEdit);
//Функция открытия поп-апа добавления карточки
function openPopupAdd() {
  openPopup(popupAdd);
  popupAddForm.reset();
  popupAddFormValidator.skipErrorMessages();
}

popupAddButton.addEventListener("click", openPopupAdd);

//Функция добавления новой карточки
function renderNewCard(card, container) {
  container.prepend(card);
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
  const card = new Card(
    cardNameInput.value,
    cardLinkInput.value,
    "#element-template"
  );
  const cardElement = card.generateCard();
  renderNewCard(cardElement, cardsContainer);
  closePopup(popupAdd);
}

popupEditForm.addEventListener("submit", handleFormSubmitForEditProfile);
popupAddForm.addEventListener("submit", handleFormSubmitForAddNewCard);
