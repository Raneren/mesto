//Создаём класс для отрисовки элементов
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  //Метод добавления элемента в контейнер
  addItem(element) {
    this._container.prepend(element);
  }
  //Метод для отрисовки элементов
  renderItems(items, userId) {
    items.forEach((item) => {
      this._renderer(item, userId);
    });
  }
}
