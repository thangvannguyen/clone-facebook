export const showMenuLike = (like) => {
    return {
        type: 'SHOW_MENU_LIKE',
        payload: like,

    };

}
export const hiddenMenuLike = (like) => {
    return {
        type: 'HIDDEN_MENU_LIKE',
        payload: like,

    };
}

export const isShowMenuLike = (like) => {
    return {
        type: 'IS_SHOW_MENU_LIKE',
        payload: like,
    };

}


