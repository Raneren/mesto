export const initialCards = [
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

export const formSelectors = {
  inputSelector: ".form__input",
  submitButtonSelector: ".button_type_submit",
  inactiveButtonClass: "button_type_submit_disabled",
  inputErrorClass: "form__input_type_error",
};
export const popupEditButton = document.querySelector(".button_type_edit");
export const popupAddButton = document.querySelector(".button_type_add");

export const popupEditForm = document.forms.edit_form;
export const popupAddForm = document.forms.add_form;

export const nameInput = document.querySelector(".form__input_type_name");
export const jobInput = document.querySelector(".form__input_type_job");