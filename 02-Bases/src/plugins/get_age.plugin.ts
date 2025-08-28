export const getAge = (birthdate: string) => {
  const bDate = new Date(birthdate)
  const cDate = new Date();

  const years = cDate.getFullYear() - bDate.getFullYear();


  return years;
};
