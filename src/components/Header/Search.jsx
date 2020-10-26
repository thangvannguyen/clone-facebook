import React from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';


Search.propTypes = {

};

function Search(props) {
    return (
        <div className="header-search">
            <img src="../images/logofb.png" alt="logo facebook" className="header-search-logo" />
            <div className="header-input_search">
                <SearchOutlined className="header-input_search-icon" />
                <input type="text" placeholder="Tìm kiếm trên Facebook" />
            </div>
        </div>
    );
}

export default Search;