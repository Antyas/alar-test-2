export const nameValidator = (val) => {
  return val.trim() ? '' : 'Имя - обязательное поле';
}

export const phoneValidator = (val) => {
  return val.replaceAll(/\+|\d/, '') ? '' : 'Невалидный телефон';
}