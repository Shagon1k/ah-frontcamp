const blogList = document.querySelector('.blogsList'),
	addBlogButton = document.querySelector('#addBlogButton'),
	addBlogInput = document.querySelector('#addBlogInput');

blogList.addEventListener('click', e => {

	if(e.target.className != 'deleteBlog') return;

	let xhr = new XMLHttpRequest();
	xhr.open('DELETE', '/blogs/' + e.target.dataset.id);

	xhr.onreadystatechange = function () {
        window.location.href = '/blogs';
    };

	xhr.send();
});

addBlogButton.addEventListener('click', e => {

	if(addBlogInput.value == '') return;

	let xhr = new XMLHttpRequest(),
		jsonData = {
			name: addBlogInput.value,
			message: 'Dummy message'
		};

	xhr.open('PUT', '/blogs/' + addBlogInput.value);
	xhr.setRequestHeader('Content-Type', 'application/json')

	xhr.onreadystatechange = function () {
        window.location.href = '/blogs';
    };
	xhr.send(JSON.stringify(jsonData));
});