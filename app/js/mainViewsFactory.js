export default function ViewsFactory(globalContainerId) {
	this.viewsIds = {};

	this.createHeader = function(headerId) {
		if (this.viewsIds['headerId']) {
			return this.getView('headerId');
		}
		else {
			this.viewsIds['headerId'] = new HeaderView(globalContainerId, headerId, headerId);
			return this.getView('headerId');
		}
	}

	this.createMainContainer = function(mainContId) {
		if (!this.viewsIds['headerId']) {
			throw Error('No header element  presented!');
		}
		if (this.viewsIds['mainContId']) {
			return this.getView('mainContId');
		}
		else {
			this.viewsIds['mainContId'] = new MainContainerView(globalContainerId, mainContId, mainContId);
			return this.getView('mainContId');
		}
	}

	this.createOverlay = function(overlayId) {
		if (this.viewsIds['overlayId']) {
			return this.getView('overlayId');
		}
		else {
			this.viewsIds['overlayId'] = new OverlayView(globalContainerId, overlayId);
			return this.getView('overlayId');
		}
	}
}

ViewsFactory.prototype = {
	getView: function(viewId) {
		if (this.viewsIds[viewId]) {
			return this.viewsIds[viewId]
		}
		else {
			throw Error('No view with such id');
		}
	}
}

class HeaderView {
	constructor(globalContainerId, elemId, elemClass) {
		this.elemId = elemId;
		this.elemClass = elemClass;
		this.globalContainer = document.getElementById(globalContainerId);
	}
	render() {
		this.globalContainer.innerHTML += `<header id="${this.elemId}" class="${this.elemClass}"></header>`;
	}
}

class MainContainerView {
	constructor(globalContainerId, elemId, elemClass) {
		this.globalContainer = document.getElementById(globalContainerId);
		this.elemId = elemId;
		this.elemClass = elemClass;
	}
	render() {
		this.globalContainer.innerHTML += `<div id="${this.elemId}" class="${this.elemClass}">
													<div class="articleBoxContainer"></div>
													<button class="showMoreButton hide">Show More</button>
										</div>`;
	}
}

class OverlayView {
	constructor(globalContainerId, elemId) {
		this.globalContainer = document.getElementById(globalContainerId);
		this.elemId = elemId;
	}
	render() {
		this.globalContainer.innerHTML += `<div id="${this.elemId}" class="hide"></div>`;
	}
}