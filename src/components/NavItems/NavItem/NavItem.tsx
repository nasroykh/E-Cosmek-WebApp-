import React from 'react'
import classes from './NavItem.module.css';

const navItem = (props: any) => {
    return (
        <li className={classes.NavItem}>
            {props.children}
            <div className={classes.UnderLine}></div>
        </li>
    )
}

export default navItem;
