import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { PiBellSimpleBold } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { socket } from '../../redux/reducers/LoginSlice';
import { fetchNotifications } from '../../redux/reducers/NotificationSlice';
import './styles.css';

export default function NotificationSocket() {
    const dispatch = useDispatch();
    const { notification } = useSelector(state => state.notification);
    const [isNewNotification, setIsNewNotification] = useState(false);

    useEffect(() => {
        socket.on('like', (data) => {
            dispatch(fetchNotifications());
            setIsNewNotification(true);
            toast.success("Someone likes your post!", {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        });

        socket.on('unlike', () => {
            dispatch(fetchNotifications());
            setIsNewNotification(false);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    useEffect(() => {
        dispatch(fetchNotifications());
    }, [dispatch]);

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center me-3">
                <Dropdown id='noti'>
                    <div className="d-flex justify-content-center align-items-center" onClick={() => setIsNewNotification(false)}>
                    <Dropdown.Toggle variant={null} className='position-realtive'  >
                        {/* Icona della campanella */}
                        <PiBellSimpleBold style={{ fontSize: '25px', cursor: 'pointer' }}  />
                        {isNewNotification && <p className='alertnoti'>
                            <span className="badge bg-danger rounded-pill">!</span>
                        </p>}
                    </Dropdown.Toggle>
                    </div>
                    {/* Dropdown.Menu con le notifiche */}
                    <Dropdown.Menu className="custom-dropdown-menu p-3">
                        {notification && notification.map((noti) => (
                            <>
                                <Dropdown.Item key={noti._id} as={Link} to={`/profile/${noti.sender._id}`}>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex justify-content-center align-items-center">
                                            <img className="rounded-circle" width={30} height={30} src={noti.sender.avatar} alt="" />
                                            <div className="ms-3 d-flex align-items-center">
                                                <p className="mb-0 me-3">{noti.message}</p>
                                                <img width={50} height={50} src={noti.postId.cover} alt="" />
                                            </div>
                                        </div>

                                        <p className="mb-0">{noti.createdAt}</p>
                                    </div>
                                </Dropdown.Item>
                                <Dropdown.Divider />
                            </>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                
            </div>
        </div>
    );
}
