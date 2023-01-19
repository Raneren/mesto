let editButton = document.querySelector(".button_type__edit");
let closeButton = document.querySelector(".button_type__close");
let submitButton = document.querySelector(".button_type__submit");
let likeButton = document.querySelector("button_type__like");
let popup = document.querySelector(".popup");
let editForm = document.querySelector(".edit-form");
let nameInput = document.querySelector(".edit-form__input_type_name");
let jobInput = document.querySelector(".edit-form__input_type_job");

function openPopup() {
  popup.classList.add("popup_opened");
  let profileName = document.querySelector(".profile__name").textContent;
  let profileJob = document.querySelector(".profile__job").textContent;
  nameInput.value = profileName;
  jobInput.value = profileJob;
}

editButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  let profileName = document.querySelector(".profile__name");
  let profileJob = document.querySelector(".profile__job");
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

editForm.addEventListener("submit", handleFormSubmit);
