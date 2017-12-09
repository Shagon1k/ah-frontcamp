export default class Article {
	constructor(author, description, publishDate, sourceObj, title, url, imgUrl) {
		this.author = author || 'no author';
		this.description = description;
		this.publishDate = new Date(publishDate);
		this.sourceName = sourceObj.name;
		this.sourceId = sourceObj.id;
		this.title = title;
		this.url = url;
		this.imgUrl = imgUrl || '/images/no-image.png';  //'https://i.imgur.com/LHZLUVp.png'
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

//export default function Article (author, description, publishDate, sourceObj, title, url, imgUrl) {
//	let resAuthor = author || 'no author',
//		resImgUrl = imgUrl || 'https://i.imgur.com/LHZLUVp.png';
//	return `<div class="article">
//					<a href="${url}" class="articleImage" style="background-image:url(${resImgUrl}); background-position:center;"></a>
//					<div class="articleMain">
//						<a class="articleUrl" href="${url}">
//							<h3 class="articleTitle">${title}</h3>
//						</a>
//						<div class="articleDescription">
//							${description}
//						</div>
//						<dl class="publishInfo">
//							<dt>Author:</dt>
//							<dd>${author}</dd>
//							<dt>Puplish date:</dt>
//							<dd>${publishDate.toLocaleString()}</dd>
//						</dl>
//					</div>
//				</div>`
//}