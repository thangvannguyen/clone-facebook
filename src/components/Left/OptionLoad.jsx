import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
OptionLoad.propTypes = {

};

function OptionLoad(props) {
    return (
        <div className={`left-option ${props.showMore ? 'd-none' : ''}`} onClick={props.onClick}>
            <span className="left-option-icon" >
                <FontAwesomeIcon icon={props.typeIcon === 'up' ? faAngleUp : faAngleDown} />
            </span>
            <span className="left-option-noti">{props.optionName}
            </span>
        </div>
    );
}

export default OptionLoad;