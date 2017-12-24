export default function ViewsFactory(globalContainerId) {
	this.globalContainer = document.getElementById(globalContainerId);
	this.viewsIds = {};

	this.createHeader = function(headerId) {
		if (this.viewsIds['headerId']) {
			return this.getView('headerId');
		}
		else {
			this.viewsIds['headerId'] = headerId;
			this.globalContainer.innerHTML += `<header id="${headerId}" class="${headerId}"></header>`;
			return this.getView('headerId');
		}
	}

	this.createMainContainer = function(mainContId) {
		if (!this.viewsIds.headerId) {
			throw Error('No header element  presented!');
		}
		if (this.viewsIds['mainContId']) {
			return this.getView('mainContId');
		}
		else {
			this.viewsIds['mainContId'] = mainContId;
			this.globalContainer.innerHTML += `<div id="${mainContId}" class="${mainContId}">
													<div class="articleBoxContainer"></div>
													<button class="showMoreButton hide">Show More</button>
												</div>`;
			return this.getView('mainContId');
		}
	}

	this.createOverlay = function(overlayId) {
		if (this.viewsIds['overlayId']) {
			return this.getView('overlayId');
		}
		else {
			this.viewsIds['overlayId'] = overlayId;
			this.globalContainer.innerHTML += `<div id="${overlayId}" class="hide"></div>`;
			return this.getView('overlayId');
		}
	}
}

ViewsFactory.prototype = {
	getView: function(viewId) {
		if (this.viewsIds[viewId]) {
			return document.getElementById(viewId);
		}
		else {
			throw Error('No view with such id');
		}
	},

	fillView: function(viewId, stringHtml) {
		let elem = this.getView(viewId);
		elem.innerHTML += stringHtml;
	}
}


			

