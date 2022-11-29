import { withRouter } from 'react-router-dom';
import graphQLFetch from '../graphQLFetch.js';

class UserAdd extends React.Component {
  constructor() {
      super();
      this.submit = this.submit.bind(this);
  }
  async addUser(user) {
      const query = `
          mutation addUser($user: UserInputs!) {
              addUser(user: $user) {
                  userId
                  password
                  userType{role}
              } 
          }`;
      const data = await graphQLFetch(query, { user });
      return data;
  }
  submit(e) {
      e.preventDefault();
      const form = document.forms.userAdd;
      const user = {
          userId: form.userId.value,
          password: form.password.value,
          userType: form.role.value
      }
      const response = this.addUser(user);
      console.log("response + _++++"+ JSON.stringify(response))
      const { history } = this.props;
      history.push({
        pathname: '/users',
      });
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
      }
      return (
          <form name="userAdd" onSubmit={this.submit}>
              <div>
              <label class="labelstyles" htmlFor="userId">User Id</label>
              <input class="fieldstyles" type="text" name="userId" placeholder="User Id" style={fieldstyles} required />
              </div>
              <div>
              <label class="labelstyles" htmlFor="password">Password</label>
              <input class="fieldstyles" type="text" name="password" placeholder="Password" style={fieldstyles} required />
              </div>
              <div>
              <label class="labelstyles" htmlFor="role">Role</label>
              <select class="fieldstyles" name="role" defaultValue="" style={fieldstyles} required>
                  <option value="">Select Role</option>
                  <option value="63859c02945f49694c8ff14a">Admin</option>
                  <option value="63859c02945f49694c8ff14c">Supervisor</option>
                  <option value="63859c02945f49694c8ff14b">Associate</option>
              </select>
              </div>
              
              <button type="submit" style={buttonStyles}>Create User</button>
          </form>
      )
  }
}
export default withRouter(UserAdd);