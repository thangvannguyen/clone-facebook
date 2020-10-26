import React, { useEffect } from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase";
import { db } from '../../firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { RViewer, RViewerTrigger } from 'react-viewerjs';
import Image from './Image';
import './Post.scss';
import ActionPost from './ActionPost';
import Comment from './Comment';
import InputComment from './InputComment';
import moment from 'moment';
import { TYPE_SHOW_POST_ICON } from '../../constants/TypeShowPost';
import { useSelector } from 'react-redux';
import Moment from 'react-moment';
import 'moment/locale/vi';

Post.propTypes = {

};

function textOverflow(str = '') {
    let strLenght = str.trim().split(' ');
    strLenght.length = 100;
    return strLenght.join(' ');

}
function isTextOverflow(str = '') {
    if (str !== null && str.trim() !== '' && str.trim().split(' ').length > 100) {
        return true;
    }
    else {
        return false;

    }

}


function Post(props) {

    const typeShoW = TYPE_SHOW_POST_ICON;

    const [commentList, setCommentList] = useState([]);
    const [imageList, setImagetList] = useState([]);
    const [userLikeList, setUserLikeList] = useState([]);
    const [contentText, setContentText] = useState(props.item.content_text);
    const [isHiddenContentTextOver, setIsHiddenContentTextOver] = useState(isTextOverflow(props.item.content_text));

    const isShow = useSelector(state => state.like.isShow);
    const userLogin = useSelector(state => state.user.info);

    useEffect(() => {

        db.collection('posts').doc(props.id).collection('arr_comment').orderBy("create_at", "asc").onSnapshot(snapshot => {
            //const postsNew = snapshot.docs;
            const listComment = snapshot.docs.map(doc => ({
                id: doc.id,
                comment: doc.data(),
            }));
            setCommentList(listComment);
        });

        db.collection('posts').doc(props.id).collection('arr_image').onSnapshot(snapshot => {
            //const postsNew = snapshot.docs;
            const listImage = snapshot.docs.map(doc => ({
                id: doc.id,
                image: doc.data(),
            }));
            setImagetList(listImage);

        });

        db.collection('posts').doc(props.id).collection('arr_user_like').onSnapshot(snapshot => {
            //const postsNew = snapshot.docs;
            const userLikeListDB = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    user: doc.data(),
                }
            });

            setUserLikeList(userLikeListDB);

        });


    }, []);

    const handelAddComment = async (itemComment) => {

        if (itemComment.content !== '') {

            const data = {
                avatar: userLogin.photoURL,
                content: itemComment.content,
                full_name: userLogin.displayName,
                create_at: firebase.firestore.Timestamp.now(),
                update_at: firebase.firestore.Timestamp.now(),
                status: true,
                user_id: userLogin.uid
            };
            const dataUpdatePost = {
                total_comment: props.item.total_comment + 1,
                update_at: firebase.firestore.Timestamp.now(),
            };

            const resAddComment = await db.collection('posts').doc(itemComment.id).collection('arr_comment').add(data);
            const resTotalComment = await db.collection('posts').doc(itemComment.id).update(dataUpdatePost);
            // if (res.id) {
            //     enqueueSnackbar('Successfully added item ', { anchorOrigin: { vertical: 'top', horizontal: 'left' }, variant: 'success', autoHideDuration: 3000 });
            // }
            // return;
            //text.focus();
        }


    };
    let options = {
        toolbar: {
            prev: true,
            next: true
        },
        movable: false,
        loading: false,
        slideOnTouch: true,
        toggleOnDblclick: true
    };


    return (
        <div className="post">
            <div className="post-header">
                <div className="post-header-left" >
                    <img src={props.item.avatar} alt="avatar" className="post-header-avatar" />
                </div>
                <div className="post-header-center">
                    <div >
                        <span className="post-header-center-from">{props.item.full_name}</span>

                        <span className="post-header-center-to-icon"> {props.item.name_to && <FontAwesomeIcon icon={faCaretRight} />} </span>
                        <span className="post-header-center-to">{props.item.name_to}</span>
                    </div>
                    <div>
                        <span className="post-header-center-time"> <Moment unix locale="vi" toNow ago titleFormat="D MMM YYYY" withTitle>{props.item.create_at.seconds}</Moment> </span> <span className="post-header-center-status"> <FontAwesomeIcon icon={typeShoW[props.item.type_show]} /> </span>
                    </div>

                </div>
                <div className="post-header-right">
                    <FontAwesomeIcon icon={faEllipsisH} />
                </div>

            </div>
            <div className="post-content">
                <div className="post-content-text">
                    {isHiddenContentTextOver ? textOverflow(contentText) : contentText}
                    <span className="load-more-text-post" onClick={(e) => { setIsHiddenContentTextOver(false) }} > {isHiddenContentTextOver && '... Xem Thêm'} </span>
                </div>
                <div className="post-content-images">
                    <RViewer options={options} imageUrls={imageList.map((item, index) => item.image.url)}>
                        {
                            imageList.map((item, index) => {
                                return (
                                    <div key={index} className={'image-' + (imageList.length < 5 ? imageList.length : 'n')} data-count-more={imageList.length}>
                                        <RViewerTrigger index={index}>
                                            <img src={item.image.url != undefined ? item.image.url : ''} alt={item.image.alt != undefined ? item.image.alt : ''} />
                                        </RViewerTrigger>
                                    </div>
                                )
                            })
                        }
                    </RViewer>

                </div>
                <div className="post-content-action">
                    <ActionPost item={props.item} idPost={props.id} isShow={isShow} listUserLike={userLikeList} />
                </div>
                <div className="post-content-comment">
                    {commentList.map((item, index) => <Comment comment={item.comment} key={index} id={item.id} />)}
                    <InputComment item={userLogin} idPost={props.id} addComment={handelAddComment} />
                </div>
            </div>
        </div>

    );
}

export default Post;