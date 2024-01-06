import React from 'react';
import Navbar from './Navbar'

const LayoutHOC = (Components) => ({ props }) => {
    return (
        <>
            <Navbar />
            <Components {...props} />
        </>
    )
}

export default LayoutHOC