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

    addSource(articles) {
        let addedArticles = [];

        if (this.articlesArray.find(e => e.sourceId === articles[0].source.id)) return;

        if (this._articlesDisplayedNumber === 0) {
            this._articlesDisplayedNumber += this._articlesAddingNumber;
        }

        articles.forEach(elem => {
            addedArticles.push(new Article(elem.author, elem.description, elem.publishedAt, elem.source, elem.title, elem.url, elem.urlToImage));

        })
        this.articlesArray = this.articlesArray.concat(addedArticles);

        this.articlesArray.sort((art1, art2) => art1.publishDate < art2.publishDate ? 1 : -1);
    }

    removeSource(sourceId) {
        this.articlesArray = this.articlesArray.filter(value => value.sourceId != sourceId);
        if (this.articlesArray.length < this._articlesDisplayedNumber) {
            this._articlesDisplayedNumber = this.articlesArray.length;
        }
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
            articlesStringTemplate += this.articlesArray[i].render();
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
            articlesStringTemplate += arrayToDisplay[i].render();
        }

        return `<div class="articlesBox">
                    ${articlesStringTemplate}
                </div>`
    }
}