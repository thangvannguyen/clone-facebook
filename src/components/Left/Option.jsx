import React from 'react';
import PropTypes from 'prop-types';
Option.propTypes = {

};

function Option(props) {

    const noti = (noti) => {
        if (noti) return <span>{noti}</span>
    };


    return (
        <div className={`left-option ${props.showMore ? '' : 'd-none'}`} onClick={props.onClick}>
            <img src={props.optionImage} alt="image" />
            <span className="left-option-noti">{props.optionName}
                {noti(props.optionNoti)}
            </span>
        </div>
    );
}

export default Option;