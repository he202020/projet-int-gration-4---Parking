import React from 'react'
import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'inte',
    Board: () => <div>
        <li>tata</li>
        <nav><a href="/home">Home</a> | <a href="/projects">Projects</a> | <a href="/about">About</a> | <a href="/contact">Contact Us</a></nav>
    </div>,
    environmentProps: {
        canvasWidth: 367,
        canvasHeight: 5
    }
});
