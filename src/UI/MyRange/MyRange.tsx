import React, {ChangeEvent, FC, InputHTMLAttributes, MutableRefObject, useEffect, useRef} from 'react';
import classes from "./range.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const MyRange: FC<InputProps> = ({ onChange, type,  ...props} ) => {
    const input = useRef() as MutableRefObject<HTMLInputElement>;

    useEffect(()=>{
        if(input){
            input.current.style.setProperty("--min", props.min ? String(props.min) : "0");
            input.current.style.setProperty("--max", props.max ? String(props.max) : "100");
            input.current.style.setProperty("--value", props.value ? String(props.value) : "0");
        }
    },[props.min, props.max, props.value])

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        event.target.style.setProperty("--value", event.target.value);
        onChange && onChange(event);
    }

    return (
        <input
            ref={input}
            type="range"
            className={[classes.styled__slider, classes.slider__progress].join(' ')}
            onChange={changeHandler}
            {...props}
        />
    );
};

export default MyRange;