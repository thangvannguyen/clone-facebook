import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import Search from './Search';
import Menu from './Menu';
import Setting from './Setting';
import { Row, Col } from 'antd';
import MenuMobile from './MenuMobile';

Header.propTypes = {

};

function Header(props) {

    const handleSetShowMenu = (status) => {
        props.handleSetShowMenu(status);
    };

    return (
        <Row className="header">
            <Col xs={24} sm={24} md={5} lg={5} className="w-header-search">
                <Search />
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} className="w-header-menu">
                <Menu />
            </Col>
            <Col xs={24} sm={24} md={14} lg={14} className="w-header-menu-mobile">
                <MenuMobile showMenu={props.showMenu} handleSetShowMenu={handleSetShowMenu} />
            </Col>
            <Col xs={24} sm={24} md={5} lg={5} className="w-header-setting"  >
                <Setting />
            </Col>
        </Row>
    );
}

export default Header;