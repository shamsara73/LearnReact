import ReactDOM from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import Product from '../../components/Product';


// const _product = <Product />
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode>
//   // </React.StrictMode>
//   // <Car />
//   <>
//     <Product />
//   </>
// );
function ProductList(){
  return <Product />
}


export default ProductList;
