import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './SiderLeft.scss';
import Option from './Option';
import OptionLoad from './OptionLoad';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { TrendingUpRounded } from '@material-ui/icons';


SiderLeft.propTypes = {

};

function SiderLeft(props) {

    const [showMore, setShowMore] = useState(false);

    const userLogin = useSelector(state => state.user.info);
    const handelShowMore = () => {
        setShowMore(!showMore);
    }
    const handleLogout = () => {
        auth.signOut();
    }



    return (
        <div className="sider-left">
            <Option optionImage={userLogin.photoURL} optionName={userLogin.displayName} showMore={true} />
            <Option optionImage="../images/friends.png" optionName="Bạn bè" showMore={true} />
            <Option optionImage="../images/messenger.png" optionName="Messenger" showMore={true} />
            <Option optionImage="../images/group.png" optionName="Nhóm" showMore={true} />
            <Option optionImage="../images/page.png" optionName="Trang" optionNoti="1 mục cập nhật" showMore={true} />
            <Option optionImage="../images/video.png" optionName="Video" showMore={true} />
            <Option optionImage="../images/heart.png" optionName="Chiến dịch gây quỹ" optionNoti="12 mục cập nhật" showMore={true} />
            <Option optionImage="../images/event.png" optionName="Sự kiện" showMore={true} />
            <Option optionImage="../images/logout.png" optionName="Đăng Xuất" showMore={true} onClick={handleLogout} />
            <OptionLoad optionName="Xem thêm" onClick={handelShowMore} showMore={showMore} typeIcon='down' />
            <Option optionImage="../images/listfriend.png" optionName="Danh sách bạn bè" optionNoti="1 mục cập nhật" showMore={showMore} />
            <Option optionImage="../images/game.png" optionName="Trò chơi" showMore={showMore} />
            <Option optionImage="../images/recently.png" optionName="Gần đây nhất" showMore={showMore} />
            <Option optionImage="../images/buyandsell.png" optionName="Nhóm mua và bán" showMore={showMore} />
            <Option optionImage="../images/messengerkids.png" optionName="Messenger nhí" showMore={showMore} />
            <Option optionImage="../images/endow.png" optionName="Ưu đãi" showMore={showMore} />
            <Option optionImage="../images/weather.png" optionName="Thời tiết" showMore={showMore} />
            <Option optionImage="../images/emergency.png" optionName="Ứng phó khẩn cấp" showMore={showMore} />
            <Option optionImage="../images/newvideo.png" optionName="Video chơi game" showMore={showMore} />
            <Option optionImage="../images/celebrate.png" optionName="Kỷ niệm" />
            <Option optionImage="../images/saved.png" optionName="Đã lưu" showMore={showMore} />
            <Option optionImage="../images/job.png" optionName="Việc làm" showMore={showMore} />
            <OptionLoad optionName="Ẩn bớt" onClick={handelShowMore} showMore={!showMore} typeIcon='up' />
            <div className="sider-left-hr"></div>
            <div className="sider-left-div">
                <span className="sider-left-text">Lối tắc</span>
                <span className="sider-left-text-edit">Chỉnh sửa</span>
            </div>
            <Option optionImage="../images/lucky.png" optionName="May mắn" />
            <p className="sider-left-text-copy">Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo  · Cookie ·  · Facebook © 2020</p>
        </div>
    );
}

export default SiderLeft;