let popup = document.querySelector('.popup');
let closePopupButton = document.querySelector('.popup__close');
let showPopupButton = document.querySelector('.profile__edit-button');

let formElement = document.querySelector('.popup__container');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_profession');

let userName = document.querySelector('.profile__title');
let profession = document.querySelector('.profile__profession');


function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = userName.textContent;
    jobInput.value = profession.textContent;
}
showPopupButton.addEventListener('click', showPopup);

function closePopup() {
    popup.classList.remove('popup_opened');
    userName.textContent = 'gfghdgfd';
    profession.textContent = jobInput.value;
}
closePopupButton.addEventListener('click', closePopup);


// Обработчик «отправки» формы
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    
    // Вставьте новые значения с помощью textContent
    userName.textContent = nameInput.value;
    profession.textContent = jobInput.value;

    closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);