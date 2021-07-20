import React from 'react';
import ReactLoading from 'react-loading';

const LoadingCpn = ({ type, color }) => (
    <div style={{ width: '100%',height:'100%' }}> 
        <div style={{ width: '70px' }}>
            <ReactLoading type={type} color={color} height={'100%'} width={'100%'} />
        </div>
    </div>
);

export default LoadingCpn;