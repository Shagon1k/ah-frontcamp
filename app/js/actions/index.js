const ADD_NEWS = 'ADD_NEWS';
const REMOVE_NEWS = 'REMOVE_NEWS';

export const addNews = articles => {
    return {
        type: ADD_NEWS,
        articles: articles
    }
}

export const removeNews = id => {
    return {
        type: REMOVE_NEWS,
        sourceId: id
    }
}