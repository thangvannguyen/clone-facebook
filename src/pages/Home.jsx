import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import Content from '../components/Content/Content';
import SiderLeft from '../components/Left/SiderLeft';
import SiderRigth from '../components/Right/SiderRight';

Home.propTypes = {

};

function Home(props) {

    return (
        <Layout>
            <Row>
                <Col xs={24} sm={24} md={5} lg={5} className={`w-sider-left ${props.showMenu ? 'show-menu' : ''}`}>
                    <SiderLeft></SiderLeft>
                </Col>
                <Col xs={24} sm={24} md={14} lg={14} className="w-sider-content" >
                    <Content></Content>
                </Col>
                <Col xs={24} sm={24} md={5} lg={5} className="w-sider-right">
                    <SiderRigth></SiderRigth>
                </Col>
            </Row>
        </Layout>
    );
}

export default Home;