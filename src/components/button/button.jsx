import React from 'react';
import './button.scss';

const Button = ({ children }) => (
    <button className='button'>{children}</button>
);

Button.Link = ({ children, href }) => (
    <a className='button' href={href}>{children}</a>
);

export default Button;