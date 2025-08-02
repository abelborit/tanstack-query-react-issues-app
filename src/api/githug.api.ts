import axios from 'axios';

export const githubApi_AxiosInstance = axios.create({
  baseURL: 'https://aapi.github.com/repos/facebook/react',
  headers: {
    // TODO: Api Key de GitHub para expandir la cuota de consumo de la api
  },
});
