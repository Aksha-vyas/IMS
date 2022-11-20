import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import UserLogin from './UserLogin.js';
import BarcodeDirectory from './BarcodeDirectory.js';
import ProductList from './ProductList.js';
import ProductEdit from './ProductEdit.js';
import UserList from './UserList.js';
import UserAdd from './UserAdd';
import UserEdit from './UserEdit';
ProductList
const NotFound = () => <h1>Page Not Found</h1>;

export default function Contents() {
    return (
        <Switch>
            <Redirect exact from="/" to="/userLogin" />
            <Route path="/userLogin" component={UserLogin} />
            <Route path="/users" component={UserList} />
            <Route path="/createUser" component={UserAdd} />
            <Route path="/userEdit/:id" component={UserEdit} />
            <Route path="/barcode" component={BarcodeDirectory} />
            <Route path="/products" component={ProductList} />
            <Route path="/productEdit/:id" component={ProductEdit} />
            <Route component={NotFound} />
        </Switch>
    )
}

