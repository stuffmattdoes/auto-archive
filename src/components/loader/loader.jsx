import classnames from 'classnames';
import './loader.scss';

export default ({ className, size }) => (
    <span className={classnames([
        'loader',
        { 'loader--small': size === 'small' || !size },
        { 'loader--large': size === 'large' },
        className
    ])}></span>
);

