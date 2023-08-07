import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { PiBellSimpleBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../redux/reducers/LoginSlice';
import { fetchNotifications } from '../../redux/reducers/NotificationSlice';
import './styles.css';

export default function NotificationSocket() {
    const dispatch = useDispatch();
    const { notification } = useSelector(state => state.notification);
    const [isNewNotification, setIsNewNotification] = useState(false);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Socket.IO connesso');
        });

        socket.on('disconnect', () => {
            console.log('Socket.IO disconnesso');
        });

        socket.on('like', (data) => {
            console.log('Notifica:', data);
            dispatch(fetchNotifications());
            setIsNewNotification(true); // Imposta il flag per indicare una nuova notifica
            console.log(notification);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    return (
        <div className="d-flex justify-content-center align-items-center me-3">
            <div className="d-flex justify-content-center align-items-center">
                <Dropdown id='noti'>
                    <Dropdown.Toggle variant={null} className='position-realtive' >
                        {/* Icona della campanella */}
                        <PiBellSimpleBold style={{ fontSize: '25px', cursor: 'pointer' }} />
                        {/* Aggiungi il badge solo se ci sono nuove notifiche */}
                        {isNewNotification && <div className='alertnoti'>
                            <span className="badge bg-danger rounded-pill">!</span>
                            </div>}
                    </Dropdown.Toggle>

                    {/* Dropdown.Menu con le notifiche */}
                    <Dropdown.Menu className="custom-dropdown-menu p-3">
                        {notification && notification.map((noti) => (
                            <>
                                <Dropdown.Item key={noti._id}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img className="rounded-circle" width={30} height={30} src={noti.reciver.avatar} alt="" />
                                            <div className="ms-3">
                                                <p className="mb-0">{noti.message}</p>
                                                <p>{noti.createdAt}</p>
                                            </div>
                                        </div>

                                        <p className="mb-0">{noti.createdAt}</p>
                                    </div>
                                </Dropdown.Item>
                                <hr />
                            </>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </div>
    );
}
