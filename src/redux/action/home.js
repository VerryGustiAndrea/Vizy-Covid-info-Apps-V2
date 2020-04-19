import Axios from 'axios';

const COVID_WORLD = 'https://corona.lmao.ninja/v2/all';
const COVID_COUNTRY = 'https://corona.lmao.ninja/v2/countries?sort=country';

export const getCovidAll = () => {
  return {
    type: 'GET_COVID_ALL', // string yang mendiskripsikan perintah
    payload: Axios.get(COVID_WORLD),
  };
};

export const getCovidCountry = () => {
  return {
    type: 'GET_COVID_COUNTRY', // string yang mendiskripsikan perintah
    payload: Axios.get(COVID_COUNTRY),
  };
};
