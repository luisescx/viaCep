import axios from 'axios';
import getLocationByCep from './getLocationByCep';

const getLocationsList = async (cepList) => {
  try {
    const locationsList = [];

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < cepList.length; index++) {
      const cep = cepList[index];
      // eslint-disable-next-line no-await-in-loop
      const location = await getLocationByCep(cep);

      if (location) {
        locationsList.push(location);
      }
    }

    return locationsList;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(`${e}`);
    }

    throw new Error('Não foi possível fazer a busca das cidades');
  }
};

export default getLocationsList;
