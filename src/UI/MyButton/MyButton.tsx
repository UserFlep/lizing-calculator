import React, {ButtonHTMLAttributes, FC} from 'react';
import classes from "./button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{}

const MyButton:FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button className={classes.styled__button} {...props}>
            {children}
        </button>
    );
};

export default MyButton;