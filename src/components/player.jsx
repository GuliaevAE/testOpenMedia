import React, { useState, useRef, useEffect } from 'react';
import Slider from '@mui/material/Slider';

import union from '../images/union.svg'
import playImg from'../images/play.svg'
import pauseImg from '../images/Pause.svg'


const Player = ({ changeSwitcher, playerSrc, openError }) => {
    const audio = useRef(null)
    const video = useRef(null)
    const progressBar = useRef(null)
    const volumeBar = useRef(null)
    const [minutes, setMinites] = useState('00')
    const [seconds, setSeconds] = useState('00')
    const [iconSwitcher, setIcon] = useState(false)

    const [speedMenu, setMenu] = useState(false)
    const [audioSpeed, setSpeed] = useState(1)

    useEffect(() => {
        audio.current.playbackRate = audioSpeed
    }, [audioSpeed])



    useEffect(() => {
        window && window.addEventListener('keydown', (e) => {
            if (audio.current.currentTime)
                switch (e.key) {
                    case 'ArrowRight':
                        return audio.current.currentTime += audio.current.duration / 100
                    case 'ArrowLeft':
                        return audio.current.currentTime -= audio.current.duration / 100

                }
        })

    }, [])





    function updatePlayerInfo(e) {
        progressBar.current.style.setProperty("--val1", audio.current.buffered.end(audio.current.buffered.length - 1) / audio.current.duration * 100)
        progressBar.current.value = `${e.target.currentTime / e.target.duration * 100}`
        progressBar.current.style.setProperty("--val", progressBar.current.value)

        const minutes = () => {
            let min = 0
            String(Math.floor(e.target.currentTime / 60)).length === 2 ?
                min = `${Math.floor(e.target.currentTime / 60)}`
                : min = `0${Math.floor(e.target.currentTime / 60)}`
            return min
        }

        const seconds = () => {
            let sec = 0
            if (Math.floor(e.target.currentTime) >= 60) {
                String(Math.floor(e.target.currentTime) - 60 * Math.floor(e.target.currentTime / 60)).length === 2 ?
                    sec = `${Math.floor(e.target.currentTime) - 60 * Math.floor(e.target.currentTime / 60)}`
                    : sec = `0${Math.floor(e.target.currentTime) - 60 * Math.floor(e.target.currentTime / 60)}`



            } else {
                String(Math.floor(e.target.currentTime)).length === 2 ?
                    sec = `${Math.floor(e.target.currentTime)}`
                    : sec = `0${Math.floor(e.target.currentTime)}`

            }

            return sec
        }

        setMinites(minutes())
        setSeconds(seconds())
    }

    function changeAudioCurrenttime(e) {
        audio.current.currentTime = Number(e.target.value / 100 * audio.current.duration)
        let min = e.target.getAttribute("min");
        e.target.style.setProperty("--val", (e.target.value - min));
    }

    function changeVolume(e) {
        audio.current.volume = e.target.value
        let min = e.target.getAttribute("min");
        e.target.style.setProperty("--val", (e.target.value - min) * 100);
    }

    useEffect(() => {
        progressBar.current.style.setProperty("--val", 0)
        volumeBar.current.style.setProperty("--val", 100)

        progressBar.current.style.setProperty("--val1", 50)
        volumeBar.current.style.setProperty("--val1", 0)
    }, [])


    function onMusicStop() {
        audio.current.currentTime = 0
        progressBar.current.value = '0'
        setIcon(false)
    }



    return (
        <div className="container_header_player_turntable">

            <span onClick={() => changeSwitcher(false)} id="backBtn">← Back</span>
            {playerSrc && <video
                onTimeUpdate={updatePlayerInfo}
                onEnded={onMusicStop}
                onPlay={() => setIcon(true)}
                onPause={() => setIcon(false)}
                onError={(e) => openError(e.target.error.message)}
                onLoadedData={(e) => e.target.videoHeight ? audio.current.style.display = 'block' : audio.current.style.display = 'none'}
                ref={audio}
                src={playerSrc}>

            </video>}
            <div className="container_header_player_turntable_block">

                <div className='container_header_player_turntable_block_buttons'>
                    {!iconSwitcher && <img className="arrow" src={playImg} alt="playImg" onClick={() => audio.current.play()} />}
                    {iconSwitcher && <img className="pause" src={pauseImg} alt="pauseImg" onClick={() => audio.current.pause()} />}

                    <div className='container_header_player_turntable_block_buttons_union'>
                        <img onClick={() => setMenu(!speedMenu)} src={union} alt="union" />
                        {speedMenu && <div className='container_header_player_turntable_block_buttons_union_speed'>
                            {[0.5, 1, 1.5].map(x => <span key={x} onClick={() => setSpeed(x)} className={audioSpeed === x ? 'active' : ''}>{x}</span>)}

                        </div>}
                    </div>
                </div>



                <input onChange={changeAudioCurrenttime} ref={progressBar} id="progresbar" className='range' min="0" max="100" step="0.5" defaultValue='0' type="range" />
                <div className="container_header_player_turntable_block_timeAndVolume">
                    <span className="time">{minutes}:{seconds}</span>
                    <input ref={volumeBar} onChange={changeVolume} className='range' id="volume" type="range" min="0" max="1" step="0.1" defaultValue='1' />
                </div>
            </div>


        </div>
    );
};

export default Player;