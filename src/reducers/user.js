const initialState = {
    info: {}
};

const userReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'UPDATE_USER': {
            const newInfo = action.payload;
            return {
                ...state,
                info: newInfo
            };

        }
        default:
            return state;
    }
}

export default userReducer;