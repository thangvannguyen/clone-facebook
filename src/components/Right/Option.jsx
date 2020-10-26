import React from 'react';
import PropTypes from 'prop-types';
Option.propTypes = {

};

function Option(props) {

    const noti = (status, time) => {
        if (status == 1) {
            return <span className="right-option-status" data-status={status}></span>
        } else if (status == 2) {
            return <span className="right-option-status-time" data-status={status}>{time}</span>
        } else if (status == 0) {
            return <span className="right-option-status" data-status={status}></span>
        }
    };

    return (
        <div className="right-option">
            <span className="right-option-warp" >
                <img src={props.optionImage} alt="image" />
                {noti(props.optionSatus, props.optionTime)}
            </span>
            <span className="right-option-name">{props.optionName}</span>
        </div>
    );
}

export default Option;