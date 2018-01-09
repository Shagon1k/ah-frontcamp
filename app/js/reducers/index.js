const articlesReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_NEWS':
            return [...state, ...action.articles];
        case 'REMOVE_NEWS':
            return state.filter(value => value.source.id !== action.sourceId)
        default:
            return state
    }
}

export const newsAppReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_NEWS':
            return {...state,
                articles: articlesReducer(state.articles, action)
            };
        case 'REMOVE_NEWS':
        return {...state,
                articles: articlesReducer(state.articles, action)
            };
        default:
            return state
    }
}