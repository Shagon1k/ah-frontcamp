const blogMessageArea = document.querySelector('#blogMessageArea'),
	updateBLogButton = document.querySelector('#updateBLog'),
	blogId = blogMessageArea.dataset.id;

updateBLogButton.addEventListener('click', e => {
	let xhr = new XMLHttpRequest(),
		jsonData = {
			id: blogId,
			message: blogMessageArea.value
		};

	xhr.open('POST', '/blogs/update');
	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.send(JSON.stringify(jsonData));
});