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
  //Метод добавления элемента в контейнер в обратном порядке
  reverseAddItem(element) {
    this._container.append(element);
  }
  //Метод для отрисовки элементов
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
