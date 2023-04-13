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
  popupAvatarForm,
  nameInput,
  aboutInput,
} from "../utils/constants.js";
import { data } from "autoprefixer";

//Переменная для хранения id пользователя
let userId;

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
      cardsRender.reverseAddItem(createCard(cardElement));
    },
  },
  ".elements"
);

//Функция создания карточки
function createCard(item) {
  const card = new Card(
    {
      data: item,
      myId: userId,
      handleCardClick: () => {
        popupWithPhoto.open(item.name, item.link);
      },
      handleCardDelete: (card) => {
        popupDeleteCard.open(card);
      },
      handleCardLike: (cardId) => {
        api
          .addLike(cardId)
          .then((data) => card.renderLikes(data))
          .catch((err) => {
            console.log(err);
          });
      },
      handleCardDeleteLike: (cardId) => {
        api
          .deleteLike(cardId)
          .then((data) => card.renderLikes(data))
          .catch((err) => {
            console.log(err);
          });
      },
    },
    "#element-template"
  );
  const cardElement = card.generateCard();
  return cardElement;
}
//Добавляем данные пользователя и начальные карточки с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id;
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData);
    cardsRender.renderItems(cardsData);
  })
  .catch((err) => console.log(err));

//Активация проверки на валидацию
const popupEditFormValidator = new FormValidator(formSelectors, popupEditForm);
popupEditFormValidator.enableValidation();

const popupAddFormValidator = new FormValidator(formSelectors, popupAddForm);
popupAddFormValidator.enableValidation();

const popupAvatarFormValidator = new FormValidator(
  formSelectors,
  popupAvatarForm
);
popupAvatarFormValidator.enableValidation();

//Класс для данных профиля
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

//Экземпляр класса для попапа удаления карточки
const popupDeleteCard = new PopupDeleteCard(".popup_type_delete-card", {
  formSubmitCallback: (card) => {
    popupDeleteCard.renderLoading(true, "Удаление...", ".button_type_submit");
    api
      .deleteCardOnServer(card._cardId)
      .then(() => {
        card.deleteCard();
      })
      .then(() => {
        popupDeleteCard.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupDeleteCard.renderLoading(false);
      });
  },
});
popupDeleteCard.setEventListeners();

//Экземпляр класса для попапа редактирования аватара
const popupWitchAvatarForm = new PopupWithForm(".popup_type_edit-avatar", {
  formSubmitCallback: (data) => {
    popupWitchAvatarForm.renderLoading(
      true,
      "Сохранение...",
      ".button_type_submit"
    );
    api
      .setUserAvatar(data)
      .then((data) => {
        userInfo.setUserAvatar(data);
      })
      .then(() => {
        popupWitchAvatarForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWitchAvatarForm.renderLoading(false);
      });
  },
});
popupWitchAvatarForm.setEventListeners();

document.querySelector(".profile__edit-icon").addEventListener("click", () => {
  popupWitchAvatarForm.open();
  popupAvatarFormValidator.resetValidation();
});
//Экземпляр класса для попапа редактирования профиля
const popupWitchEditForm = new PopupWithForm(".popup_type_edit-profile-info", {
  formSubmitCallback: (data) => {
    popupWitchEditForm.renderLoading(
      true,
      "Сохранение...",
      ".button_type_submit"
    );
    api
      .setUserInfo(data)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .then(() => {
        popupWitchEditForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWitchEditForm.renderLoading(false);
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
    popupWitchAddForm.renderLoading(
      true,
      "Сохранение...",
      ".button_type_submit"
    );
    api
      .addNewCard(cardData)
      .then((cardData) => {
        cardsRender.addItem(createCard(cardData));
      })
      .then(() => {
        popupWitchAddForm.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        popupWitchAddForm.renderLoading(false);
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
