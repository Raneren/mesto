let editButton = document.querySelector(".button_type_edit");
let closeButton = document.querySelector(".button_type_close");

let popup = document.querySelector(".popup");
let editForm = document.querySelector(".edit-form");
let nameInput = document.querySelector(".edit-form__input_type_name");
let jobInput = document.querySelector(".edit-form__input_type_job");
let profileName = document.querySelector(".profile__name");
let profileJob = document.querySelector(".profile__job");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

editButton.addEventListener("click", openPopup);

function closePopup() {
  popup.classList.remove("popup_opened");
}

closeButton.addEventListener("click", closePopup);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  popup.classList.remove("popup_opened");
}

editForm.addEventListener("submit", handleFormSubmit);
