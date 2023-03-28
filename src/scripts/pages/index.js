import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import "../../pages/index.css";

import {
  initialCards,
  formSelectors,
  popupEditButton,
  popupAddButton,
  popupEditForm,
  popupAddForm,
  nameInput,
  jobInput,
  profileName,
  profileJob,
} from "../utils/constants.js";

//Класс для добавления новых карточек
const cardsRender = new Section(
  {
    renderer: (cardElement) => {
      cardsRender.addItem(createCard(cardElement));
    },
  },
  ".elements"
);

//Функция создания карточки
function createCard(item) {
  const card = new Card(
    item.name,
    item.link,
    () => {
      popupWithPhoto.open(item.name, item.link);
    },
    "#element-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}

//Добавляем 6 карточек из массива
cardsRender.renderItems(initialCards);

//Активация проверки на валидацию
const popupEditFormValidator = new FormValidator(formSelectors, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddFormValidator = new FormValidator(formSelectors, popupAddForm);
popupAddFormValidator.enableValidation();

//Класс для данных профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  jobSelector: ".profile__job",
});
//Экземпляр класса для попапа редактирования профиля
const popupWitchEditForm = new PopupWithForm(".popup_type_edit-profile-info", {
  formSubmitCallback: (data) => {
    userInfo.setUserInfo(data);
  },
});
popupWitchEditForm.setEventListeners();

popupEditButton.addEventListener("click", () => {
  popupWitchEditForm.open();
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  popupEditFormValidator.resetValidation();
});
//Экземпляр класса для попапа добавления карточки
const popupWitchAddForm = new PopupWithForm(".popup_type_add-place-card", {
  formSubmitCallback: ({ place, link }) => {
    cardsRender.addItem(
      createCard({
        name: place,
        link: link,
      })
    );
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
