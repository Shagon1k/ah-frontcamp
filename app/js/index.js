import 'babel-polyfill';
import 'whatwg-fetch';
import createStore from '../../utils/my-redux.js';
import * as CONFIG from './config.js';
import ViewsFactory from './mainViewsFactory.js';
import ArticlesBox from './components/ArticlesBox.js';
import Source from './components/Source.js';
import SourceChooser from './components/SourceChooser.js';
import '../styles/main.scss';

import {newsAppReducer} from './reducers/';
import {addNews, removeNews} from './actions/';

import test from '../test.json';

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
        import(/* webpackChunkName: "request" */ './requestSource.js').then(module => {
            let requestSource = module.default;
            requestSource(selectedSourceId).then(articles => {
                newsApp.dispatch(addNews(articles));
                showMoreButton.classList.remove('hide');
                pageOverlay.classList.add('hide');
            })
        });
    } else {
        e.target.dataset.sourceActive = 'false';
        e.target.classList.toggle('activeSource');
        newsApp.dispatch(removeNews(selectedSourceId));
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