import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import Section from "../components/Section.js";
import "../../pages/index.css";
import Api from "../components/Api.js";

import {
  formSelectors,
  popupEditButton,
  popupAddButton,
  popupEditForm,
  popupAddForm,
  nameInput,
  aboutInput,
} from "../utils/constants.js";
import { data } from "autoprefixer";

//Класс для работы с Api
const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  headers: {
    authorization: "7edc4154-b999-4c4d-8ba9-f78a6b32f685",
  },
});
//Класс для добавления новых карточек
const cardsRender = new Section(
  {
    renderer: (cardElement) => {
      cardsRender.addItem(createCard(cardElement));
    },
  },
  ".elements"
);
//Экземпляр класса для попапа удаления карточки
const popupDeleteCard = new PopupDeleteCard(".popup_type_delete-card");
popupDeleteCard.setEventListeners();

//Функция создания карточки
function createCard(item) {
  const card = new Card(
    item.name,
    item.link,
    item.likes,
    () => {
      popupWithPhoto.open(item.name, item.link);
    },
    () => {
      popupDeleteCard.open();
    },
    "#element-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}
//Добавляем карточки с сервера
api.getInitialCards().then((data) => cardsRender.renderItems(data));
//Активация проверки на валидацию
const popupEditFormValidator = new FormValidator(formSelectors, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddFormValidator = new FormValidator(formSelectors, popupAddForm);
popupAddFormValidator.enableValidation();

//Класс для данных профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
});
//Добавляем данные пользователя с сервера
api.getUserInfo().then((data) => {
  userInfo.setUserInfo(data);
});
//Экземпляр класса для попапа редактирования профиля
const popupWitchEditForm = new PopupWithForm(".popup_type_edit-profile-info", {
  formSubmitCallback: (data) => {
    api.setUserInfo(data).then((data) => {
      userInfo.setUserInfo(data);
    });
  },
});
popupWitchEditForm.setEventListeners();

popupEditButton.addEventListener("click", () => {
  popupWitchEditForm.open();
  ({ name: nameInput.value, about: aboutInput.value } = userInfo.getUserInfo());
  popupEditFormValidator.resetValidation();
});
//Экземпляр класса для попапа добавления карточки
const popupWitchAddForm = new PopupWithForm(".popup_type_add-place-card", {
  formSubmitCallback: (cardData) => {
    api.addNewCard(cardData).then((cardData) => {
      cardsRender.addItem(createCard(cardData));
    });
  },
});
popupWitchAddForm.setEventListeners();

popupAddButton.addEventListener("click", () => {
  popupWitchAddForm.open();
  popupAddFormValidator.resetValidation();
});
//Экземпляр класска для просмотра фото карточки
const popupWithPhoto = new PopupWithImage(".popup_type_photo-viewing");
popupWithPhoto.setEventListeners();
