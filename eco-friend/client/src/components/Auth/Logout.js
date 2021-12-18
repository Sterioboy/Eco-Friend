import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutThunk } from '../../store/user/actions'

function Logout() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutThunk());
        navigate('/')
    }, [navigate])

    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;