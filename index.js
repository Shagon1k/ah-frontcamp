import {API_KEY, ARTICLES_ADDING_NUMBER, ARTICLES_DEFAULT_NUMBER, NEWS_SOURCES} from './js/config.js';
import ArticlesBox from './js/components/ArticlesBox.js';
import Article from './js/components/Article.js';

let articlesArray = [];

for (let i = 0; i < 100; i++) {
    articlesArray.push(Article.dummyArticle())
}

let articlesBox = new ArticlesBox(articlesArray, ARTICLES_DEFAULT_NUMBER, ARTICLES_ADDING_NUMBER);

document.querySelector('.mainContainer').innerHTML = articlesBox.render();
document.querySelector('.dummyButton').addEventListener('click', ()=> {
    articlesBox.addArticles();
    document.querySelector('.mainContainer').innerHTML = articlesBox.render();
})