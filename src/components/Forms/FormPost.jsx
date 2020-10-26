import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './FormPost.scss';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { TYPE_SHOW_POST_ICON, TYPE_SHOW_POST_SELECT_TEXT } from '../../constants/TypeShowPost'
import { db, storage } from '../../firebase';
import firebase from "firebase";
import Noti from '../Noti/Noti';
import { Button, notification } from 'antd';
import { useSelector } from 'react-redux';
import { images } from '../../constants/images';



FormPost.propTypes = {

};

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
        borderRadius: 12,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    textHeader: {
        textAlign: 'center',
        fontWeight: 700,
        color: '#e4e6eb'
    }
});


const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6" className={classes.textHeader}>{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const InfoPost = ((props) => {
    const { name, avatar } = props;
    const typeShowIcon = TYPE_SHOW_POST_ICON;
    const typeShowText = TYPE_SHOW_POST_SELECT_TEXT;
    const getNOnlyName = name !== null && name !== '' ? name.split(" ") : [];
    const handleChangeSelect = (event) => {
        props.handleChangeSelect(event.target.value);
    };
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.focus()
    }, []);

    const focusDivText = () => {
        inputRef.current.focus();
    };
    const getContent = (e) => {

        let content = e.currentTarget.innerText;
        props.handleContentText(content.trim());

    };

    const [isUploading, setIsUploading] = useState(false);

    const beforeUpload = (file) => {
        return true;
    };
    const customRequest = (info) => {
        const { file, onSuccess } = info;
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                setIsUploading(true);
            },
            (error) => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(file.name)
                    .getDownloadURL()
                    .then(url => {
                        props.handleSetFileList({ id: Math.floor(999999999999999 * Math.random()).toString(), url: url });
                        setIsUploading(false);

                    })
            }

        )

    };
    const handleDeleteFile = (itemRemove) => {
        if (itemRemove.id) {
            props.handleDeleteFileList(itemRemove);
        }

    };




    return (
        <div className="form-post-modal">
            <div className="info-post">
                <div className="info-post-avatar"> <img src={avatar} alt="avatar" /></div>
                <div className="info-post-name-select">
                    <span className="info-post-name"> {name}</span>
                    <div className="info-post-select">
                        <Select labelId="demo-simple-select-label" value={props.typeShow} onChange={handleChangeSelect} >
                            {typeShowText.map((item, index) => <MenuItem key={index} value={item.value}> <FontAwesomeIcon icon={typeShowIcon[item.value]} /> &nbsp;  {item.type}</MenuItem>)}
                        </Select>
                    </div>
                </div>
            </div>
            <div className="info-content" onClick={focusDivText}>
                <div className="info-content-text" onInput={getContent} ref={inputRef} aria-label="Nội dung về bài viết" contentEditable={true} suppressContentEditableWarning={true}>{getNOnlyName[getNOnlyName.length - 1]} ơi, bạn đang nghĩ gì thế!</div>
                <div className="list-file-post">
                    <div className={`image-file-post loading-upload-file ${isUploading ? 'loading' : ''}`}></div>
                    {
                        props.fileListPost.map((item, index) => {
                            return (<div className="image-file-post" key={index}>
                                <img src={item.url} alt="image" />
                                <span onClick={() => handleDeleteFile(item)}> <DeleteIcon /></span>
                            </div>)
                        })
                    }


                </div>
            </div>
            <div className="post-feed-bottom-more">
                <div className="post-feed-bottom">
                    <div className="post-feed-bottom-item">
                        <img src="../images/videop.png" alt="video" className="post-feed-bottom-item-image" />
                        <span className="post-feed-bottom-item-text">Video trực tiếp</span>
                    </div>
                    <Upload
                        listType="picture"
                        multiple={false}
                        customRequest={customRequest}
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                    >
                        <div className="post-feed-bottom-item" >


                            <img src="../images/imagep.png" alt="image" className="post-feed-bottom-item-image" />
                            <span className="post-feed-bottom-item-text">Ảnh/Video</span>


                        </div>
                    </Upload>
                    <div className="post-feed-bottom-item">
                        <img src="../images/hahap.png" alt="haha" className="post-feed-bottom-item-image" />
                        <span className="post-feed-bottom-item-text">Cảm xúc/Hoạt động</span>
                    </div>

                </div>
            </div>

        </div>
    );
});

const DialogModal = withStyles((theme) => ({
    root: {
        background: 'rgba(24,25,26,0.6)',
    },
}))(Dialog);

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),

    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);


function FormPost(props) {

    const [typeShow, setTypeShow] = useState(1);
    const [fileList, setFileListPost] = useState([]);
    const [contentText, setContentText] = useState(null);
    const userLogin = useSelector(state => state.user.info);
    const handleChangeSelect = (value) => {
        setTypeShow(value);
    };

    const handleSetFileList = (newState) => {
        let fileListNew = [...fileList];
        fileListNew.unshift(newState);
        setFileListPost(fileListNew);

    };

    const handleDeleteFileList = (itemRemove) => {
        let fileListNew = fileList.filter((item) => {
            return item.id !== itemRemove.id;
        });
        setFileListPost(fileListNew);
    };

    const handleContentText = (contentText) => {
        setContentText(contentText);
    };

    const openNotification = () => {
        notification.open({
            message: 'Thông báo!',
            description: 'Bài viết đã được đăng lên thành công.',
            className: 'custom-class',
            style: {
                width: 600,
            },
        });
    };


    const handelAddPost = async () => {

        let arrImage = fileList.map((item) => {
            return { alt: "Image", url: item.url };
        });
        const data = {
            avatar: userLogin.photoURL !== undefined ? userLogin.photoURL : images.AVATAR_USER_DEFAULT,
            full_name: userLogin.displayName,
            user_id: userLogin.uid,
            name_to: '',
            create_at: firebase.firestore.Timestamp.now(),
            update_at: firebase.firestore.Timestamp.now(),
            status: 1,
            total_comment: 0,
            total_like: 0,
            type_show: typeShow,
            content_text: contentText,

        };

        const res = await db.collection('posts').add(data);
        if (res.id) {
            if (arrImage.length > 0) {
                let uploadImage = arrImage.map(async (item) => {
                    const resImage = await db.collection('posts').doc(res.id).collection('arr_image').add(item);
                    return resImage.id;
                });
                if (uploadImage.length > 0) {
                    props.onClickClose();
                    setContentText(null);
                    setFileListPost([]);
                    openNotification();

                }
            } else {
                props.onClickClose();
                setContentText(null);
                setFileListPost([]);
                openNotification();
            }
        }

    };
    return (
        <div className="form_post">
            <DialogModal onClose={props.onClickClose} aria-labelledby="customized-dialog-title" open={props.open} className="dialog-post">
                <DialogTitle id="customized-dialog-title" onClose={props.onClickClose}>
                    Tạo bài viết
                </DialogTitle>
                <DialogContent dividers>
                    <InfoPost name={props.name} avatar={props.avatar} typeShow={typeShow} fileListPost={fileList} contentText={contentText} handleChangeSelect={handleChangeSelect} handleSetFileList={handleSetFileList} handleDeleteFileList={handleDeleteFileList} handleContentText={handleContentText} />
                </DialogContent>
                <DialogActions>
                    <span className="btn-add-post" onClick={handelAddPost}>
                        Đăng
                    </span>
                </DialogActions>
            </DialogModal>
        </div>
    );
}

export default FormPost;