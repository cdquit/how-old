import * as React from 'react';
import './Header.css';
import man from './images/man.png';
import woman from './images/woman.png';

export default function Header() {
    return (
        <div className="header">
            <img src={man} alt="man" />
            <h1 className='headerText'>
                Age Detector
                {/* <span role="img" aria-label="emoji">🤔</span> */}
            </h1>
            <img src={woman} alt="woman" />
        </div>
    )
}