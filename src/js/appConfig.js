export const MODE_DEVELOPMENT = 'development';

export const MODE_PRODUCION = 'production';

export const MODE = MODE_PRODUCION;

export const API_URL = MODE === 'development' ? '/api' : 'https://jsonplaceholder.typicode.com/';
