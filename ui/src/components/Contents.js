import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserLogin from './UserLogin.js';
import BarcodeDirectory from './BarcodeDirectory.js';

const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/userLogin" />
            <Route path="/userLogin" component={UserLogin} />
            <Route path="/barcode" component={BarcodeDirectory} />
            <Route component={NotFound} />
        </Switch>
    )
}

