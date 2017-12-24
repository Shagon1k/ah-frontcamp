import {API_KEY, INFO_CACHE_TIME} from './config.js';

let newsSourceStorage = new Map();
export default sourceId => {
	let cachedSourceInfo = newsSourceStorage.get(sourceId);
	if (cachedSourceInfo && (new Date - cachedSourceInfo.time) < INFO_CACHE_TIME) {
		return Promise.resolve(cachedSourceInfo.articles);
	} else {
		return fetch(`https://newsapi.org/v2/top-headlines?sources=${sourceId}&apiKey=${API_KEY}`)
			.then(response => {
				return response.json();
			})
			.then(response => {
				newsSourceStorage.set(sourceId, {
                    articles: response.articles,
                    time: new Date()
                });
				return response.articles;
			})
			.catch(error => {
				alert('Something went wrong');
				console.log(error);
        	});
	}
}
