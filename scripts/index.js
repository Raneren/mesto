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
let newCard;
const cards = document.querySelector(".elements");
//Добавляем 6 карточек из массива
initialCards.forEach((item) => {
  createNewCard(item.name, item.link);
  renderNewCard(newCard, cards);
});

const popupEditButton = document.querySelector(".button_type_edit");
const popupAddButton = document.querySelector(".button_type_add");
const popupCloseButtons = document.querySelectorAll(".button_type_close");
const cardLikeButtons = document.querySelectorAll(".button_type_like");
const cardDeleteButtons = document.querySelectorAll(".button_type_delete");

const cardNameInput = document.querySelector(".edit-form__input_type_place");
const cardLinkInput = document.querySelector(".edit-form__input_type_link");

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile-info");
const popupAdd = document.querySelector(".popup_type_add-place-card");
const popupPhotoView = document.querySelector(".popup_type_photo-viewing");

const photoInPopup = popupPhotoView.querySelector(".popup__photo");
const photoTitleInPopup = popupPhotoView.querySelector(".popup__photo-title");
const photos = document.querySelectorAll(".element__photo");
const popupEditForms = document.querySelectorAll(".edit-form");
const nameInput = document.querySelector(".edit-form__input_type_name");
const jobInput = document.querySelector(".edit-form__input_type_job");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

//Функция открытия поп-апа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

//Функция закрытия поп-апа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
popupCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});

//Функция открытия поп-апа редактирования профиля
function openPopupEdit() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

popupEditButton.addEventListener("click", openPopupEdit);
//Функция открытия поп-апа добавления карточки
function openPopupAdd() {
  openPopup(popupAdd);
  cardNameInput.value = "";
  cardLinkInput.value = "";
}

popupAddButton.addEventListener("click", openPopupAdd);
//Функция открытия поп-апа просмотра фотографии карточки
function openPopupPhotoView(item) {
  openPopup(popupPhotoView);
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
//Функция создания новой карточки
function createNewCard(name, link) {
  newCard = cardTemplate.querySelector(".element").cloneNode(true);
  let cardName = newCard.querySelector(".element__title");
  let cardPhoto = newCard.querySelector(".element__photo");
  cardName.textContent = name;
  cardPhoto.style.backgroundImage = `url(${link})`;
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

cardLikeButtons.forEach((likeButton) => {
  likeButton.addEventListener("click", (evt) => {
    toggleLike(evt.target);
  });
});
//Функция удаления карточки
function deleteCard(item) {
  const card = item.closest(".element");
  card.remove();
}

cardDeleteButtons.forEach((deleteButton) => {
  deleteButton.addEventListener("click", (evt) => {
    deleteCard(evt.target);
  });
});
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
  createNewCard(cardNameInput.value, cardLinkInput.value);
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

  newCard
  .querySelector(".element__photo")
  .addEventListener("click", (evt) => {
    openPopupPhotoView(evt.target);
  });
  renderNewCard(newCard, cards);
  closePopup(popupAdd);
}

popupEditForms.forEach((form) => {
  if (form.name === "edit-form") {
    form.addEventListener("submit", handleFormSubmitForEditProfile);
  }
  if (form.name === "add-form") {
    form.addEventListener("submit", handleFormSubmitForAddNewCard);
  }
});
