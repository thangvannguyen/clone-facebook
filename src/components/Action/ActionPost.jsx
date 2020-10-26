import React from 'react';
import PropTypes from 'prop-types';
import './ActionPost.scss'
import { useDispatch, useSelector } from 'react-redux';
import { isShowMenuLike, hiddenMenuLike } from '../../actions/like';
import firebase from "firebase";
import { db } from '../../firebase';
ActionPost.propTypes = {

};

function ActionPost(props) {

    const coordinatesMenuLike = props.coordinatesMenuLike;
    const idPostLike = useSelector(state => state.like.idPost);
    const userLogin = useSelector(state => state.user.info);


    const dispatch = useDispatch();

    const handleMouseHover = (e) => {
        const isShowMenuLikeNew = {
            isShow: true,
            isHover: true
        };
        const action = isShowMenuLike(isShowMenuLikeNew);
        dispatch(action);

    };
    const handleMouseLeave = () => {

        const coordinatesMenuLikeNew = {
            show: {
                x: 0,
                y: 0,
                opacity: 0
            },
            isShow: false,
            isHover: false

        };
        const action = hiddenMenuLike(coordinatesMenuLikeNew);
        setTimeout(() => {
            dispatch(action);
        }, 200);

    };
    const handleActionClick = async (numberLike) => {
        // console.log({ idPostLike });
        db.collection('posts').doc(idPostLike).collection('arr_user_like').where("user_id", "==", userLogin.uid).get().then((querySnapshot) => {

            if (querySnapshot.docs.length == 0) {

                const data = {
                    avatar: userLogin.photoURL,
                    full_name: userLogin.displayName,
                    create_at: firebase.firestore.Timestamp.now(),
                    type_like: numberLike,
                    user_id: userLogin.uid,
                };
                const resAddArrActionLike = db.collection('posts').doc(idPostLike).collection('arr_user_like').add(data);
                const coordinatesMenuLikeNew = {
                    show: {
                        x: 0,
                        y: 0,
                        opacity: 0
                    },
                    isShow: false
                };
                const action = hiddenMenuLike(coordinatesMenuLikeNew);
                dispatch(action);

            } else {
                const dataUpdate = {
                    update_at: firebase.firestore.Timestamp.now(),
                    type_like: numberLike,
                };
                querySnapshot.forEach(function (doc) {

                    const resUpdateActionLike = db.collection('posts').doc(idPostLike).collection('arr_user_like').doc(doc.id).update(dataUpdate);

                });
                const coordinatesMenuLikeNew = {
                    show: {
                        x: 0,
                        y: 0,
                        opacity: 0
                    },
                    isShow: false
                };
                const action = hiddenMenuLike(coordinatesMenuLikeNew);
                dispatch(action);

            }

        }).catch(function (error) {
            console.log("Error getting cached document:", error);
        });

    };
    return (
        <div className="list-btn-action" onMouseEnter={handleMouseHover} onMouseLeave={handleMouseLeave} style={{ top: coordinatesMenuLike.y, left: coordinatesMenuLike.x, opacity: coordinatesMenuLike.opacity }}>
            <span data-name="Thích" onClick={() => handleActionClick(1)}> <img src="../images/icon/like.png" alt="like" /></span>
            <span data-name="Yêu thích" onClick={() => handleActionClick(5)}> <img src="../images/icon/heart.png" alt="heart" /></span>
            <span data-name="Thương Thương" onClick={() => handleActionClick(4)}> <img src="../images/icon/love.png" alt="love" /></span>
            <span data-name="Haha" onClick={() => handleActionClick(2)}> <img src="../images/icon/haha.png" alt="haha" /></span>
            <span data-name="Wow" onClick={() => handleActionClick(3)}> <img src="../images/icon/wow.png" alt="wow" /></span>
            <span data-name="Buồn" onClick={() => handleActionClick(6)}> <img src="../images/icon/cry.png" alt="cry" /></span>
            <span data-name="Phẩn nộ" onClick={() => handleActionClick(7)}> <img src="../images/icon/angry.png" alt="angry" /></span>
            <span data-name="Mãi yêu" onClick={() => handleActionClick(8)}> <img src="../images/icon/flower.png" alt="flower" /></span>
        </div>

    );
}

export default ActionPost;