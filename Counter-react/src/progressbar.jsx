import React from 'react';


const ProgressBar = ({ value, max }) => {
    const progress = (value / max) * 100;
    



    return (

        <div style={{
            border: '1px solid #000',
            borderRadius: '5px', width: '100%', height: '30px',
             display: 'flex',
             position: 'absolute', top: '80%'
        }}>
            <div style={{
                width: `${progress}%`, height: '100%',
                backgroundColor: '#4caf50', borderRadius: '5px'
            }}>
            </div>
        </div>);
};




export default ProgressBar;