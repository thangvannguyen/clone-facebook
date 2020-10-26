import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from "firebase";
import { db } from '../../firebase';
import './Content.scss';
import FeedNew from './FeedNew';
import AddFeedNew from './AddFeedNew';
import PostFeed from './PostFeed';
import Post from './Post';
import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading/Loading';


Content.propTypes = {

};

function Content(props) {
    const [postList, setPostList] = useState([]);
    const userLogin = useSelector(state => state.user.info);
    const [indexPostNow, setIndexPostNow] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const getCallDataPost = async () => {
        // console.log('indexPostNow', postList.length);
        // setTimeout(() => {
        //     setPostList(postList.concat([1, 2, 3, 4, 5]));
        // }, 1500);

        let listTmp = await db.collection('posts').orderBy("create_at", "desc").limit(indexPostNow + 5).get();
        if ((listTmp.size % 5) > 0) {
            setHasMore(false);
        }
        const postsNew = listTmp.docs.map(doc => ({
            id: doc.id,
            post: doc.data(),
        }));
        setIndexPostNow(indexPostNow + 5);
        setPostList(postsNew);

        // db.collection('posts').orderBy("create_at", "desc").limit(indexPostNow + 3).onSnapshot(snapshot => {
        //     //const postsNew = snapshot.docs;
        //     const postsNew = snapshot.docs.map(doc => ({
        //         id: doc.id,
        //         post: doc.data(),
        //     }));
        //     setIndexPostNow(indexPostNow + 3);
        //     setPostList(postsNew);
        // });



    };

    useEffect(() => {

        getCallDataPost();

    }, []);


    return (
        <div className="content-fluid">
            <div className="content-container">
                <div className="list-feed-new">
                    <AddFeedNew imageFeed={userLogin.photoURL} contentFeed="" nameUserFeed="Tạo tin" avatarFeed={userLogin.photoURL} />
                    <FeedNew imageFeed="../images/feed/c.jpg" contentFeed="Chiều nắng sáng vườn" nameUserFeed="Nguyễn Thanh Mai" avatarFeed="../images/users/a.jpg" />
                    <FeedNew imageFeed="../images/feed/trinh.jpg" contentFeed="" nameUserFeed="Cao Thanh Thúy" avatarFeed="../images/users/b.jpg" />
                    <FeedNew imageFeed="../images/feed/h.jpg" contentFeed={`Mãi yêu ${userLogin.displayName}`} nameUserFeed="San San" avatarFeed="../images/users/c.jpg" />
                    <FeedNew imageFeed="../images/feed/nam.jpg" contentFeed="" nameUserFeed="Lê Minh Kỳ" avatarFeed="../images/users/d.jpg" />
                </div>
                <div className="post-feed-new">
                    <PostFeed avatar={userLogin.photoURL} name={userLogin.displayName} />
                    <InfiniteScroll
                        dataLength={postList.length}
                        next={getCallDataPost}
                        hasMore={hasMore}
                        loader={<Loading />}
                        scrollableTarget={window.innerWidth <= 800 ? 'scrollableDivMobi' : 'scrollableDiv'}

                    >
                        {postList.map((item, index) => <Post key={index} id={item.id} item={item.post} />)}

                    </InfiniteScroll>
                </div>

            </div>

        </div>
    );
}

export default Content;