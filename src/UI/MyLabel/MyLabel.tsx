import React, {FC, LabelHTMLAttributes} from 'react';
import classes from "./label.module.css"

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement>{}

const MyLabel:FC<LabelProps> = ({children, ...props}) => {
    return (
        <label className={classes.styled__label} {...props}>
            {children}
        </label>
    );
};

export default MyLabel;