import React from 'react';
import PropTypes from 'prop-types';
import './SiderRight.scss';
import Option from './Option';
import MenuOption from './MenuOption';
SiderRight.propTypes = {

};

function SiderRight(props) {
    return (
        <div className="sider-right">
            <MenuOption />
            <Option optionImage="../images/users/admin.jpg" optionName="Thắng Văn Nguyễn" optionSatus="1" optionTime="4 giờ" />
            <Option optionImage="../images/users/a.jpg" optionName="Nguyễn Thanh Mai" optionSatus="1" optionTime="4 giờ" />
            <Option optionImage="../images/users/m.jpg" optionName="Thạch Vũ" optionSatus="1" optionTime="1 giờ" />
            <Option optionImage="../images/users/b.jpg" optionName="Cao Thanh Thúy" optionSatus="0" optionTime="7 giờ" />
            <Option optionImage="../images/users/c.jpg" optionName="San San" optionSatus="2" optionTime="8 giờ" />
            <Option optionImage="../images/users/d.jpg" optionName="Lê Minh Kỳ" optionSatus="1" optionTime="4 giờ" />
            <Option optionImage="../images/users/x.jpg" optionName="Nguyễn Đức Phúc" optionSatus="2" optionTime="5 phút" />
            <Option optionImage="../images/users/j.gif" optionName="SinKy" optionSatus="1" optionTime="1 giờ" />
            <Option optionImage="../images/users/e.jpg" optionName="Trương Thị Mỹ Ngọc" optionSatus="2" optionTime="40 phút" />
            <Option optionImage="../images/users/f.jpg" optionName="Trần Mỹ Duyên" optionSatus="1" optionTime="1 giờ" />
            <Option optionImage="../images/users/l.jpg" optionName="Mèo Út" optionSatus="1" optionTime="1 giờ" />
            <Option optionImage="../images/users/g.jpg" optionName="Thạch Thy Mai" optionSatus="2" optionTime="9 giờ" />
            <Option optionImage="../images/users/n.jpg" optionName="Lý Hữu Anh" optionSatus="2" optionTime="9 giờ" />
            <Option optionImage="../images/users/h.jpg" optionName="Thiên Cẩm Nhung" optionSatus="1" optionTime="1 giờ" />
            <Option optionImage="../images/users/k.jpg" optionName="Trần Mỹ Tiên" optionSatus="2" optionTime="5 phút" />


        </div>
    );
}

export default SiderRight;