import Article from './Article.js';

@noBitcoins
class ArticlesBox {
    constructor(articlesAddingNumber = 3) {
        this.articlesArray = [];
        this._articlesAddingNumber = articlesAddingNumber;
        this._articlesDisplayedNumber = 0;
    }

    get articlesAddingNumber() {
        return this._articlesAddingNumber;
    }

    set articlesAddingNumber(newNumber) {
        if (newNumber) {
            this._articlesAddingNumber = newNumber;
        }
    }

    get articlesDisplayedNumber() {
        return this._articlesDisplayedNumber;
    }

    increaseRenderedArticles() {
        if (!this.articlesArray.length) {
            return;
        }

        if ((this._articlesDisplayedNumber + this._articlesAddingNumber) > this.articlesArray.length) {
            this._articlesDisplayedNumber = this.articlesArray.length;
        } else {
            this._articlesDisplayedNumber += this._articlesAddingNumber;
        }
    }

    updateArticles(articles) {
        if (this._articlesDisplayedNumber === 0) {
            this._articlesDisplayedNumber += this._articlesAddingNumber;
        }     

        this.articlesArray = articles;

        if (this.articlesArray.length < this._articlesDisplayedNumber) {
            this._articlesDisplayedNumber = this.articlesArray.length;
        }

        this.articlesArray.sort((art1, art2) => art1.publishedAt < art2.publishedAt ? 1 : -1);
    }

    @readonly
    fullyShowed() {
        return this._articlesDisplayedNumber === this.articlesArray.length;
    }

    render() {
        let articlesStringTemplate = '',
            numberToDisplay = this._articlesDisplayedNumber > this.articlesArray.length ?
                this.articlesArray.length :
                this._articlesDisplayedNumber;

        for (let i = 0; i < numberToDisplay; i++) {
            articlesStringTemplate += 
                Article(this.articlesArray[i].author, this.articlesArray[i].description, this.articlesArray[i].publishedAt, this.articlesArray[i].source,
                    this.articlesArray[i].title, this.articlesArray[i].url, this.articlesArray[i].urlToImage);
        }

        return `<div class="articlesBox">
                    ${articlesStringTemplate}
                </div>`
    }
}

export default ArticlesBox;

function readonly(target, key, desc) {
    desc.writable = false;
    return desc;
}

function noBitcoins(target, key) {
    target.prototype.render = function() {
        let articlesStringTemplate = '',
            arrayToDisplay = this.articlesArray.filter(article => {
                return !article.description.includes('bitcoin');
            }),
            numberToDisplay = this._articlesDisplayedNumber > arrayToDisplay.length ?
                arrayToDisplay.length :
                this._articlesDisplayedNumber;

        for (let i = 0; i < numberToDisplay; i++) {
            articlesStringTemplate += Article(this.articlesArray[i].author, this.articlesArray[i].description, this.articlesArray[i].publishedAt, this.articlesArray[i].source,
                    this.articlesArray[i].title, this.articlesArray[i].url, this.articlesArray[i].urlToImage);
        }

        return `<div class="articlesBox">
                    ${articlesStringTemplate}
                </div>`
    }
}