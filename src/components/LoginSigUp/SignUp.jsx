import React, { useState } from 'react';
import './SignUp.scss';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Form, Input, Button, Row, Col } from 'antd';
import VisibilityOffTwoToneIcon from '@material-ui/icons/VisibilityOffTwoTone';
import VisibilityTwoToneIcon from '@material-ui/icons/VisibilityTwoTone';
import { auth } from '../../firebase';
import { images } from '../../constants/images';
import axios from 'axios';
import { updateUser } from '../../actions/user';
import { useDispatch } from 'react-redux';



SignUp.propTypes = {

};

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function SignUp(props) {
    const classes = useStyles();
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const [showPass, setShowPass] = useState(false);
    const handleShowPass = () => {
        const showPassNew = !showPass;
        setShowPass(showPassNew);
    };
    const [isLoadingSingup, setIsLoadingSingup] = useState(false);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passWordError, setPasswordError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');


    const dispatch = useDispatch();

    const clearError = () => {
        setEmailError('');
        setPasswordError('');
        setFirstNameError('');
        setLastNameError('');
    }

    const handleSubmitSigup = async (e) => {
        e.preventDefault();
        clearError();
        if (firstName == '') {
            setFirstNameError('Vui lòng nhập họ.');
            return;
        }
        if (lastName == '') {
            setLastNameError('Vui lòng nhập tên.');
            return;
        }
        setIsLoadingSingup(true);
        let avatarRandom = await axios.get(`${images.LINK_RANDOM_AVATAR}`)
            .then(res => {
                return res.request.responseURL;
            });

        auth.createUserWithEmailAndPassword(email, password).then(function (result) {
            setIsLoadingSingup(false);
            const profile = {
                displayName: `${firstName + ' ' + lastName}`,
                photoURL: avatarRandom !== undefined ? avatarRandom : images.AVATAR_USER_DEFAULT,

            };
            const user = auth.currentUser;
            user.updateProfile(profile).then(function (result) {
                console.log('Cập nhật tài khoản thành công');
                const userNew = {
                    displayName: `${firstName + ' ' + lastName}`,
                    photoURL: avatarRandom !== undefined ? avatarRandom : images.AVATAR_USER_DEFAULT,
                    email: user.email,
                    uid: user.uid,

                };
                const action = updateUser(userNew);
                dispatch(action);
            }).catch(function (error) {
                console.log('Cập nhật tài khoản thất bại!', { error });

            });
        }).catch(function (error) {
            // Handle Errors here.
            setIsLoadingSingup(false);
            switch (error.code) {
                case "auth/invalid-email":
                    setEmailError('Email bạn đã nhập không hợp lệ.');
                    break;
                case "auth/email-already-in-use":
                    setEmailError('Email bạn đã nhập đã được sử dụng.');
                    break;
                case "auth/weak-password":
                    setPasswordError('Mật khẩu bạn đã nhập chưa đủ mạnh.');
                    break;
            }
        });
    };

    return (
        <div className="form-signup-modal">
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={props.open}
                closeAfterTransition
                disableBackdropClick
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <Fade in={props.open} className="form-signup">
                    <div className={classes.paper}>
                        <div className="form-header">
                            <div className="text-header">
                                <h3>Đăng ký</h3>
                                <span>Nhanh chóng và dễ dàng.</span>
                            </div>
                            <div className="btn-icon-close" onClick={props.handleCloseModalSignup}> <CloseIcon /> </div>
                        </div>
                        <div className="form-body">
                            <Form name="basic" initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed}>

                                <Row gutter={[12, 0]}>
                                    <Col span={24} lg={12} md={12} sm={12} >
                                        <Form.Item >
                                            <Input placeholder="Họ" className="input-form-signup" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                            <span className="text-danger">{firstNameError}</span>
                                        </Form.Item>

                                    </Col>
                                    <Col span={24} lg={12} md={12} sm={12}>
                                        <Form.Item >
                                            <Input placeholder="Tên" className="input-form-signup" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                            <span className="text-danger">{lastNameError}</span>
                                        </Form.Item>

                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item >
                                            <Input placeholder="Email" className="input-form-signup" value={email} onChange={(e) => setEmail(e.target.value)} />
                                            <span className="text-danger">{emailError}</span>
                                        </Form.Item>

                                    </Col>
                                </Row>
                                <Row >
                                    <Col span={24}>
                                        <Form.Item >
                                            <Input placeholder="Mật khẩu" className="input-form-signup" type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <span className="icon-show" onClick={handleShowPass}> {showPass ? < VisibilityOffTwoToneIcon style={{ color: '#1877f2' }} /> : <VisibilityTwoToneIcon style={{ color: '#1877f2' }} />}</span>
                                        </Form.Item>
                                        <span className="text-danger">{passWordError}</span>

                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <p className="text-rules">Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản,
                                        Chính sách dữ liệu và Chính sách cookie của chúng tôi.
                                         Bạn có thể nhận được thông báo của chúng tôi qua SMS và hủy nhận bất kỳ lúc nào.</p>
                                    </Col>
                                </Row>
                                <Form.Item >
                                    <Button type="primary" htmlType="submit" className="btn-action-signup" onClick={handleSubmitSigup}>
                                        {isLoadingSingup ? <img src={images.ICON_LOADING_3_DOT} style={{ width: '25px' }} /> : 'Đăng kí'}
                                    </Button>
                                </Form.Item>
                            </Form>

                        </div>


                    </div>

                </Fade>
            </Modal>
        </div>
    );
}

export default SignUp;