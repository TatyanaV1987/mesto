export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector; // записали селектор в приватное поле. Чтобы выбирать из нескольких шаблонов, сделаем селектор частью конструктора класса. Тогда класс станет универсальным: он научится создавать карточки в разных стилях в зависимости от модификатора.
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector) //найдёт template-элемент. // используем this._cardSelector
      .content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  generateCard() {
    this._newCard = this._getTemplate(); // теперь _newCard - это клонированная карточка темплейт
    this._newCard.querySelector(".element__title").textContent = this._name; // находим в "этом" темплейте поле с названием = названию из массива
    const image = this._newCard.querySelector(".element__image"); // присвоим переменной image значение поля с картинкой в "этом" темплейте
    image.src = this._link;
    image.alt = this._name;
    this._setEventListeners();
    return this._newCard;
  }

  _handleDeliteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle("element__image-heart_active");
  }

  _setEventListeners() {
    this._newCard
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    this._newCard
      .querySelector(".element__image-trash")
      .addEventListener("click", () => {
        this._handleDeliteCard();
      });

    this._newCard
      .querySelector(".element__image-heart")
      .addEventListener("click", (evt) => {
        this._handleLikeCard(evt);
      });
  }
}

export { Card };

// сдесь мы создаем класс Card - это будет "чертеж" общей функцией как вообще создается новая карточка. По сути если все это выполнится - создастся новая карточка со всемы вытекающими условиями
// в нем в конструкторе получаем обект из массива и темплейт

// получаем шаблон карточки
// генерируем новую, с условием наполнения
// пропишим методы : как открывается попап и что в него заносится; как он закрывается; как удаляется карточка; как ставится лайк
// потом создадим метод всех слушателей.

// нам нужно еще в попапе (создания новой карточки) при отправки SUBMIT сгенерировать новую карточку и присвоить значения из импутов попапа в создаваемую карточку
