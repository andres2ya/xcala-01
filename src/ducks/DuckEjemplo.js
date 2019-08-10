const initialState={
    ejemplo:[]
}

export default function (state=initialState, action){
    switch(action.type){
        case 'CASO_UNO':
            return{
                ...state,
                ejemplo:[...state.ejemplo,action.payload]
            }
        default:
            return state;
    }
}