import 'bootstrap/dist/css/bootstrap.min.css';
import Product from '../../components/Product';
import Container from 'react-bootstrap/Container';


function ProductMenu(){
  return (
	<>
		<Container fluid>
			<h1>Product List</h1>
			
			{/* <AddProduct /> */}
			<Product />
		</Container>
		
	</>
  )
}


export default ProductMenu;
