export default class Article {
	constructor(author, description, publishDate, sourceName, title, url, imgUrl) {
		this.author = author;
		this.description = description;
		this.publishDate = publishDate;
		this.sourceName = sourceName;
		this.title = title;
		this.url = url;
		this.imgUrl = imgUrl;
	}

	static dummyArticle () {
		return new Article ("Alex Hur", "Dummy description", "2017-11-22T16:54:35Z",
			"Dummy SourceName", "Dummy Title", "https://vk.com/",
			"https://pp.userapi.com/c638928/v638928530/5aae1/HVrq1cnroMc.jpg");
	}

	render() {
		return `<div class="article">
				<img class="articleImage" src="${this.imgUrl}" alt="${this.title}">
				<div class="articleMain">
					<a class="articleUrl" href="${this.url}">
						<h3 class="articleTitle">${this.title}</h3>
						<h4 class="articleSource">${this.sourceName}</h4>
					</a>
					<div class="articleDescription">
						${this.description}
					</div>
					<dl class="publishInfo">
						<dt>Author:</dt>
						<dd>${this.author}</dd>
						<dt>Puplish date:</dt>
						<dd>${formatDate(this.publishDate)}</dd>
					</dl>
				</div>
			</div>`
	}
}

formatDate (dateStr) => {
	let date = new Date(dateStr);
	return date.toLocaleString();
}