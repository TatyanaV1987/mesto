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
    this._formElement = formElement;
  }



  //проверяем валидность поля
  // (Функция, которая проверяет formInput на корректность введённых данных и вызывает hideError и showError.)
  _checkInputValidity(inputElement) { // в параметр укажем условное поле инпут
    if (!inputElement.validity.valid) { 
      // Если поле не проходит валидацию, покажем ошибку
      _showInputError(inputElement, inputElement.validationMessage); // вторым аргументом передайте функции showError сообщение об ошибке.
    } else {
      // Если проходит, скроем
      _hideInputError(inputElement);
    }
  };


//функция показа ошибки. Функции передаем параметры: условное поле инпут и сообщение об ошибки
 _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`); // назначим переменной errorElement : в этой форме найти id
    inputElement.classList.add(inputErrorClass); // добавляем к полю класс со стилем RED - border
    errorElement.textContent = errorMessage; // значением поля приравниваем к сообщению об ошибки. Так текст ошибки попадёт в нужное место.
  };
  
  //функция скрытия ошибки. Функции передаем параметр: условное поле инпут
  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass); // удаляем класс со стилем RED - border
    errorElement.textContent = '';
  };

//Создайте функцию hasInvalidInput. Пусть она обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле,
// которое не прошло валидацию?».
_hasInvalidInput(inputList) { // inputList - это типа все поля
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
};

// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
_toggleButtonState(inputList, buttonElement) {

    // Если есть хотя бы один невалидный инпут 
    if (_hasInvalidInput(inputList)) { //Если есть хотя бы одно поле, которое не прошло валидацию
      // сделай кнопку неактивной
      buttonElement.classList.add(inactiveButtonClass); // возьми кнопку и добавь класс inactiveButtonClass
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(inactiveButtonClass);
      buttonElement.removeAttribute("disabled", true);
    }
  };

  // Функция для всех полей ввода на странице
_setEventListeners(formElement) {
    const inputList = Array.from(this._formElement.querySelectorAll(inputSelector));
    const buttonElement = this._formElement.querySelector(submitButtonSelector);

    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      _checkInputValidity(inputElement);
            // чтобы проверять его при изменении любого из полей
      _toggleButtonState(inputList, buttonElement);
    });
  });
  };


  // Функция для всех форм на странице (активации валидации)
enableValidation() {
    const formList = Array.from(this._formElement.querySelectorAll(this._config.formSelector));
    formList.forEach((formElement) => {
      // На каждое поле вешается слушатель
      formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
 
        setEventListeners(formElement);
    });
};
}


  // Запретить кнопку submit

  function disabledButtonState() {
    buttonCardSave.disabled = true;
    buttonCardSave.classList.add(config.inactiveButtonClass);
  }

export { FormValidator };
