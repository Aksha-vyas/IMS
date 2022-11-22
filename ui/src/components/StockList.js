import { withRouter } from 'react-router-dom';
import PDFFile from './components/PDFFile';
import { PDFDownloadLink } from "@react-pdf/renderer";


class StockTable extends React.Component {
  render() {
    const userRows = this.props.products.map(product => <StockRow key={product.id} product={product} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Date of Expiry</th>
                </tr>
            </thead>
            <tbody>
                {userRows}
            </tbody>
        </table>
    )
}
}

class StockRow extends React.Component {
  render() {
      const product = this.props.product;
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
          <tr>
          <td>{product.name}</td>
          <td>{product.quantity}</td>
          <td>{product.expiry_date}</td>
          {/* <td><Link to={`/userEdit/${user._id}`} style={linkStyles}>Edit</Link></td> */}
          </tr>
      )
  }
}

class StockList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
    }
  }

  componentDidMount() {
    this.loadData();
  }
  loadData() {
      const query = `query {
        productList {
              id
              name
              quantity
              expiry_date
          }
      }`;
      async function ProductData(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        return response.json();
    }

      document.getElementById("scanner-main").style.display="none";
      const result = ProductData('/graphql', query)
          .then(result => {
              console.log(result.data.productList);
              this.setState({ products: result.data.productList });
              return result.data.productList;
          })
      
  }

  render() {
    return (
      <React.Fragment>
          <StockTable products={this.state.products} />
          <hr />          
      </React.Fragment>
    );
  }
}
const App  = () => {
  return (
    <div className="App">
      <PDFDownloadLink document={<PDFFile />} filename="FORM">
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink>
      {/* <PDFFile /> */}
    </div>
  );
};


export default withRouter(StockList);