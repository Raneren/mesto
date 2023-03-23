//Создаём класс для управлениz отображением информации о пользователе на странице
export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileJob = document.querySelector(jobSelector);
  }

  //Метод получения информации из профиля
  getUserInfo() {
    this._userData = {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
    return this._userData;
  }

  //Метод добавления информации в профиль из формы
  setUserInfo(data) {
    this._profileName.textContent = data.name;
    this._profileJob.textContent = data.job;
  }
}
