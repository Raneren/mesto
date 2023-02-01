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

initialCards.forEach((item) => {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  let cardName = card.querySelector(".element__title");
  let cardLink = card.querySelector(".element__photo");
  cardName.textContent = item.name;
  cardLink.style.backgroundImage = `url(${item.link})`;
  cards.append(card);
});

const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const closeButtons = document.querySelectorAll(".button_type_close");
const likeButtons = document.querySelectorAll(".button_type_like");
const deleteButtons = document.querySelectorAll(".button_type_delete");

let cardNameInput = document.querySelector(".edit-form__input_type_place");
let cardLinkInput = document.querySelector(".edit-form__input_type_link");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile-info");
const popupAdd = document.querySelector(".popup_type_add-place-card");
const popupPhotoView = document.querySelector(".popup_type_photo-viewing");

let photoInPopup = popupPhotoView.querySelector(".popup__photo");
let photoTitleInPopup = popupPhotoView.querySelector(".popup__photo-title");
const photos = document.querySelectorAll(".element__photo");
const editForms = document.querySelectorAll(".edit-form");
let nameInput = document.querySelector(".edit-form__input_type_name");
let jobInput = document.querySelector(".edit-form__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function openPopupEdit() {
  popupEdit.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener("click", openPopupEdit);

function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
  cardNameInput.value = "";
  cardLinkInput.value = "";
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

    card.querySelector(".button_type_like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("button_type_like_active");
    });
    card
      .querySelector(".button_type_delete")
      .addEventListener("click", (evt) => {
        let card = evt.target.closest(".element");
        card.remove();
      });

    cardLink.addEventListener("click", (evt) => {
      openPopupPhotoView(evt.target);
    });

    cards.prepend(card);
  }
  closePopup();
}

editForms.forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("button_type_like_active");
  });
});

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (evt) => {
    const card = evt.target.closest(".element");
    card.remove();
  });
});

function openPopupPhotoView(item) {
  popupPhotoView.classList.add("popup_opened");
  photoInPopup.style.backgroundImage = item.style.backgroundImage;
  let card = item.closest(".element");
  photoTitleInPopup.textContent =
    card.querySelector(".element__title").textContent;
}

photos.forEach((photo) => {
  photo.addEventListener("click", (evt) => {
    openPopupPhotoView(evt.target);
  });
});
