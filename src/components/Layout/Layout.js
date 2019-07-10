import React, { useState } from 'react';

import Aux from '../../hoc/Auxilary';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.css';

const Layout = (props) => {
    const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

    const sideDrawerCloseHandler = () => {
        setSideDrawerIsVisible(false);
    };

    const sideDrawerToggleClickHandler = () => {
        setSideDrawerIsVisible(!sideDrawerIsVisible);
    };

    return (
        <Aux>
            <Toolbar drawerToggleClicked={sideDrawerToggleClickHandler}/>
            <SideDrawer open={sideDrawerIsVisible}
                        closed={sideDrawerCloseHandler}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    );
};

export default Layout;