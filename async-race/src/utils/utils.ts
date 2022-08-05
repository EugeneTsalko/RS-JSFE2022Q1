/* eslint-disable linebreak-style */
const carNames = ['Jaguar', 'Ferrari', 'BMW', 'VW', 'ZAZ', 'Opel', 'Saab', 'Porsche', 'Lada', 'Audi'];
const carModels = ['XKR', 'Enzo', '316', 'Passat', '968M', 'Vectra', '9000', 'Cayenne', '2108', '80'];

const getRandomCarName = (): string => {
  const carName = carNames[Math.floor(Math.random() * carNames.length)];
  const carModel = carModels[Math.floor(Math.random() * carModels.length)];
  return `${carName} ${carModel}`;
};

const getRandomColor = (): string => {
  const letters = '0123456789ADCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
