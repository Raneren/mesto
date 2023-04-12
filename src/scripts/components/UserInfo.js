//Создаём класс для управлениz отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  //Метод получения информации из профиля
  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
  }

  //Метод добавления информации в профиль из формы
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileAbout.textContent = data.about;
  }
  //Метод добавления аватара в профиль из формы
  setUserAvatar(data) {
    this._profileAvatar.src = data.avatar;
  }
}
