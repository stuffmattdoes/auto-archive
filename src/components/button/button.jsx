import classnames from 'classnames';
import React from 'react';
import './button.scss';

const Button = ({ children, className, disabled }) => (
    <button className={cclassnames([
        'button',
        { 'button--disabled': disabled },
        className
    ])} disabled={disabled}>{children}</button>
);

Button.Link = ({ children, className, disabled, href }) => (
    <a className={classnames([
        'button',
        { 'button--disabled': disabled },
        className
    ])} href={disabled ? null : href}>{children}</a>
);

export default Button;