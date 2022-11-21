import ProductTable from './ProductTable';
import graphQLFetch from '../graphQLFetch.js';
import { withRouter } from 'react-router-dom';

class BarcodeAdd extends React.Component {

  constructor() {
    super();
    this.submit = this.submit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {barcodeBtnText:"Barcode"};
  }
  // componentDidUpdate(prevProps) {
  //   const { prevProductExists } = prevProps;
  //   const { productExists } = this.props;
  //   if (prevProductExists !== productExists) {
  //     document.getElementById("barcodeBtn").style.display = "block";
  //   }
    
  // }
  onChange(event) {
    const { value } = event.target;
    document.getElementById("barcodeBtn").style.display = "block";
    const productExists = this.props.products.map(p => p.barcode).includes(value);
    if (productExists) {
      this.setState({productExists:true})
      this.setState({ barcodeBtnText: "View Product" })
    } else {
      this.setState({ barcodeBtnText: "Add Product" })
    }
  }

  onInput(e) {
    console.log('Here=====', e);
  }

  submit(e) {
    e.preventDefault();
    const form = document.forms.barcodeAdd;
    if(this.props.productExists){
      history.push({
        pathname: '/ViewProduct/${form.barcode.value}',
      });
    }else{
      history.push({
        pathname: '/AddProduct/${form.barcode.value}',
      });
    }
    form.barcode.value = ''
  }

  render() {
    const fieldstyles = {
      width: '100%',
      padding: '12px 20px',
      margin: '8px 0',
      display: 'inline-block',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box'
    };
    const buttonStyles = {
      width: '100%',
      backgroundColor: '#000000',
      color: 'white',
      padding: '14px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer'
    }
    const { barcodeBtnText } = this.state
    return (
      <div>
        {/* <div id="scanner-container"></div>
          <button type="submit" style={buttonStyles} onClick={this.scan}>Scan Barcode</button> */}
        <form name="barcodeAdd" onSubmit={this.submit}>
          <label htmlFor="barcode">Barcode</label>
          <input type="text" name="barcode" placeholder="Scanned Barcode" style={fieldstyles} onChange={this.onChange} onInput={this.onInput.bind(this)} required />
          <button type="submit" id="barcodeBtn" style={buttonStyles}>{barcodeBtnText}</button>
        </form>
      </div>
    )
  }
}
class ProductList extends React.Component {
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
              price
              barcode
          }
      }`;
    async function FetchData(url = '', data = {}) {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });
      return response.json();
    }

    document.getElementById("barcodeBtn").style.display = "none";
    document.getElementById("scanner-main").style.display = "block";
    const result = FetchData('/graphql', query)
      .then(result => {
        console.log(result.data.productList);
        this.setState({ products: result.data.productList });
        this.setState({ products: result.data.productList });
        const id = Math.max.apply(Math, result.data.productList.map(product => parseInt(product.id)));
        if (!isFinite(id)) { id = 0 };
        console.log("____________" + id)
        this.setState({ maxId: id });
        return result.data.productList;
      })

  }

  render() {
    return (
      <React.Fragment>
        <ProductTable products={this.state.products} productExists={false} />
        <hr />
        <BarcodeAdd products={this.state.products} />
      </React.Fragment>
    );
  }
}
export default withRouter(ProductList);