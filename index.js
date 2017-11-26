import * as CONFIG from './js/config.js';
import Article from './js/components/Article.js';
import ArticlesBox from './js/components/ArticlesBox.js';
import Source from './js/components/Source.js';
import SourceChooser from './js/components/SourceChooser.js';
import requestSource from './js/requestSource.js';

let sourcesArray = [],
    articlesArray = [],
    sourceChooser,
    articlesBox,
    newsSourceStorage = new Map(),         //will store already downloaded information
    showMoreButton = document.querySelector('.showMoreButton'),
    pageOverlay = document.querySelector('#overlay');


CONFIG.NEWS_SOURCES.forEach(source => {sourcesArray.push(new Source(source))});
sourceChooser = new SourceChooser(sourcesArray);
document.querySelector('.sourceListContainer').innerHTML = sourceChooser.render();

articlesBox = new ArticlesBox(CONFIG.ARTICLES_ADDING_NUMBER);

document.querySelector('.sourceList').addEventListener('click', e => {
    if (e.target.tagName != 'LI') return;

    let selectedSourceId = e.target.dataset.sourceId,
    	selectedSourceIsActive = e.target.dataset.sourceActive,
        resultSource,
        xhr,
        articles;

    if (selectedSourceIsActive === 'false') {
    	e.target.dataset.sourceActive = 'true';
    	e.target.classList.toggle('activeSource');
    	resultSource = newsSourceStorage.get(selectedSourceId);

    	if (resultSource) {
    	    articlesBox.addSource(resultSource);
			document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
			showMoreButton.classList.remove('hide');
    	} else {
    		pageOverlay.classList.remove('hide');
    		requestSource(selectedSourceId)
    			.then(response => {
    				return response.json();
    			})
    			.then(response => {
    				articles = response.articles;
    				articlesBox.addSource(articles);
    	    	    newsSourceStorage.set(selectedSourceId, articles);
    	    	    document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
    	    	    showMoreButton.classList.remove('hide');
    	    	    pageOverlay.classList.add('hide');
    			})
    			.catch(error => {
    				alert('Something went wrong');
    				console.log(error);
    			})
    	}
    } else {
    	e.target.dataset.sourceActive = 'false';
    	e.target.classList.toggle('activeSource');
    	articlesBox.removeSource(selectedSourceId);
    	document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
    	if (articlesBox.articlesDisplayedNumber === 0) {
    		showMoreButton.classList.add('hide');
    	}
    }

})

window.onscroll = () => {
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight + 80) { 
		showMore();
	}
};

showMoreButton.addEventListener('click', showMore);

function showMore() {
	if (articlesBox.fullyShowed()) {
		showMoreButton.classList.add('hide');
	} else {
		showMoreButton.classList.remove('hide');
	}
	articlesBox.increaseRenderedArticles();
    document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
}