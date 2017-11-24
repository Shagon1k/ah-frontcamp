import Article from './Article.js';

export default class ArticlesBox {
    constructor(articlesArray, articlesDefaultNumber = 12, articlesAddingNumber = 3) {
        this.articlesArray = articlesArray;
        this._articlesAddingNumber = articlesAddingNumber;
        this._articlesDisplayedNumber = articlesDefaultNumber;
    }

    get articlesAddingNumber () {
        return this._articlesAddingNumber;
    }

    set articlesAddingNumber (newNumber) {
        if (newNumber) {
            this._articlesAddingNumber = newNumber;
        }
    }

    addArticles() {
        this._articlesDisplayedNumber += this._articlesAddingNumber;
    }

    render() {
        let articlesStringTemplate = '';

        //Добавить: Проверка на конец массива
        for (let i = 0; i < this._articlesDisplayedNumber; i++) {
            articlesStringTemplate += this.articlesArray[i].render();
        }

        return `<div class="articlesContainer">
                    ${articlesStringTemplate}
                </div>`
    }
}