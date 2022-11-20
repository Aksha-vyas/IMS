import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class UserTable extends React.Component {
  render() {
    const userRows = this.props.users.map(user => <UserRow key={user._id} user={user} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {userRows}
            </tbody>
        </table>
    )
}
}

class UserRow extends React.Component {
  render() {
      const user = this.props.user;const linkStyles = {
        textDecoration: 'none',
        width: '100%',
        backgroundColor: '#000000',
        color: 'white',
        padding: '3px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
      return (
          <tr>
          <td>{user.userId}</td>
          <td>{user.userType.role}</td>
          <td><Link to={`/userEdit/${user._id}`} style={linkStyles}>Edit</Link></td>
          </tr>
      )
  }
}

class UserList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    }
  }

  componentDidMount() {
    this.loadData();
  }
  loadData() {
      const query = `query {
        userList {
              _id
              userId
              password
              userType{role}
          }
      }`;
      async function UserData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        return response.json();
    }

      const result = UserData('/graphql', query)
          .then(result => {
              console.log(result.data.userList);
              this.setState({ users: result.data.userList });
              return result.data.userList;
          })
      
  }

  render() {
    const linkStyles = {
    textDecoration: 'none',
    width: '100%',
    backgroundColor: '#000000',
    color: 'white',
    padding: '3px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
}
    return (
      <React.Fragment>
        
      <Link to={`/createUser`} style={linkStyles}>Create New User Account</Link>
          <UserTable users={this.state.users} />
          <hr />          
      </React.Fragment>
    );
  }
}
export default withRouter(UserList);