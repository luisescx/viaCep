export const zipCodeToAddress = ({
  cep, logradouro, bairro, localidade, uf,
}) => ({
  address: `${logradouro}, ${bairro}`,
  zipCode: cep,
  city: `${localidade} - ${uf}`,
});
