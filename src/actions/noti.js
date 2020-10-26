export const addNewNoti = (noti) => {
    return {
        type: 'ADD_NOTI',
        payload: noti,

    }

}

export const readNewNoti = (noti) => {
    return {
        type: 'READ_NOTI',
        payload: noti,
    }

}