import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';

class UserLogin extends React.Component {
  constructor() {
    super();
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    document.getElementById("scanner-main").style.display = "none";
  }

  async loginVerify(user) {
    console.log("inside loginVerify" + JSON.stringify(user));
    const query = `
            query userLogin($user: UserInputs!) {
                userLogin(user: $user) {
                    userId
                    password
                    type
                } 
            }`;
    const data = await graphQLFetch(query, {
      user
    });
    return data;
  }

  async submit(e) {
    e.preventDefault();
    const form = document.forms.login;
    const user = {
      userId: form.userId.value,
      password: form.password.value
    };
    const response = await this.loginVerify(user);
    console.log(JSON.stringify(response) + "    " + response.userLogin + "   response + _++++" + response);
    const {
      history
    } = this.props;

    if (response.userLogin != null) {
      history.push({
        pathname: '/barcode'
      });
    } else {
      history.push({
        pathname: '/'
      });
    }
  }

  render() {
    const fieldstyles = {
      width: '50%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
      fontWeight: 'bolder'
    };
    const buttonStyles = {
      width: '50%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '12px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    };
    return /*#__PURE__*/React.createElement("form", {
      name: "login",
      onSubmit: this.submit
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "userId"
    }, "User id"), /*#__PURE__*/React.createElement("input", {
      type: "text",
      name: "userId",
      placeholder: "User Id",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
      htmlFor: "password"
    }, "Password"), /*#__PURE__*/React.createElement("input", {
      type: "password",
      name: "password",
      placeholder: "Password",
      style: fieldstyles,
      required: true
    })), /*#__PURE__*/React.createElement("button", {
      type: "submit",
      style: buttonStyles
    }, "Login"));
  }

}

export default withRouter(UserLogin);