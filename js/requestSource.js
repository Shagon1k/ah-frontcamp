import {API_KEY} from './config.js';

export default sourceId => fetch(`https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${API_KEY}`)
    



//ALTERNATIVE:
//return new Promise((resolve, reject) => {
//    let xhr = new XMLHttpRequest();
//    xhr.open("GET", `https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${API_KEY}`);
//    xhr.onload = () => {
//        if (xhr.status >= 200 && xhr.status < 300) {
//            resolve(xhr.response);
//        } else {
//            reject(xhr.statusText);
//        }
//    };
//    xhr.onerror = () => reject(xhr.statusText);
//    xhr.send();
//});

