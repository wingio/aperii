import React from 'react';

function Dropdown(props) {
    return (
        <div className="dropdown">
            {props.children}
        </div>
    );
}

export default Dropdown;