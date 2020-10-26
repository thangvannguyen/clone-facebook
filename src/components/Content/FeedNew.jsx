import React from 'react';
import PropTypes from 'prop-types';


FeedNew.propTypes = {

};

function FeedNew(props) {

    return (
        <div className="feed-new">
            <img src={props.imageFeed} alt="image-bg" className="feed-new-image" />
            <div className="feed-new-background_content"> <span className="feed-new-background_content-text">{props.contentFeed}</span> </div>
            <div className="feed-new-name_user">{props.nameUserFeed}</div>
            <div className="feed-new-avatar"> <img src={props.avatarFeed} alt="avatar" /></div>
        </div>
    );
}

export default FeedNew;