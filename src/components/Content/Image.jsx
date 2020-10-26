import React from 'react';
import PropTypes from 'prop-types';
import { RViewerTrigger } from 'react-viewerjs';

Image.propTypes = {

};

function Image(props) {
    const countMore = props.imgCount - 4;
    return (
        <div key={props.index} className={'image-' + (props.imgCount < 5 ? props.imgCount : 'n')} data-count-more={countMore}>
            <RViewerTrigger index={props.index}>
                <img src={props.item.url} alt={props.item.alt} />
            </RViewerTrigger>
        </div>
    );
}

export default Image;