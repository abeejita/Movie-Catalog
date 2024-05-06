import React from 'react';
import './styles.css';
import { IButton } from './types';
import classNames from "classnames";

const heartPath = "M 462.3 62.6 C 407.5 15.9 326 24.3 275.7 76.2 L 256 96.5 l -19.7 -20.3 C 186.1 24.3 104.5 15.9 49.7 62.6 c -62.8 53.6 -66.1 149.8 -9.9 207.9 l 193.5 199.8 c 12.5 12.9 32.8 12.9 45.3 0 l 193.5 -199.8 c 56.3 -58.1 53 -154.3 -9.8 -207.9 Z";
const brokenHearthPath = "M473.7 73.8l-2.4-2.5c-46-47-118-51.7-169.6-14.8L336 159.9l-96 64 48 128-144-144 96-64-28.6-86.5C159.7 19.6 87 24 40.7 71.4l-2.4 2.4C-10.4 123.6-12.5 202.9 31 256l212.1 218.6c7.1 7.3 18.6 7.3 25.7 0L481 255.9c43.5-53 41.4-132.3-7.3-182.1z";
const Button: React.FC<IButton> = ({
                                       onClick,
                                       color,
                                       title,
                                       icon,
                                       svg,
                                   }) => {
    const buttonClass = classNames({
        "blue-color": color === 'blue',
        "gray-color": color === 'gray',
        "red-color-button": color === 'red',
    });

    let iconPath;
    if (svg === 'heart') {
        iconPath = heartPath;
    } else if (svg === 'brokenHeart') {
        iconPath = brokenHearthPath;
    }

    return (
        <button className={buttonClass}>
        <span>
          {icon && ( // Conditional rendering based on the icon prop
              <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon={svg}
                   className="show-svg" role="img"
                   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path fill="currentColor"
                      d={iconPath}></path>
              </svg>
          )}
        <span>
          {title}
        </span>
        </span>
      </button>
  );
};

export default Button;