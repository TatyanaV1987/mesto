/*
Создайте класс FormValidator, который настраивает валидацию полей формы:
-принимает в конструктор объект настроек с селекторами и классами формы; = config
-принимает вторым параметром элемент той формы, которая валидируется; = formElement
-имеет приватные методы, которые обрабатывают форму: проверяют валидность поля, изменяют состояние кнопки сабмита, устанавливают все обработчики;
-имеет публичный метод enableValidation, который включает валидацию формы.
Для каждой проверяемой формы создайте экземпляр класса FormValidator.
*/

class FormValidator {
  //принимает в конструктор объект настроек с селекторами и классами формы;
  //принимает вторым параметром элемент той формы, которая валидируется;
  constructor(config, formElement) {
    this._config = config;
    this._formSelector = formElement;
    this._formElement = document.querySelector(this._formSelector);
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._submitButton = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  //функция показа ошибки. Функции передаем параметры: условное поле инпут и сообщение об ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    ); // назначим переменной errorElement : в этой форме найти id
    inputElement.classList.add(this._config.inputErrorClass); // добавляем к полю класс со стилем RED - border
    errorElement.textContent = errorMessage; // значением поля приравниваем к сообщению об ошибки. Так текст ошибки попадёт в нужное место.
  }

  //функция скрытия ошибки. Функции передаем параметр: условное поле инпут
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass); // удаляем класс со стилем RED - border
    errorElement.textContent = "";
  }

  //проверяем валидность поля
  // (Функция, которая проверяет formInput на корректность введённых данных и вызывает hideError и showError.)
  _checkInputValidity(inputElement) {
    // в параметр укажем условное поле инпут
    if (!inputElement.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      this._showInputError(inputElement, inputElement.validationMessage); // вторым аргументом передайте функции showError сообщение об ошибке.
    } else {
      // Если проходит, скроем
      this._hideInputError(inputElement);
    }
  }

  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      //Если есть хотя бы одно поле, которое не прошло валидацию
      // сделай кнопку неактивной
      this._submitButton.setAttribute("disabled", true);
      this._submitButton.classList.add(this._config.inactiveButtonClass); // возьми кнопку и добавь класс inactiveButtonClass
    } else {
      // иначе сделай кнопку активной
      this._submitButton.classList.remove(this._config.inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  //Создайте функцию hasInvalidInput. Пусть она обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле,
  // которое не прошло валидацию?».
  _hasInvalidInput() {
    // inputList - это типа все поля
    // проходим по этому массиву методом some
    return this._inputList.some((inputElement) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true
      return !inputElement.validity.valid;
    });
  }

  resetValidation() {
    this._toggleButtonState(); // <== управляем кнопкой ==
    this.inputList.forEach((inputElement) => {
      // чтобы проверять его при изменении любого из полей

      this._hideInputError(inputElement); // <==очищаем ошибки ==
    });
  }

  // Функция для всех форм на странице (активации валидации)
  enableValidation() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}

export { FormValidator };
