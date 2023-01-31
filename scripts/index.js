const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const closeButtonPopupEdit = document.querySelector(
  ".button_type_close-popup-edit"
);
const closeButtonPopupAdd = document.querySelector(
  ".button_type_close-popup-add"
);
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
let cardNameInput = document.querySelector(".edit-form__input_type_place");
let cardLinkInput = document.querySelector(".edit-form__input_type_link");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile-info");
const popupAdd = document.querySelector(".popup_type_add-place-card");

let editForm = document.querySelector(".edit-form");
let nameInput = document.querySelector(".edit-form__input_type_name");
let jobInput = document.querySelector(".edit-form__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function addInitilCards() {
  initialCards.forEach((item) => {
    const card = cardTemplate.querySelector(".element").cloneNode(true);
    let cardName = card.querySelector(".element__title");
    let cardLink = card.querySelector(".element__photo");
    cardName.textContent = item.name;
    cardLink.style.backgroundImage = `url(${item.link})`;
    cards.prepend(card);
  });
}
addInitilCards();

function openPopupEdit() {
  popupEdit.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener("click", openPopupEdit);

function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}

addButton.addEventListener("click", openPopupAdd);

function closePopup() {
  popups.forEach(function (popup) {
    popup.classList.remove("popup_opened");
  });
}

closeButtonPopupEdit.addEventListener("click", closePopup);
closeButtonPopupAdd.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

editForm.addEventListener("submit", handleFormSubmit);
