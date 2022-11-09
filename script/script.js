const popup = document.querySelector('.popup');
//найдем попапы по отдельности
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_add');
const popupImage = document.querySelector('.popup_type_image');
//найдем кнопки закрытия попап по отдельности
const buttonClousePopupEdit = popupEdit.querySelector('.popup__close');
const buttonClousePopupAdd = popupAdd.querySelector('.popup__close');
const buttonClousePopupImage = popupImage.querySelector('.popup__close');
//найдем кнопки открытия попап по отдельности
const buttonShowPopupEdit = document.querySelector('.profile__edit-button');
const buttonShowPopupAdd = document.querySelector('.profile__add-button');
//найдем заголовок в popupImage
const titlePopupImage = document.querySelector('.popup__title_image');
//найдем фото в popupImage
const photoPopupImage = document.querySelector('.popup__image');
const formElement = document.querySelector('.popup__container');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_profession');
const userName = document.querySelector('.profile__title');
const profession = document.querySelector('.profile__profession');



// функция открытия папапов
function showPopup(popup) { // добавлю аргументом все попапы
    popup.classList.add('popup_opened');
}

buttonShowPopupAdd.addEventListener('click', () => showPopup(popupAdd));


// отдельная функция для попапа Edit, т.к. его полям нужны значения
function showPopupEdit() {
    nameInput.value = userName.textContent;
    jobInput.value = profession.textContent;
    showPopup(popupEdit); // ну и откроем его общей функцией
}
buttonShowPopupEdit.addEventListener('click', showPopupEdit);


// функция  закрытия попапов
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

buttonClousePopupEdit.addEventListener('click', () => closePopup(popupEdit));
buttonClousePopupAdd.addEventListener('click', () => closePopup(popupAdd));
buttonClousePopupImage.addEventListener('click', () => closePopup(popupImage));



// Обработчик «отправки» формы
function formSubmitHandler(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Вставьте новые значения с помощью textContent
    userName.textContent = nameInput.value;
    profession.textContent = jobInput.value;

    closePopup(popup);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);







// Дом узлы

const cardContainer = document.querySelector('.elements__list'); //нашли весь список в который будем вставлять наш темплейт
const initialCardsForm = document.querySelector('.popup__container_add'); //нашли всю форму в попап Add для добавления нового события
const titleImage = initialCardsForm.querySelector('.popup__input_type_title'); // находим поле ввода названия фото в popupAdd
const linkImage = initialCardsForm.querySelector('.popup__input_type_link'); // находим поле воода содержащую ссылку на фото в popupAdd



// отдельная функция для попапа Image, т.к. его полям нужны значения
function showPopupImages(name, link) {
    titlePopupImage.textContent = name; // кладем name в подпись под картинкой в попапе
    photoPopupImage.src = link; // кладем link в свойство src тега img в попапе
    titlePopupImage.alt = name;

    showPopup(popupImage); // ну и откроем его общей функцией
};



// 6. Шаблоны
const templateElement = document.querySelector('#image-template').content.querySelector('.element');


// 7. Генерация карточки
// 8.
const handleDeliteCard = (event) => {
    event.target.closest('.element').remove(); //метод closest ищет ближайшего родителя, его и добавим
}

const handleLikeCard = (event) => {
    event.target.closest('.element__image-heart').classList.toggle('element__image-heart_active');
}


const generateCard = (dataCard) => {
    const newCard = templateElement.cloneNode(true);

    const image = newCard.querySelector('.element__image');
    image.src = dataCard.link;

    const title = newCard.querySelector('.element__title');
    title.textContent = dataCard.name;


    const deliteBtn = newCard.querySelector('.element__image-trash');
    deliteBtn.addEventListener('click', handleDeliteCard);

    const likeBtn = newCard.querySelector('.element__image-heart');
    likeBtn.addEventListener('click', handleLikeCard);

    image.addEventListener('click', () => {
        showPopupImages(dataCard.name, dataCard.link)
    });

    return newCard;
}




// 2. Обработчики событий
function handleSubmitAddCardList(event) {
    event.preventDefault();

    // 5.    
    renderCard({
        name: titleImage.value,
        link: linkImage.value
    });


    initialCardsForm.reset(); // очистим поля

    closePopup(popupAdd);
};





// 4. Добавление карточки
const renderCard = (dataCard) => {
    cardContainer.prepend(generateCard(dataCard)); // метод Prepend - добавить новый элемент в родительский
}

// 1. Рендер всех карточек
initialCardsForm.addEventListener("submit", handleSubmitAddCardList);


// 3. пробежимся по массиву и вызываем функцию renderCard
initialCards.forEach((dataCard) => {
    renderCard(dataCard);
});