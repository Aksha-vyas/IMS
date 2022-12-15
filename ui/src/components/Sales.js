import { withRouter } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import graphQLFetch from '../graphQLFetch.js';
import { ReactSession } from 'react-client-session';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const InvoiceTable =({items}) => {
    const invoiceRows = items.map(item => <InvoiceRow item={item} />);
    return (
      <div id="invoiceTable" class="overflow">
        <table className="bordered-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Barcode</th>
            </tr>
          </thead>
          <tbody>
            {invoiceRows}
          </tbody>
        </table>
      </div>
    )
}

const InvoiceRow =({item}) => {
    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.price}</td>
        <td>{item.barcode}</td>
      </tr>
    )
}
const Payment = ({ amount }) => {


  return (
    <PayPalScriptProvider options={{ "client-id": "AdU_GYUnhG0hqecmmUfuf9LbjWCpLt9Cbc6OWvSNxgxjRvaEjrc-FqVrNzO_rSFp8puQ-WLgbeQvk6pb" }}>
    <PayPalButtons style={{ layout: "horizontal" }} createOrder={(data, actions) => actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount,
          },
        },
      ],
    })} />
  </PayPalScriptProvider>
  )
}
const Sales = props => {
  const [items,setItems] = useState([]);
  const [total,setTotal] = useState(0);
  useEffect(async ()=> {
    const id = ReactSession.get("invoice_id");
    console.log("invoice id from invoiceList.js " + id);
    const query = `query getInvoice($id: String!){
      getInvoice(id: $id){
        _id
        invoiceId
        items{
          _id
          name
          price
          barcode
        }
      }
  }`;
    const data = await graphQLFetch(query, { id: id });
    console.log(data?.getInvoice);
    if (data?.getInvoice) {
      document.getElementById("text").innerText = "Invoice No: " + data.getInvoice.invoiceId;
      setItems( data.getInvoice.items );
      var sub = 0;
      data.getInvoice.items.forEach(element => {
        sub += parseInt(element.price);
      });
      setTotal(sub);
      return data.getInvoice;
    } else {
      document.getElementById("text").innerText = "No product added for sales"
      setItems( [] );

    }

  },[])
  
    return (
      <React.Fragment>
        <div>
          <h2 id="text"> </h2>
          {this.state.items.length > 0 &&
            <InvoiceTable items={this.state.items} history={this.props.history} />

          }
          {this.state.items.length > 0 &&
            <h3>Subtotal : {this.state.total}</h3>
          }
<Payment amount={this.state.total} />

        </div>
        <hr />
      </React.Fragment>
    );
}

const componentWithRouter = withRouter(Sales)
export default componentWithRouter;