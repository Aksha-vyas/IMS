import React from 'react';
import ProductRow from './ProductRow';

class ProductTable extends React.Component {
    render() {
        const productRows = this.props.products.map(product => <ProductRow key={product.id} product={product} />);
        return (
            <table className="bordered-table">
                <col span="1" style={{width: '10%'}} />
                <col span="1" style={{width: '25%'}} />
                <col span="1" style={{width: '10%'}} />
                <col span="1" style={{width: '25%'}} />
                <col span="1" style={{width: '25%'}} />
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Barcode</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {productRows}
                </tbody>
            </table>
        )
    }
}

export default ProductTable;