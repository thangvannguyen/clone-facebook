import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './PostFeed.scss';
import FormPost from '../Forms/FormPost';

PostFeed.propTypes = {

};

function PostFeed(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const getNOnlyName = props.name !== null && props.name !== '' ? props.name.split(" ") : [];
    return (
        <div className="post-feed">
            <div className="post-feed-top">
                <img src={props.avatar} alt="avatar" />
                <span onClick={handleClickOpen}>{getNOnlyName[getNOnlyName.length - 1]} ơi, bạn đang nghĩ gì thế?</span>
            </div>
            <div className="hr-post"></div>
            <div className="post-feed-bottom">
                <div className="post-feed-bottom-item">
                    <img src="../images/videop.png" alt="video" className="post-feed-bottom-item-image" />
                    <span className="post-feed-bottom-item-text">Video trực tiếp</span>
                </div>
                <div className="post-feed-bottom-item">
                    <img src="../images/imagep.png" alt="image" className="post-feed-bottom-item-image" />
                    <span className="post-feed-bottom-item-text">Ảnh/Video</span>
                </div>
                <div className="post-feed-bottom-item">
                    <img src="../images/hahap.png" alt="haha" className="post-feed-bottom-item-image" />
                    <span className="post-feed-bottom-item-text">Cảm xúc/Hoạt động</span>
                </div>
            </div>
            <FormPost open={open} onClickClose={handleClose} avatar={props.avatar} name={props.name} />


        </div>
    );
}

export default PostFeed;