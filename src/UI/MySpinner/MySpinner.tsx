import React from 'react';
import classes from "./spinner.module.css"

const MySpinner = () => {
    return (
        <div className={classes.spinner}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default MySpinner;