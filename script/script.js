import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//найдем попапы по отдельности
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_image");
//найдем кнопки закрытия попап по отдельности
const buttonClousePopupEdit = popupEdit.querySelector(".popup__close");
const buttonClousePopupAdd = popupAdd.querySelector(".popup__close");
const buttonClousePopupImage = popupImage.querySelector(".popup__close");
//найдем кнопки открытия попап по отдельности
const buttonShowPopupEdit = document.querySelector(".profile__edit-button");
const buttonShowPopupAdd = document.querySelector(".profile__add-button");
//найдем заголовок в popupImage
const titlePopupImage = document.querySelector(".popup__title_image");
//найдем фото в popupImage
const photoPopupImage = document.querySelector(".popup__image");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_profession");
const userName = document.querySelector(".profile__title");
const profession = document.querySelector(".profile__profession");

const buttonCardSave = popupAdd.querySelector(".popup__submit");

// функция открытия папапов
function showPopup(popup) {
  // добавлю аргументом все попапы
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscPress); //накладываем слушатель на нажатие на кнопку esc + включаем функцию handleEscPress
}
buttonShowPopupAdd.addEventListener("click", () => showPopup(popupAdd));

// отдельная функция для попапа Edit, т.к. его полям нужны значения
function showPopupEdit() {
  nameInput.value = userName.textContent;
  jobInput.value = profession.textContent;
  showPopup(popupEdit); // ну и откроем его общей функцией
}
buttonShowPopupEdit.addEventListener("click", showPopupEdit);

// функция  закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscPress); //удаляем слушатель на нажатие на кнопку esc + включаем функцию handleEscPress
}
// closePopupBackground function
const closeByOverlayClick = (evt) => {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
};
// closePopupBtnEscape function
const handleEscPress = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};

buttonClousePopupEdit.addEventListener("click", () => closePopup(popupEdit));
buttonClousePopupAdd.addEventListener("click", () => closePopup(popupAdd));
buttonClousePopupImage.addEventListener("click", () => closePopup(popupImage));

// closePopupBackground
popupEdit.addEventListener("click", closeByOverlayClick);
popupAdd.addEventListener("click", closeByOverlayClick);
popupImage.addEventListener("click", closeByOverlayClick);


const formPopupEdit = popupEdit.querySelector(".popup__container");
// Обработчик «отправки» формы редактирования профиля
function allFormSubmitHandler(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  profession.textContent = jobInput.value;
  closePopup(popupEdit);
}

// Прикрепляем обработчик к форме: он будет следить за событием “submit” - «отправка»
formPopupEdit.addEventListener("submit", allFormSubmitHandler);

// Дом узлы
const initialCardsForm = document.querySelector(".popup__container_add"); //нашли всю форму в попап Add для добавления нового события
const titleImage = initialCardsForm.querySelector(".popup__input_type_title"); // находим поле ввода названия фото в popupAdd
const linkImage = initialCardsForm.querySelector(".popup__input_type_link"); // находим поле ввода содержащую ссылку на фото в popupAdd


// 2. Обработчик отправки формы из попапа создания карточки
function handleSubmitAddCardList(event) {
  event.preventDefault();

  // после того как отменили стандартную отправку( перезагрузку страницы) - создаем новую карточку
  // для этого объявим функцию createCard. В ней мы должны заранее: создать экземпляр карточки
  createCard({
    name: titleImage.value,
    link: linkImage.value,
  });


  initialCardsForm.reset(); // очистим поля

  closePopup(popupAdd);

  disabledButtonState();
}



// уже вот тут мы ставим слушатель на кнопку сабмит в форме попапа - при ее нажатии сработает обработчик отправки формы handleSubmitAddCardList
initialCardsForm.addEventListener("submit", handleSubmitAddCardList);

//функция создания новой карточки исходя из данных попапа
// на вход она получит наш объкт из массива
const createCard = (data) => {
  //тут нужно создать экземпляр карточки и передать аргументы data и cелектор
  //создаем переменную card (экземпляр карточки) - в нее запишем Новую карточку, указав в параметрах, чтобы она брала объект из массива и Определенный теплейт из разметки 
  const card = new Card(data, "#image-template");

  //потом вызвать метод для генерации карточки
  //и вернуть готовую карточку из функции. Запишем этот наполненный экземпляр в разметку 
  document.querySelector(".elements__list").prepend(card.generateCard());
};


// здесь пробежимся по массиву , каждый его элемент вытащим в разметку 
initialCards.forEach(createCard);


const formAddCard = document.querySelector("#formAddCard");
const formEdit = document.querySelector("#formEdit");

const validationFormAddCard = new FormValidator(config, formAddCard);
validationFormAddCard.enableValidation();

const validationFormEdit = new FormValidator(config, formEdit);
validationFormEdit.enableValidation();