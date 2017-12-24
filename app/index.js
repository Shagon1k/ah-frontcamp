import 'babel-polyfill';
import 'whatwg-fetch';
import * as CONFIG from './js/config.js';
import ViewsFactory from './js/mainViewsFactory.js';
import ArticlesBox from './js/components/ArticlesBox.js';
import Source from './js/components/Source.js';
import SourceChooser from './js/components/SourceChooser.js';
import './styles/main.scss';

import test from './test.json';

//Main views initialization
let viewsFactory = new ViewsFactory('globalContainer');
viewsFactory.createHeader(CONFIG.MAIN_VIEWS_IDS.headerId);
viewsFactory.createMainContainer(CONFIG.MAIN_VIEWS_IDS.mainContainerId);
viewsFactory.createOverlay(CONFIG.MAIN_VIEWS_IDS.overlayId);

let sourcesArray = [],
    articlesArray = [],
    sourceChooser,
    articlesBox,
    newsSourceStorage = new Map(),         
    showMoreButton = document.querySelector('.showMoreButton'),
    pageOverlay = document.getElementById(CONFIG.MAIN_VIEWS_IDS.overlayId);


CONFIG.NEWS_SOURCES.forEach(source => {sourcesArray.push(Source(source))});
document.getElementById(CONFIG.MAIN_VIEWS_IDS.headerId).innerHTML = SourceChooser(sourcesArray);

articlesBox = new ArticlesBox(CONFIG.ARTICLES_ADDING_NUMBER);

document.querySelector('.sourceList').addEventListener('click', e => {
    if (e.target.tagName != 'LI') return;

    let selectedSourceId = e.target.dataset.sourceId,
    	selectedSourceIsActive = e.target.dataset.sourceActive;

    if (selectedSourceIsActive === 'false') {
    	e.target.dataset.sourceActive = 'true';
    	e.target.classList.toggle('activeSource');
        addArticlesProxy(selectedSourceId);
    } else {
    	e.target.dataset.sourceActive = 'false';
    	e.target.classList.toggle('activeSource');
    	articlesBox.removeSource(selectedSourceId);
    	document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
    	if (articlesBox.articlesDisplayedNumber === 0) {
    		showMoreButton.classList.add('hide');
    	}
    }
});

function addArticlesProxy(sourceId) {
    let articles,
        cachedSourceInfo = newsSourceStorage.get(sourceId);
    if (cachedSourceInfo && (new Date - cachedSourceInfo.time) < CONFIG.INFO_CACHE_TIME) {
        articlesBox.addSource(cachedSourceInfo.articles);
        document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
        showMoreButton.classList.remove('hide');
    } else {
        pageOverlay.classList.remove('hide');
        import(/* webpackChunkName: "request" */ './js/requestSource.js').then(module => {
            let requestSource = module.default;
            requestSource(sourceId)
                .then(response => {
                    return response.json();
                })
                .then(response => {
                    articlesBox.addSource(response.articles);
                    newsSourceStorage.set(sourceId, {
                            articles: response.articles,
                            time: new Date()
                        });
                    document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
                    showMoreButton.classList.remove('hide');
                    pageOverlay.classList.add('hide');
                })
                .catch(error => {
                    alert('Something went wrong');
                    console.log(error);
                })
        });
    }
}

window.onscroll = () => {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 80) {
		showMoreArticles();
	}
};
showMoreButton.addEventListener('click', showMoreArticles);

function showMoreArticles() {
	if (articlesBox.fullyShowed()) {
		showMoreButton.classList.add('hide');
	} else {
		showMoreButton.classList.remove('hide');
	}
	articlesBox.increaseRenderedArticles();
    document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
}

if (process.env.NODE_ENV !== 'production') {
    console.warn('Development mode');
    console.warn('LOADED JSON: ', test);
}