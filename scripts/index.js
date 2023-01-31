const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const closeButtons = document.querySelectorAll(".button_type_close");
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

const editForms = document.querySelectorAll(".edit-form");
let nameInput = document.querySelector(".edit-form__input_type_name");
let jobInput = document.querySelector(".edit-form__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

initialCards.forEach((item) => {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  let cardName = card.querySelector(".element__title");
  let cardLink = card.querySelector(".element__photo");
  cardName.textContent = item.name;
  cardLink.style.backgroundImage = `url(${item.link})`;
  cards.append(card);
});

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
  popups.forEach((popup) => {
    popup.classList.remove("popup_opened");
  });
}

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", closePopup);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  if (evt.target === editForms[0]) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  } else {
    const card = cardTemplate.querySelector(".element").cloneNode(true);
    let cardName = card.querySelector(".element__title");
    let cardLink = card.querySelector(".element__photo");
    cardName.textContent = cardNameInput.value;
    cardLink.style.backgroundImage = `url(${cardLinkInput.value})`;
    cards.prepend(card);
  }
  closePopup();
}

editForms.forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});
