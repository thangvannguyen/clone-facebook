import React from 'react';
import PropTypes from 'prop-types';
import { useState, useRef } from 'react';
import SendIcon from '@material-ui/icons/Send';
// import ContentEditable from 'react-contenteditable'

InputComment.propTypes = {

};

function InputComment(props) {

    const [contentValue, setContentValue] = useState('');
    const [isFocusComment, setIsFocusComment] = useState(false);
    const inputRef = useRef(null);
    const handleKeyChange = (e) => {
        setIsFocusComment(true)
        setContentValue(e.target.textContent.trim())
        if (e.keyCode === 13 && window.innerWidth > 800) {
            e.preventDefault();
            const data = {
                id: props.idPost,
                content: contentValue,
            };
            props.addComment(data);
            e.target.textContent = '';
            setContentValue('');
        }
    };

    const handleCommentMobile = (e) => {
        //setIsFocusComment(true);
        e.preventDefault();
        if (contentValue !== '') {
            const data = {
                id: props.idPost,
                content: contentValue,
            };
            props.addComment(data);
            inputRef.current.textContent = '';
            inputRef.current.focus();
            setContentValue('');
        }


    };




    return (
        <div className="input-comment">
            <div className="input-comment-avatar">
                <img src={props.item.photoURL} alt="avatar" />
            </div>
            <div className="input-comment-text" >
                <div className="input-comment-text-string" ref={inputRef} aria-label="Bình luận về bài viết" contentEditable={true} suppressContentEditableWarning={true} onKeyDown={handleKeyChange} ></div>
                <div className={`btn-comment-mobile ${isFocusComment ? 'is-focus-comment' : ''}`} onClick={handleCommentMobile}> <SendIcon /> </div>
                <div className="input-comment-menu-icon" ></div>
            </div>
        </div>
    );
}

export default InputComment;