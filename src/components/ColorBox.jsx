import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './box.scss'

ColorBox.propTypes = {

};

function ColorBox() {
    const [color, setColor] = useState('deeppink');
    return (
        <div className="color-box" style={{ backgroundColor: color }}>
            BOX
        </div>
    );
}

export default ColorBox;