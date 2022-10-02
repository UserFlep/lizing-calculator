import React, {FC, InputHTMLAttributes, ReactNode} from 'react';
import classes from "./super-input.module.css";
import MyRange from "../../UI/MyRange/MyRange";
import MyLabel from "../../UI/MyLabel/MyLabel";


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    title?: string | undefined
    tab?: ReactNode | undefined,
}
const MySuperInput: FC<InputProps> = ({name,type , title, value, tab, ...props}) => {
    return (
        <div className={classes.text__field} style={props.disabled ? {opacity: "50%", ...props.style} : {...props.style}}>
            <MyLabel htmlFor={name}>{title || "Заголовок"}</MyLabel>
            <div className={classes.text__field__super__input}>
                <input
                    id={name}
                    type="text"
                    className={classes.mini__input}
                    value={value}
                    {...props}
                />
                {tab && <div className={classes.mark}>{tab}</div>}
                <div className={classes.range}>
                    <MyRange value={value?.toString().replace(/\D/g, '')} {...props}/>
                </div>
            </div>
        </div>
    );
};

export default MySuperInput;