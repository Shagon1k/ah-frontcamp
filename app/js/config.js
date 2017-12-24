const MAIN_VIEWS_IDS = {
	headerId: 'sourceListContainer',
	mainContainerId: 'mainContainer',
	overlayId: 'overlay'
};
const API_KEY = '46cfaea2895a4945a21de12ace31007c';
const ARTICLES_ADDING_NUMBER = 6;
const ARTICLES_DEFAULT_NUMBER = 6;
const NEWS_SOURCES = [{name: 'ABC News', id: 'abc-news'},
                        {name: 'BBC News', id: 'bbc-news'},
                        {name: 'CNN News', id: 'cnn'},
                        {name: 'IGN News', id: 'ign'},
                        {name: 'NBC News', id: 'nbc-news'},
                        {name: 'News24', id: 'news24'}];
const INFO_CACHE_TIME = 20*60*1000;		//20 minutes

export {MAIN_VIEWS_IDS, API_KEY, ARTICLES_ADDING_NUMBER, ARTICLES_DEFAULT_NUMBER, NEWS_SOURCES, INFO_CACHE_TIME};