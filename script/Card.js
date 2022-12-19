const popupElementImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const buttonClousePopupImage = popupElementImage.querySelector('.popup__close');
const titlePopupImage = document.querySelector('.popup__title_image');

class Card {
  constructor({ name, link }, templateSelector) {  // data - конструктор получает объект (передать данные в виде объекта, а в самом классе присвоить полям нужные свойства)
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector; // записали селектор в приватное поле. Чтобы выбирать из нескольких шаблонов, сделаем селектор частью конструктора класса. Тогда класс станет универсальным: он научится создавать карточки в разных стилях в зависимости от модификатора. 
  }

  // Получаем шаблон карточки
  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._templateSelector) //найдёт template-элемент. // используем this._templateSelector
      .content //извлечёт его содержимое
      .querySelector(".element") //в содержимом найдёт элемент с классом element
      .cloneNode(true); //клонирует его

    // вернём DOM-элемент карточки
    return cardElement;
  }

  // этот метод генерирует новую карточку: берет шаблон, наполняет его данными из массива - возвращает нополненную полноценную карточку
  generateCard() {
    // Запишем разметку в приватное поле _newCard.
    // Так у других элементов появится доступ к ней.
    this._newCard = this._getTemplate();  // теперь _newCard - это клонированная карточка темплейт

    // Добавим данные
    this._newCard.querySelector(".element__title").textContent = this._name; // находим в "этом" темплейте поле с названием = названию из массива
    const image = this._newCard.querySelector('.element__image'); // присвоим переменной image значение поля с картинкой в "этом" темплейте
    image.src = this._link; // скажем, что картинка в новой карточке будет = ссылки из массива
    image.alt = this._name;; // а ее альт = названию из массива

    this._setEventListeners(); // добавим обработчики

    return this._newCard; // вернем новую сгенирированную карточку  
  }

  _handleOpenPopup() {
    popupImage.src = this._link; // картинка в попап = ссылке из массива
    titlePopupImage.textContent = this._name; //ее название в попап = названию из массива
    popupElementImage.classList.add('popup_opened');
  }

  _handleClosePopup() {
    popupImage.src = '';
    popupElementImage.classList.remove('popup_opened');
  }

  _handleDeliteCard() {
    this._newCard.remove();
    this._newCard = null;
}

  _handleLikeCard(evt) {
    evt.target.classList.toggle('element__image-heart_active');
}

// Устанавливаем слушатели на карточку ( этот метод добавит все обработчики в одном место)
  _setEventListeners() {
    this._newCard.querySelector('.element__image').addEventListener('click', () => {
        this._handleOpenPopup();
      });

    buttonClousePopupImage.addEventListener('click', () => {
        this._handleClosePopup();
      });

    this._newCard.querySelector('.element__image-trash').addEventListener('click', () => {
        this._handleDeliteCard();
      })

    this._newCard.querySelector('.element__image-heart').addEventListener('click', (evt) => {
        this._handleLikeCard(evt);
      })
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
