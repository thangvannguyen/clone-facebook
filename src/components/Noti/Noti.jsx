import React from 'react';
import PropTypes from 'prop-types';
import { Button, notification } from 'antd';
const Context = React.createContext({ name: 'Default' });



function Noti(props) {

    const openNotification = () => {
        notification.open({
            message: 'Notification Title',
            description:
                'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            onClick: () => {
                console.log('Notification Clicked!');
            },
        });
    };
    return (
        openNotification()
    );
}

export default Noti;