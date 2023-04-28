// import data from '../data/MOCK_DATA.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Paging from 'react-bootstrap/Pagination';
import { useState,useEffect  } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

// const PagingContextGlobal = createContext()
function ProductTable(){
	const [pagination, setPagination] = useState({ currentPage: 1, skip: 0,take:10,perPage :10 });
	const [data, setAPIData] = useState([]);
	useEffect(() => {
		axios.get('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products')
            .then((response) => {
                setAPIData(response.data);
            })
	}, [])
    // let _paging = { currentPage: 1, skip: 0,take:8 };

    let active = pagination.currentPage;
    let items = [];
    let pageCount = Math.ceil( data.length / 8); 
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Paging.Item key={number} active={number === active} 
            onClick={()=>
                setPagination({ 
                    currentPage: number, 
                    skip: ((number-1) * pagination.perPage),
                    take: (((number-1)*pagination.perPage)+pagination.perPage),
                    perPage: pagination.perPage })
                }
                >
            {number}
            </Paging.Item>,
        );
    }
	
	let tempData = data.slice(pagination.skip,pagination.take);

    return (
        <>
            <Container fluid>
				
				<Table className='mt-3' striped bordered hover>
				<thead>
					<tr>
					<th>#</th>
					<th>Brand</th>
					<th>Product Name</th>
					<th>Weight</th>
					<th>Price</th>
					<th>Image</th>
					<th>Description</th>
					<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{tempData.map((_data) => <ProductRow data={_data} />)}
				</tbody>
				</Table>

                <Row>
                    <Col md={{ span :6,offset:6}}> <Paging className='justify-content-end' size="sm">{items}</Paging> </Col>
                </Row>
                
            </Container>
            {/* <Pagination data={pagination} /> */}


        </>
    )
}

function ProductRowButtonStatus(props){
	if(props.data === false){
		return (
			
			<Button size='sm' variant="success">
				 <Icon.CheckCircle size={14} className='mb-1' />  Activate
			</Button>
		)
	}else{
		return (
			<Button size='sm' variant="danger" >
				<Icon.Trash size={14} className='mb-1' /> Deactivate
			</Button>
		)
		
	}
}

function ProductRow(props){
	
	return (
		<>
		<tr>
			<td>{props.data.id}</td>
			<td>{props.data.brand}</td>
			<td>{props.data.product_name}</td>
			<td>{props.data.weight}</td>
			<td>{props.data.price}</td>
			<td>{props.data.image_src}</td>
			<td>{props.data.product_desc}</td>
			<td>
			<Button size='sm' variant="primary" >
				<Icon.Pencil size={12} className='mb-1' /> Edit
			</Button>{' '}
			<ProductRowButtonStatus data={props.data.status} />
			
			</td>
		</tr>
		</>
	)
}

function ProductList(){
    // const [skip, setSkip] = useState(0);
    // const [take, setTake] = useState(8);
    // const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ currentPage: 1, skip: 0,take:8,perPage :8 });
	const [data, setAPIData] = useState([]);
	useEffect(() => {
		axios.get('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products')
            .then((response) => {
                setAPIData(response.data);
            })
	}, [])
    // let _paging = { currentPage: 1, skip: 0,take:8 };

    let active = pagination.currentPage;
    let items = [];
    let pageCount = Math.ceil( data.length / 8); 
    for (let number = 1; number <= pageCount; number++) {
        items.push(
            <Paging.Item key={number} active={number === active} 
            onClick={()=>
                setPagination({ 
                    currentPage: number, 
                    skip: ((number-1) * pagination.perPage),
                    take: (((number-1)*pagination.perPage)+pagination.perPage),
                    perPage: pagination.perPage })
                }
                >
            {number}
            </Paging.Item>,
        );
    }

    
    let tempData = data.slice(pagination.skip,pagination.take);

    return (
        <>
            <Container fluid>
				
                <Row>
                    <Col md={4}></Col>
                    <Col md={4}>
                        <Paging size="sm">{items}</Paging>
                    </Col>
                    <Col md={4}></Col>
                </Row>
                

                <Row>
                    {tempData.map((_data) => <Product data={_data} />)}
                </Row>

            </Container>
            {/* <Pagination data={pagination} /> */}


        </>
    )
}

function Product(props){
    return (
        <>
        <Card key={'Card'+props.data.id} className='m-3' style={{ width: '18rem' }}>
            <Card.Header>ID : {props.data.id}</Card.Header>
            <Card.Img variant="top" src={props.data.image_src} />
            <Card.Body>
                <Card.Title>{props.data.product_name}</Card.Title>
                <Card.Text>
                    {props.data.product_desc}
                </Card.Text>
            </Card.Body>
        </Card>
        </>
    )

}




export default ProductTable 
