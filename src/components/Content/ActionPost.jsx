import React from 'react';
import PropTypes from 'prop-types';
import { TYPE_LIKE_POST } from '../../constants/TypeLikePost'
import { useDispatch, useSelector } from 'react-redux';
import { hiddenMenuLike, showMenuLike } from '../../actions/like';

ActionPost.propTypes = {

};


function ActionPost(props) {

    //const [isShowTimeOut, setIsShowTimeOut] = useState(false);
    let isShowTimeOut;
    const dispatch = useDispatch();

    const typeLike = TYPE_LIKE_POST;
    const iTemProp = props.item;
    const idPostNew = props.idPost;
    const listUserLike = props.listUserLike;
    const userLogin = useSelector(state => state.user.info);
    const isShowHover = useSelector(state => state.like.isHover);
    const isShowAction = useSelector(state => state.like.isShow);

    const handleMouseHover = (e) => {

        if (window.innerWidth <= 800) {
            const rect = e.target.getBoundingClientRect()
            const clientY = rect.bottom;
            const coordinatesMenuLikeNew = {
                show: {
                    x: 20,
                    y: clientY,
                    opacity: 1
                },
                isShow: true,
                idPost: idPostNew,
                isHover: false
            };
            const action = showMenuLike(coordinatesMenuLikeNew);
            isShowTimeOut = setTimeout(() => {
                dispatch(action);
            }, 300);

        } else {
            const rect = e.target.getBoundingClientRect();
            const clientX = rect.left;
            const clientY = rect.top;
            const coordinatesMenuLikeNew = {
                show: {
                    x: clientX,
                    y: clientY,
                    opacity: 1
                },
                isShow: true,
                idPost: idPostNew
            };
            const action = showMenuLike(coordinatesMenuLikeNew);
            isShowTimeOut = setTimeout(() => {
                dispatch(action);
            }, 300);

        }


    }
    const handleMouseLeave = () => {

        // clearTimeout(isShowTimeOut);
        const coordinatesMenuLikeNew = {
            show: {
                x: 0,
                y: 0,
                opacity: 0
            },
            isShow: false,
            isHover: false,

        };
        const action = hiddenMenuLike(coordinatesMenuLikeNew);
        setTimeout(() => {
            if (isShowAction && !isShowHover) {
                dispatch(action);
            }
        }, 2000);
    }

    let youLike = {
        isLike: false,
        typeLike: 0
    };
    let arrImage = [];
    listUserLike.map((item) => {
        if (!arrImage.includes(item.user.type_like) && arrImage.length < 3) {
            arrImage.push(item.user.type_like)
        }
        if (item.user.user_id === userLogin.uid) {
            youLike.isLike = true;
            youLike.typeLike = item.user.type_like;
        }
    });

    return (
        <div className="action">
            <div className="action-detail-action">
                <div className="action-detail-action-like">
                    {
                        arrImage.map((item, index) => {
                            return <img src={`../images/icon/${typeLike[item]['type']}.png`} alt="action" key={index} />
                        })
                    }
                    <span>{youLike.typeLike && listUserLike.length - 1 > 0 ? `Bạn và ${listUserLike.length - 1} người khác` : `${listUserLike.length > 0 ? listUserLike.length : ''}`}</span>

                </div>
                <div className="action-detail-action-comment">
                    <span>{iTemProp.total_comment > 0 && iTemProp.total_comment + ' bình luận'} </span>
                </div>

            </div>
            <div className="action-btn">
                <div className="action-btn-like"
                    onMouseEnter={handleMouseHover}
                    onMouseLeave={handleMouseLeave}>
                    <img src={`../images/icon/${youLike.isLike ? (youLike.typeLike !== 1 ? typeLike[youLike.typeLike]['type'] : 'btn-liked') : 'btn-like'}.png`} alt="action like" />
                    <span className={typeLike[youLike.typeLike].classColor}>{typeLike[youLike.typeLike].name}</span>
                </div>
                <div className="action-btn-comment">
                    <img src="../images/icon/btn-comment.png" alt="action comment" />
                    <span>Bình luận</span>
                </div>
            </div>
            {/* // */}

        </div>

    );
}

export default ActionPost;