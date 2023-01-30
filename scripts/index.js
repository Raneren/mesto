const editButton = document.querySelector(".button_type_edit");
const addButton = document.querySelector(".button_type_add");
const closeButtonPopupEdit = document.querySelector(
  ".button_type_close-popup-edit"
);
const closeButtonPopupAdd = document.querySelector(
  ".button_type_close-popup-add"
);

const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit-profile-info");
const popupAdd = document.querySelector(".popup_type_add-place-card");

let editForm = document.querySelector(".edit-form");
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
