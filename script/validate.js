// Функция для всех форм на странице
const enableValidation = (configElement) => {
    const formList = Array.from(document.querySelectorAll(configElement.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
 
        setEventListeners(formElement);
    });
};

enableValidation(config);



//функция показа ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass); // добавляем к полю класс со стилем RED - border
  errorElement.textContent = errorMessage; // значением поля приравниваем к сообщению об ошибки. Так текст ошибки попадёт в нужное место.
};

//функция скрытия ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass); // удаляем класс со стилем RED - border
  errorElement.textContent = '';
};


// Функция, которая проверяет formInput на корректность введённых данных и вызывает hideError и showError.
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage); // вторым аргументом передайте функции showError сообщение об ошибке.
  } else {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  }
};



// Функция для всех полей ввода на странице
function setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
            // чтобы проверять его при изменении любого из полей
            toggleButtonState(inputList, buttonElement);
    });
  });
  };




//Создайте функцию hasInvalidInput. Пусть она обходит массив полей и отвечает на вопрос: «Есть ли здесь хотя бы одно поле,
// которое не прошло валидацию?».
const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
};



// Функция принимает массив полей ввода и элемент кнопки, состояние которой нужно менять
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", true);
    }
  };