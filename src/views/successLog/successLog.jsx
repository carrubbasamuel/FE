import jwt_decode from "jwt-decode";
import query from "query-string";
import React, { useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserLogged } from "../../redux/reducers/LoginSlice";


export default function SuccessLog() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = query.parse(window.location.search);
    const decoded = jwt_decode(token);
    const userLogged = {
        statusCode: 200,
        token: token,
        user: {
            name: decoded.name,
            surname: decoded.surname,
            email: decoded.email,
            avatar: decoded.avatar,
        }
    }
    dispatch(setUserLogged(userLogged));

    useEffect(() => {
        navigate('/');
    }, [navigate]);
    

    
    return (
        <div>
          <Spinner animation="border" variant="success" />
        </div>
    );
}