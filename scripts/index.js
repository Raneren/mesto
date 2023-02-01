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
  addNewCard(item.name, item.link);
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
//Функция открытия поп-апа редактирования профиля
function openPopupEdit() {
  popupEdit.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener("click", openPopupEdit);
//Функция открытия поп-апа добавления карточки
function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

addButton.addEventListener("click", openPopupAdd);
//Функция открытия поп-апа просмотра фотографии карточки
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
//Функция закрытия поп-апа
function closePopup() {
  popups.forEach((popup) => {
    popup.classList.remove("popup_opened");
  });
}

closeButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", closePopup);
});
//Функция добавления новой карточки
function addNewCard(name, link) {
  const card = cardTemplate.querySelector(".element").cloneNode(true);
  let cardName = card.querySelector(".element__title");
  let cardPhoto = card.querySelector(".element__photo");
  cardName.textContent = name;
  cardPhoto.style.backgroundImage = `url(${link})`;
  cards.append(card);
}

//Функция добавления/убирания лайка
function toggleLike(item) {
  item.classList.toggle("button_type_like_active");
}

likeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", (evt) => {
    toggleLike(evt.target);
  });
});
//Функция удаления карточки
function deleteCard(item) {
  const card = item.closest(".element");
  card.remove();
}

deleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (evt) => {
    deleteCard(evt.target);
  });
});
//Функция кастомной отправки формы
function handleFormSubmit(evt) {
  evt.preventDefault();

  if (evt.target === editForms[0]) {
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
  } else {
    const card = cardTemplate.querySelector(".element").cloneNode(true);
    let cardName = card.querySelector(".element__title");
    let cardPhoto = card.querySelector(".element__photo");
    cardName.textContent = cardNameInput.value;
    cardPhoto.style.backgroundImage = `url(${cardLinkInput.value})`;

    card.querySelector(".button_type_like").addEventListener("click", (evt) => {
      toggleLike(evt.target);
    });

    card
      .querySelector(".button_type_delete")
      .addEventListener("click", (evt) => {
        deleteCard(evt.target);
      });

    cardPhoto.addEventListener("click", (evt) => {
      openPopupPhotoView(evt.target);
    });

    cards.prepend(card);
  }
  closePopup();
}

editForms.forEach((form) => {
  form.addEventListener("submit", handleFormSubmit);
});
