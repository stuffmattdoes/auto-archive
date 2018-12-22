import classnames from 'classnames';
import React from 'react';
import './button.scss';

const Button = ({ children, disabled }) => (
    <button className={cclassnames([
        'button',
        { 'button--disabled': disabled }
    ])} disabled={disabled}>{children}</button>
);

Button.Link = ({ children, disabled, href }) => (
    <a className={classnames([
        'button',
        { 'button--disabled': disabled }
    ])} href={disabled ? null : href}>{children}</a>
);

export default Button;