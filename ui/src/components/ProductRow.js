import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class ProductRow extends React.Component {
  render() {
      const product = this.props.product;const linkStyles = {
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
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>${product.price}</td>
          <td>{product.barcode}</td>
          <td><Link to={`/productEdit/${product.id}`} style={linkStyles}>Edit</Link>
              <Link to={`/productView/${product.id}`} style={linkStyles}>View</Link></td>
          </tr>
      )
  }
}

export default withRouter(ProductRow);
