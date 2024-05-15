const getValidationDate = (rule) => {
  const dateNow = new Date(Date.now());
  const targetYear = dateNow.getFullYear() - rule;
  const targetMonth =
    dateNow.getMonth() + 1 < 10 ? `0${dateNow.getMonth() + 1}` : dateNow.getMonth() + 1;
  const targetDate = dateNow.getDate() < 10 ? `0${dateNow.getDate()}` : dateNow.getDate();
  const validationDate = `${targetYear}-${targetMonth}-${targetDate}`;

  return validationDate;
};

export default getValidationDate;
