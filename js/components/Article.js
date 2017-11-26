export default class Article {
	constructor(author, description, publishDate, sourceObj, title, url, imgUrl) {
		this.author = author || 'no author';
		this.description = description;
		this.publishDate = new Date(publishDate);
		this.sourceName = sourceObj.name; 
		this.sourceId = sourceObj.id;
		this.title = title;
		this.url = url;
		this.imgUrl = imgUrl || 'https://i.imgur.com/LHZLUVp.png';
	}

	static dummyArticle () {
		return new Article ("Alex Hur", "Dummy description", "2017-11-22T16:54:35Z",
			{name: "Dummy SourceName", id: "dummy-source-id"}, "Dummy Title", "https://vk.com/",
			"http://files2.najox.com/pictures/spongebob_fights_with_fish.jpg");
	}

	render() {
		return `<div class="article">
					<a href="${this.url}" class="articleImage" style="background-image:url(${this.imgUrl}); background-position:center;"></a>
					<div class="articleMain">
						<a class="articleUrl" href="${this.url}">
							<h3 class="articleTitle">${this.title}</h3>
						</a>
						<div class="articleDescription">
							${this.description}
						</div>
						<dl class="publishInfo">
							<dt>Author:</dt>
							<dd>${this.author}</dd>
							<dt>Puplish date:</dt>
							<dd>${this.publishDate.toLocaleString()}</dd>
						</dl>
					</div>
				</div>`
	}
}