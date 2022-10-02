import React, {FC, HTMLAttributes} from 'react';
import classes from "./result.module.css"
import MyLabel from "../../UI/MyLabel/MyLabel";

interface IResultProps extends HTMLAttributes<HTMLSpanElement>{}

const MyResult:FC<IResultProps> = ({children, ...props}) => {
    return (
        <div className={classes.result__container} {...props}>
            <MyLabel>{props.title || "Заголовок"}</MyLabel>
            <span
                className={classes.styled__result}
                {...props}
            >{children}
                <span className={classes.tab}> &#8381;</span>
            </span>
        </div>
    );
};

export default MyResult;