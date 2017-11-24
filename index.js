import {API_KEY, ARTICLES_ADDING_NUMBER, ARTICLES_DEFAULT_NUMBER, NEWS_SOURCES} from './js/config.js';
import Article from './js/components/Article.js';
import ArticlesBox from './js/components/ArticlesBox.js';
import Source from './js/components/Source.js';
import SourceChooser from './js/components/SourceChooser.js';

let sourcesArray = [],
    articlesArray = [],
    sourceChooser,
    articlesBox,
    newsSourceStorage = [];         //will store already downloaded information


NEWS_SOURCES.forEach((source) => {sourcesArray.push(new Source(source))});
sourceChooser = new SourceChooser(sourcesArray);
articlesBox = new ArticlesBox(ARTICLES_DEFAULT_NUMBER, ARTICLES_ADDING_NUMBER);
document.querySelector('.sourceListContainer').innerHTML = sourceChooser.render();

document.querySelector('.sourceList').addEventListener('click', (e) => {
    if (e.target.tagName != 'LI') return;
    let sourceId = e.target.dataset.sourceId,
        resultSource = newsSourceStorage.find((elem) => elem.sourceId === sourceId),
        xhr,
        articles;

    if (resultSource) {
        articlesBox.addSource(resultSource.sourceArticles);
        return;
    } else {
        xhr = new XMLHttpRequest();
        xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${e.target.dataset.sourceId}&apiKey=${API_KEY}`);
        xhr.send();
        xhr.onload = function() {
            articles = JSON.parse(this.responseText).articles;
            articlesBox.addSource(articles);
            newsSourceStorage.push({
                sourceId: sourceId,
                sourceArticles: articles
            });
            document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
            return;
        }
    }

})



document.querySelector('.dummyButton').addEventListener('click', () => {
    articlesBox.increaseRenderedArticles();
    document.querySelector('.articleBoxContainer').innerHTML = articlesBox.render();
})