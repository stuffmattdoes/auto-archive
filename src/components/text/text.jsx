import classnames from 'classnames';
import React from 'react';
import './text.scss';

const Text = ({ children }) => (
    <p className='text'>{children}</p>  
);

Text.Heading1 = ({ children, className }) => (
    <h1 className={classnames([
        'text', 
        'text--heading-1',
        className 
    ])}>{children}</h1>
);

Text.Heading2 = ({ children, className }) => (
    <h2 className={classnames([
        'text', 
        'text--heading-2',
        className 
    ])}>{children}</h2>
);

Text.Heading3 = ({ children, className }) => (
    <h3 className={classnames([
        'text', 
        'text--heading-3',
        className 
    ])}>{children}</h3>
);

Text.Heading4 = ({ children, className }) => (
    <h4 className={classnames([
        'text', 
        'text--heading-4',
        className 
    ])}>{children}</h4>
);

Text.Body1 = ({ children, className }) => (
    <p className={classnames([
        'text', 
        'text--body-1',
        className 
    ])}>{children}</p>
);

Text.Body2 = ({ children, className }) => (
    <p className={classnames([
        'text', 
        'text--body-2',
        className 
    ])}>{children}</p>
);

export default Text;