import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVideo, faSearch, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { Popover } from 'antd';
MenuOption.propTypes = {

};

function MenuOption(props) {
    return (
        <div className="sider-right-menu_option">
            <span>Người liên hệ</span>
            <div>
                <Popover content="Phòng họp mặt mới" >
                    <span className="sider-right-menu_option-icon"> <FontAwesomeIcon icon={faVideo} /></span>
                </Popover>
                <Popover content="Tìm kiếm theo tên hoặc nhóm" >
                    <span className="sider-right-menu_option-icon"> <FontAwesomeIcon icon={faSearch} /></span>
                </Popover>
                <Popover content="Tùy chọn" >
                    <span className="sider-right-menu_option-icon"><FontAwesomeIcon icon={faEllipsisH} /> </span>
                </Popover>
            </div>
        </div>
    );
}

export default MenuOption;