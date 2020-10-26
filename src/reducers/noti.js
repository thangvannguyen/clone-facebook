const initialState = {
    list: [],
};

const notiReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_NOTI':
            return state;
            break;
        case 'READ_NOTI':
            return state;
            break;

        default:
            return state;
    }


}

export default notiReducer;