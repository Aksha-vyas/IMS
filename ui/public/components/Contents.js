import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import UserLogin from './UserLogin.js';
import BarcodeDirectory from './BarcodeDirectory.js';

const NotFound = () => /*#__PURE__*/React.createElement("h1", null, "Page Not Found");

export default function Contents() {
  return /*#__PURE__*/React.createElement(Switch, null, /*#__PURE__*/React.createElement(Redirect, {
    exact: true,
    from: "/",
    to: "/userLogin"
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/userLogin",
    component: UserLogin
  }), /*#__PURE__*/React.createElement(Route, {
    path: "/barcode",
    component: BarcodeDirectory
  }), /*#__PURE__*/React.createElement(Route, {
    component: NotFound
  }));
}