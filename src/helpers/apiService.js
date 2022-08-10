import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '27865517-33e13e683f49d77078a3fb000';

const options = {
  params: {
    key: KEY,
    q: null,
    image_type: 'photo',
    orientation: 'horizontal',
    page: null,
    per_page: 12,
  },
};

export default async function fetchImg(query, page) {
  options.params.q = query;
  options.params.page = page;

  const { data } = await axios.get(BASE_URL, options);

  return data;
}

// export default async function fetchImg(query, page) {
//   const url = `${BASE_URL}?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

//   const response = await fetch(url);
//   const data = response.json();
//   return data;
// }

// -----------------------------
// axios.defaults.baseURL = 'https://api.pexels.com/v1/';
// axios.defaults.headers.common['Authorization'] = API_KEY;
// axios.defaults.params = {
//   orientation: 'landscape',
//   per_page: 15,
// };

// export const getImages = async (query, page) => {
//   const { data } = await axios.get(`search?query=${query}&page=${page}`);
//   return data;
// };
