import carSvgImage from '../../assets/svg/carSvgImage';
import { ISvg } from '../../interfaces/interfaces';
import './render-car.scss';

const renderCarImage = (color: string): ISvg => {
  const carImage = document.createElement('svg') as ISvg;
  carImage.style.fill = color;
  carImage.innerHTML = carSvgImage;
  carImage.classList.add('car-svg');
  return carImage;
};

export default renderCarImage;
