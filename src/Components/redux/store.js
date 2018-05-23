import {createStore} from 'redux';

const reducer = (state, action) => {
    if ( action.type === 'LOGEAR'){
        return{
            ...state,
            logeado: true,
            email: action.email,
            summoner: action.summoner
        }
    } else if ( action.type === 'LOGOUT'){
        return{
            ...state,
            logeado: false,
            email: '',
            summoner: []
        }
    } else if ( action.type === 'UPDATE_SUMMONER_INICIO'){
        return{
            ...state,
            summoner: action.summoner
        }
    }
    return state;
};


export default createStore(reducer, { logeado : false, summoner : [], email : ''});