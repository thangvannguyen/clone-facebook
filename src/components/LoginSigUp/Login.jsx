import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Login.scss';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import SignUp from './SignUp';

function Login(props) {

    const [showPass, setShowPass] = useState(false);
    const [showModalSignUp, setShowModalSignUp] = useState(false);

    const handleShowPass = () => {
        const showPassNew = !showPass;
        setShowPass(showPassNew);
    };
    const handleOpenModalSignup = () => {
        setShowModalSignUp(true);
    }

    const handleCloseModalSignup = () => {
        setShowModalSignUp(false);
    }



    const { email, password, setEmail, setPassword, emailError, passWordError, handleLogin } = props;

    return (
        <div className="bg-page-login">
            <div className="page-login">
                <div className="page-login-left">
                    <div className="page-login-logo">facebook</div>
                    <h3 className="page-login-intro-text">Facebook giúp bạn kết nối và chia sẻ với mọi người trong cuộc sống của bạn.</h3>
                </div>
                <div className="page-login-right">
                    <div className="form-show">
                        <input type="text" name="user_name" className={`input-form-login ${emailError ? 'mb-0' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} autoFocus placeholder="Email hoặc số điện thoại" />
                        <div className="text-danger-error">{emailError}</div>
                        <div className="position-relative">
                            <input type={showPass ? "text" : "password"} name="pass_word" value={password} onChange={(e) => setPassword(e.target.value)} className={`input-form-login ${passWordError ? 'mb-0' : ''}`} placeholder="Mật khẩu" />
                            <span className="icon-show" onClick={handleShowPass}> {showPass ? < VisibilityOffTwoToneIcon style={{ color: '#1877f2' }} /> : <VisibilityTwoToneIcon style={{ color: '#1877f2' }} />}</span>
                        </div>
                        <div className="text-danger-error">{passWordError}</div>
                    </div>
                    <button className="btn-login" onClick={handleLogin}>Đăng nhập</button>
                    <span className="link-forget-pass"> <a href="#">Quên mật khẩu?</a> </span>
                    <div className="line-form"></div>

                    <button className="btn-signup" onClick={handleOpenModalSignup}>Tạo tài khoản mới</button>
                </div>
            </div>
            < SignUp open={showModalSignUp} handleCloseModalSignup={handleCloseModalSignup} />
        </div>
    );
};

Login.propTypes = {

};

export default Login;