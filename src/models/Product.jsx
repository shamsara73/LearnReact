import data from '../data/MOCK_DATA.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Paging from 'react-bootstrap/Pagination';
import { useState  } from 'react';
import Pagination from './Pagination';

// const PagingContextGlobal = createContext()

function ProductList(){
    // const [skip, setSkip] = useState(0);
    // const [take, setTake] = useState(8);
    // const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({ currentPage: 1, skip: 0,take:8,perPage :8 });

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
                <h1>Product List</h1>

                <Row>
                    {tempData.map((_data) => <Product data={_data} />)}
                </Row>
                <Paging size="sm">{items}</Paging>

            </Container>
            {/* <Pagination data={pagination} /> */}


        </>
    )
}

function Product(props){
    return (
        <>
        <Card className='m-3' style={{ width: '18rem' }}>
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



export default ProductList