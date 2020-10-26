import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { Layout } from 'antd';
import ActionPost from './components/Action/ActionPost';
import { useDispatch, useSelector } from 'react-redux';
import Login from './components/LoginSigUp/Login';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "firebase";
import { db, auth } from './firebase';
import HomeUser from './pages/HomeUser';
import { updateUser } from './actions/user';
import Loading from './components/Loading/Loading';
import { images } from './constants/images';

function App() {


  const coordinatesMenuLike = useSelector(state => state.like.show);

  const userRedux = useSelector(state => state.user);

  const dispatch = useDispatch();

  //Login
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passWordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);



  const handleLogin = () => {
    setEmailError('');
    setPasswordError('');
    setIsLoading(true);
    setIsLogin(true);
    auth.signInWithEmailAndPassword(email, password).catch(function (error) {
      // Handle Errors here.
      setIsLoading(false);
      setIsLogin(false);
      switch (error.code) {
        case "auth/invalid-email":
          setEmailError('Email bạn đã nhập không hợp lệ.');
          break;
        case "auth/user-disabled":
          setEmailError('Email bạn đã nhập không tồn tại.');
          break;
        case "auth/user-not-found":
          setEmailError('Tài khoản bạn đã nhập không tồn tại.');
          break;
        case "auth/wrong-password":
          setPasswordError('Mật khẩu bạn đã nhập không chính xác.');
          break;
      }
    });
  }

  const authListenner = () => {
    auth.onAuthStateChanged(user => {
      if (user) {
        const userNew = {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL !== null && user.photoURL !== '' ? user.photoURL : images.AVATAR_USER_DEFAULT,
          phoneNumber: user.phoneNumber,
          uid: user.uid,
        };
        const action = updateUser(userNew);
        dispatch(action);
        //setIsLoading(true);
        setUser(userNew);
        setTimeout(() => {
          setIsLoading(false);
        }, 0);

      } else {
        const userNew = {};
        const action = updateUser(userNew);
        setIsLoading(true);
        setTimeout(() => {
          setUser('');
          dispatch(action);
          setIsLoading(false);
        }, 2000);
      }
    });
  }

  useEffect(() => {
    authListenner();
  }, []);

  if (isLoading) {
    return <div style={{ height: '100vh' }}>
      <Loading />
    </div>;
  }

  return (
    <Layout className="container-fluid-bg" id="scrollableDiv">
      <Router>
        <Switch>
          <Route exact path="/">
            {user ? <HomeUser /> :
              <Login
                email={email}
                password={password}
                emailError={emailError}
                passWordError={passWordError}
                handleLogin={handleLogin}
                setEmail={setEmail}
                setPassword={setPassword}
              />}

          </Route>
        </Switch>
      </Router>

      <ActionPost coordinatesMenuLike={coordinatesMenuLike} />
    </Layout>
  );
}
export default App;
