import axios from 'axios';
import { api } from 'src/services/api';
import { zipCodeToAddress } from 'src/mappers/zipCodeMapper';

const getLocationByCep = async (cepValue) => {
  try {
    const response = await api.get(`${cepValue}/json`);

    if (response.status === 200 && response.data && !response.data.erro) {
      const {
        cep, logradouro, bairro, localidade, uf,
      } = response.data;

      return zipCodeToAddress({
        cep, logradouro, bairro, localidade, uf,
      });
    }

    return null;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(`${e}`);
    }

    throw new Error('Não foi possível fazer a busca');
  }
};

export default getLocationByCep;
