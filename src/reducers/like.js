const initialState = {
    list: [],
    show: {
        x: 0,
        y: 0,
        opacity: 0
    },
    isShow: false,
    idPost: 0,
    isHover: false


};

const likeReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SHOW_MENU_LIKE': {
            const newShow = action.payload.show;
            const newIsShow = action.payload.isShow;
            const newIdPost = action.payload.idPost;
            const isHoverNew = action.payload.isHover;

            return {
                ...state,
                show: newShow,
                isShow: newIsShow,
                idPost: newIdPost,
                isHover: isHoverNew
            };

        }
        case 'HIDDEN_MENU_LIKE': {
            const newShow = action.payload.show;
            const newIsShow = action.payload.isShow;
            const isHoverNew = action.payload.isHover;
            return {
                ...state,
                show: newShow,
                isShow: newIsShow,
                isHover: isHoverNew
            };
        }
        case 'IS_SHOW_MENU_LIKE': {
            const newIsShow = action.payload.isShow;
            const isHoverNew = action.payload.isHover;
            return {
                ...state,
                isShow: newIsShow,
                isHover: isHoverNew
            };
            break;
        }
        default:
            return state;
    }
}

export default likeReducer;