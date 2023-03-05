import React, { useState, useEffect, useRef } from 'react';

const Input = ({ changeSwitcher, openError, closeError }) => {
    const [newSrc, setNewSrc] = useState('')
    const [historyList, setHistory] = useState([])
    const history = useRef(null)

    useEffect(() => {
        if (localStorage.getItem("historyList"))
        setHistory(JSON.parse(localStorage.getItem("historyList")))
    }, [])


    function validation(e) {
        if (e.target.value.indexOf('https://') === -1) {
            openError('Link must start with https://')
            setNewSrc('')
        } else {
            closeError()
            setNewSrc(e.target.value)
        }
    }
    
    return (
        <div className="container_header_player_inputLink">
            <span>Insert the link</span>
            <div className="container_header_player_inputLink_input">
                <div className="container_header_player_inputLink_input_inputcontainer">
                    <input  onFocus={()=> history.current.classList.add('active')} onInput={validation} type="text" placeholder="https://" />
                    <div ref={history} className="container_header_player_inputLink_history ">
                        <div className="container_header_player_inputLink_history_list">
                            {historyList && historyList.map(x => <div key={x} onClick={() => changeSwitcher(true, x)} >{x}</div>)}
                        </div>
                    </div>
                </div>
                <div onClick={() => { if (newSrc) changeSwitcher(true, newSrc, historyList) }} className="container_header_player_inputLink_input_button">
                    <span>→</span>
                </div>
            </div>
        </div>
    );
};

export default Input;