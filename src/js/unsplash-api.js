//* Import library
import axios from 'axios';
import { apiKey } from './api-key';

//* Get function
export const getPhotos = async (query, page) => {
  const baseURL = 'https://api.unsplash.com';
  const endpoint = '/search/photos';

  const response = await axios.get(`${baseURL}${endpoint}`, {
    params: {
      query,
      page,
      per_page: 12,
      orientation: 'portrait',
      client_id: apiKey,
    },
  });

  return response.data;
};
