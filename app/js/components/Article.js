export default function Article(author, description, publishDate, sourceObj, title, url, imgUrl) {
		let resAuthor = author || 'no author',
			resDescription = description || '',
			resPublishDate = new Date(publishDate).toLocaleString(),
			resImgUrl = imgUrl || '/images/no-image.png';  //'https://i.imgur.com/LHZLUVp.png'


	return `<div class="article">
				<a href="${url}" class="articleImage" style="background-image:url(${resImgUrl}); background-position:center;"></a>
				<div class="articleMain">
					<a class="articleUrl" href="${url}">
						<h3 class="articleTitle">${title}</h3>
					</a>
					<div class="articleDescription">
						${resDescription}
					</div>
					<dl class="publishInfo">
						<dt>Author:</dt>
						<dd>${resAuthor}</dd>
						<dt>Puplish date:</dt>
						<dd>${resPublishDate}</dd>
					</dl>
				</div>
			</div>`
}