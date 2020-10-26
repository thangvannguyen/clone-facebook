import React from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

AddFeedNew.propTypes = {

};

function AddFeedNew(props) {
    return (
        <div className="feed-new">
            <img src={props.imageFeed} alt="image-bg" className="feed-new-image feed-new-image-add" />
            <div className="feed-new-background_content">{props.contentFeed}</div>
            <div className="feed-new-name_user feed-new-name_user-bg">{props.nameUserFeed}</div>
            <div className="feed-new-icon_plus">   <PlusOutlined /></div>
        </div>
    );
}

export default AddFeedNew;