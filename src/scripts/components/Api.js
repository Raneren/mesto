export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._authorization = options.headers["authorization"];
  }
  //Метод для проверки ответа
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  //Метод для получения данных пользователя с сервера
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
  //Метод для отправки данных пользователя на сервер
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => this._checkResponse(res));
  }
  //Метод для получения карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    }).then((res) => this._checkResponse(res));
  }
    //Метод для отправки карточки на сервер
    addNewCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: "POST",
          headers: {
            authorization: this._authorization,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            link: data.link,
          }),
        }).then((res) => this._checkResponse(res));
      }
  // другие методы работы с API
}
