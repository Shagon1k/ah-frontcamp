import {API_KEY} from './config.js';

export default sourceId => fetch(`https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${API_KEY}`)