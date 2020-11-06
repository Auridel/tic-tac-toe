import React, {useState, useEffect} from "react";
import InputField from "../inputField/inputField";
import socket from "../../socket";


import "./login.scss";

const Login = () => {
    const [data, setData] = useState({room: "", userName: ""});
    const [error, setError] = useState({room: false, userName: false});
    const [alert, setAlert] = useState("");
    const [showRooms, setShowRooms] = useState(false);
    const [rooms, setRooms] = useState([]);


    useEffect(() => {
        socket.on("USER_EXISTS", onExists);
        socket.on("ROOM_FULL", onFull);
        socket.on("ROOMS", onRooms);
    },[])
    const onExists = () => {
        setAlert("Name is not available");
    }
    const onFull = () => {
        setAlert("Room already full");
    }
    const onRooms = (rooms) => {
        setRooms(rooms);
    }



    const onRoomChange = (e) => {
        if(!e.target.value.trim()) setError({...error, room: true});
        else setError({...error, room: false});
        setData((prev) => {
            return {
                ...prev, room: e.target.value
            }
        })
    }
    const onUserNameChange = (e) => {
        if(!e.target.value.trim()) setError({...error, userName: true});
        else setError({...error, userName: false});
        setData((prev) => {
            return {
                ...prev, userName: e.target.value
            }
        })
    }
    const onError = (error) => {
        if(error) return "Enter correct value";
        else return "";
    }

    const sendData = (values) => {
        if(!values.room.trim() || !values.userName.trim()){
            const keys = Object.keys(values);
            keys.forEach(key => {
                if(key !=="privacy" && !values[key].trim()) setError((prev) => {
                    return {...prev, [key]: true}
                })
            })
        }else {
            socket.emit("ROOM_JOIN", data);
        }
    }




    return (
        <>
            <section className="login">
                <div className="input__wrapper">
                    <label htmlFor="room" className="login__label">Room name</label>
                    <InputField value={data.room} inputId="room" error={error.room} onChange={onRoomChange} showError={() => onError(error.room)}/>
                </div>
                <div className="input__wrapper">
                    <label htmlFor="user" className="login__label">Username</label>
                    <InputField value={data.userName} inputId="user" error={error.userName} onChange={onUserNameChange} showError={() => onError(error.userName)}/>
                </div>
                <button
                    onClick={() => sendData(data)}
                    className="login__submit">Enter Chat</button>
                {alert? <span className="login__alert">{alert}</span> : ""}
            </section>

            {rooms.length &&
                <>
                    <button className="available-btn" onClick={() => setShowRooms(!showRooms)}>Available rooms</button>
                    {showRooms && <ul className="available-list">
                        {rooms.map(el => <li key={el}
                                             onClick={() => setData((prev) => {
                                                 return {...prev, room: el}
                                             })}
                                             className="available-list__item">{el}</li>)}
                    </ul>}
                </>
            }
        </>
    )
};

export default Login;