import 'babel-polyfill';
import 'whatwg-fetch';
import createStore from '../utils/my-redux.js';
import * as CONFIG from './js/config.js';
import ViewsFactory from './js/mainViewsFactory.js';
import ArticlesBox from './js/components/ArticlesBox.js';
import Source from './js/components/Source.js';
import SourceChooser from './js/components/SourceChooser.js';
import './styles/main.scss';

import test from './test.json';

//Main views initialization
let viewsFactory = new ViewsFactory('globalContainer');
viewsFactory.createHeader(CONFIG.MAIN_VIEWS_IDS.headerId).render();
viewsFactory.createMainContainer(CONFIG.MAIN_VIEWS_IDS.mainContainerId).render();
viewsFactory.createOverlay(CONFIG.MAIN_VIEWS_IDS.overlayId).render();

let sourcesArray = [],
    articlesArray = [],
    sourceChooser,
    articlesBox,      
    showMoreButton = document.querySelector('.showMoreButton'),
    pageOverlay = document.getElementById(CONFIG.MAIN_VIEWS_IDS.overlayId);

function articlesReducer(state = [], action) {
    switch (action.type) {
        case 'ADD_NEWS':
            return [...state, ...action.articles];
        case 'REMOVE_NEWS':
            return state.filter(value => value.source.id !== action.sourceId)
        default: 
            return state
    }
}

function newsAppReducer(state = {}, action) {
    switch (action.type) {
        case 'ADD_NEWS': 
            return Object.assign({}, state, {
                articles: articlesReducer(state.articles, action)
            })
        case 'REMOVE_NEWS':
        return Object.assign({}, state, {
                articles: articlesReducer(state.articles, action)
            })
        default:
            return state
    }
}

let newsApp = createStore(newsAppReducer);

CONFIG.NEWS_SOURCES.forEach(source => {sourcesArray.push(Source(source))});
document.getElementById(CONFIG.MAIN_VIEWS_IDS.headerId).innerHTML = SourceChooser(sourcesArray);

articlesBox = new ArticlesBox(CONFIG.ARTICLES_ADDING_NUMBER);

newsApp.subscribe(()=> {
    articlesBox.updateArticles(newsApp.getState().articles);
    document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
})

document.querySelector('.sourceList').addEventListener('click', e => {
    if (e.target.tagName != 'LI') return;

    let selectedSourceId = e.target.dataset.sourceId,
    	selectedSourceIsActive = e.target.dataset.sourceActive;

    if (selectedSourceIsActive === 'false') {
    	e.target.dataset.sourceActive = 'true';
    	e.target.classList.toggle('activeSource');
        pageOverlay.classList.remove('hide');
        import(/* webpackChunkName: "request" */ './js/requestSource.js').then(module => {
            let requestSource = module.default;
            requestSource(selectedSourceId).then(articles => {
                newsApp.dispatch({
                    type: 'ADD_NEWS',
                    articles: articles
                })
                showMoreButton.classList.remove('hide');
                pageOverlay.classList.add('hide');
            })    
        });
    } else {
    	e.target.dataset.sourceActive = 'false';
    	e.target.classList.toggle('activeSource');
        newsApp.dispatch({
            type: 'REMOVE_NEWS',
            sourceId: selectedSourceId
        })
    	if (articlesBox.articlesDisplayedNumber === 0) {
    		showMoreButton.classList.add('hide');
    	}
    }
});

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