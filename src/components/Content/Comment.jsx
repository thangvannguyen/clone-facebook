import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment/locale/vi';

Comment.propTypes = {

};

function Comment(props) {

    return (
        <div className="comment">
            <div className="comment-avatar">
                <img src={props.comment.avatar} alt="avatar" />
            </div>
            <div className="comment-content">
                <div className="comment-content-text">
                    <span>{props.comment.full_name}</span>
                    <div> {props.comment.content}</div>
                </div>
                <div className="comment-content-action">
                    <span>Thích</span>
                    <span>Trả lời</span>
                    <span> <Moment unix locale="vi" toNow ago titleFormat="D MMM YYYY" withTitle >{props.comment.create_at.seconds}</Moment> </span>
                </div>
            </div>

        </div>
    );
}

export default Comment;