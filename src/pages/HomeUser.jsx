import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Home from './Home';
import Header from '../components/Header/Header';

HomeUser.propTypes = {

};

function HomeUser(props) {

    const [showMenu, setShowMenu] = useState(false);
    const { handleLogout } = props;
    const handleSetShowMenu = (status) => {
        setShowMenu(status);
    };
    return (
        <div>
            <Header className="container-fluid header_bg" showMenu={showMenu} handleSetShowMenu={handleSetShowMenu} handleLogout={handleLogout} />
            <Home showMenu={showMenu} id="scrollableDivMobi" />

        </div>
    );
}

export default HomeUser;