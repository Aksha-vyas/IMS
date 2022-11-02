import React from 'react';
import Contents from './Contents.js';
import { NavLink } from 'react-router-dom';

function NavBar() {
  return /*#__PURE__*/React.createElement("nav", null, /*#__PURE__*/React.createElement(NavLink, {
    exact: true,
    to: "/"
  }, "Home"), ' | ', /*#__PURE__*/React.createElement(NavLink, {
    to: "/"
  }, "Scan Barcode"), ' | ', /*#__PURE__*/React.createElement(NavLink, {
    to: "/"
  }, "Add Product"), ' | ', /*#__PURE__*/React.createElement(NavLink, {
    to: "/"
  }, "Login"), ' | ', /*#__PURE__*/React.createElement(NavLink, {
    to: "/"
  }, "Logout"));
}

export default function Page() {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NavBar, null), /*#__PURE__*/React.createElement(Contents, null));
}