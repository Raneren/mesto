//Создаём класс для управлениz отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, aboutSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileAbout = document.querySelector(aboutSelector);
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
}
