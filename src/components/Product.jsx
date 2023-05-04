// import data from '../data/MOCK_DATA.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Paging from 'react-bootstrap/Pagination';
import { useState,useEffect,useContext,createContext  } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';
import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';

// import StatusProduct from './StatusProduct';

// const PagingContextGlobal = createContext()
function ProductTable(){
    const [showToast, setShowToast] = useState(false);

    let [reload, setReload] = useState(0);
    let [tempData, settempData] = useState([]);
    const [perPage, setPerPage] = useState(10);
	const [pagination, setPagination] = useState({ currentPage: 1, skip: 0,take:10,perPage :perPage });
    const [toastProperties, setToastProperties] = useState({title : "default",text:"default text"});
	const [data, setAPIData] = useState([]);
    const perPageItem = [5,10,25,50];
    const perPagePaginations = [];
    let toastElement = ()=> {
        return (<>
            <Toast role={"alert"} onClose={() => setShowToast(false)} bg={'primary'} show={showToast} delay={1500} autohide className="position-absolute top-1 end-0 float-start zindex-popover">
                <Toast.Header >
                <img
                    src="holder.js/20x20?text=%20"
                    className="rounded me-2"
                    alt=""
                />
                <strong className="me-auto">{toastProperties.title}</strong>
                </Toast.Header>
                <Toast.Body className='text-white'>{toastProperties.text}</Toast.Body>
            </Toast>
        </>)
    };
    useEffect(() => {
        settempData(data.slice(pagination.skip,pagination.take));
      }, [pagination]);
    useEffect(() => {
        if(reload === 1){
            console.log("reload");
            axios.get('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products')
            .then((response) => {
                setToastProperties({title:"Reloaded",text:"Data Grid Reloaded"});
                setAPIData(response.data);
                settempData(data.slice(pagination.skip,pagination.take));
                setReload(0);

            })
        }else{

        }
        
        // console.log(perPage);
      }, [reload]);
    useEffect(() => {
        setPagination({
            currentPage: 1, 
            skip: 0,
            take: perPage,
            perPage: perPage 
        });
        // console.log(perPage);
      }, [perPage]);

	useEffect(() => {
        // setTimeout(1500);
        console.log("first load");
        axios.get('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products')
        .then((response) => {
            setToastProperties({title:"Loaded",text:"Data Grid Loaded"});

            setAPIData(response.data);

        })
		
	}, [])

    useEffect(() => {
        setShowToast(true);

        settempData(data.slice(pagination.skip,pagination.take));

        // console.log(perPage);
      }, [data]);
    // useEffect(() => {
    //     // axios.get('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products')
    //     //     .then((response) => {
    //     //         setAPIData(response.data);
    //     //         setShowToast(true);

	//     //         settempData(data.slice(pagination.skip,pagination.take));

    //     //     })
    //     // console.log(perPage);
    //   }, [tempData]);
    // let _paging = { currentPage: 1, skip: 0,take:8 };

    let active = pagination.currentPage;
    let items = [];
    let pageCount = Math.ceil( data.length / pagination.perPage); 
    for (let number = 0;number < perPageItem.length; number++){
        perPagePaginations.push(
            <Paging.Item key={number} active={perPageItem[number] === perPage} 
            onClick={()=>
                setPerPage(perPageItem[number])
                }
                >
            {perPageItem[number]}
            </Paging.Item>,
        );
    }
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
	

    return (
        <>
            {AddProductModal({setReload:setReload})}
            <hr></hr>
            {showToast && toastElement() }
            <Container fluid>
                <Row>
                    <Col md={4}>
                        <Row>
                            <Col md={3}>
                                <h6>Per Page </h6>

                            </Col>
                            <Col>
                                <Paging className='mb-0' size="sm">{perPagePaginations}</Paging> 

                            </Col>
                        </Row> 
                        
                    </Col>
                </Row>
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
                    <th>Status</th>
					<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{tempData.map((_data) => <ProductRow data={{data:_data,setReload : setReload}} />)}
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

function ProductRow(props){
    
	// console.log(props);
	return (
		<>
		<tr>
			<td>{props.data.data.id}</td>
			<td>{props.data.data.brand}</td>
			<td>{props.data.data.product_name}</td>
			<td>{props.data.data.weight}</td>
			<td>{props.data.data.price}</td>
			<td>{props.data.data.image_src}</td>
			<td>{props.data.data.product_desc}</td>
			<td>
                {
                props.data.data.status === false? 
                <><h6 className='text-danger'>Deactivated</h6></> : 
                <><h6 className='text-success'>Active</h6></>
                }
            </td>

			<td>
			{/* <Button size='sm' variant="primary" >
				<Icon.Pencil size={12} className='mb-1' /> Edit
			</Button>{' '} */}
            <EditProductModal props={{setReload:props.data.setReload,data:props.data.data}} />{' '}
			<UpdateStatusProductModal data={{setReload: props.data.setReload,id : props.data.data.id,status : props.data.data.status}} />
			
			</td>
		</tr>
		</>
	)
}

function UpdateStatusProductModal(data) {
    // let [reload, setReload] = useState(0);

    const putData = () => {
        let status = false;
        if(data.data.status === false){
            // setState(true);
            status = true;

        }else{
            status = false;
        }
        axios.put('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products/'+data.data.id, {
            status
        }).then(function (response) {
            // console.log(data);
            handleClose();
            data.data.setReload(1);

          })
    }

    const [show, setShow] = useState(false);

    const actionName = () => {
        if(data.data.status === false){
            return (<>Activate</>)
        }else{
            return (<>Deactivate</>)

        }
    }

    const buttonAction = () => {
        // console.log(data);
        if(data.data.status === false){
            return (
                
                <Button size='sm' variant="success" onClick={handleShow}>
                     <Icon.CheckCircle size={14} className='mb-1' />  Activate
                </Button>
            )
        }else{
            return (
                <Button size='sm' variant="danger" onClick={handleShow} >
                    <Icon.Trash size={14} className='mb-1' /> Deactivate
                </Button>
            )
            
        }
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
        <>
        {buttonAction()}
        <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>                
                {actionName()} Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>
                    <Form autoComplete='off'>
                        <FormGroup>
                            Do you want to {actionName()} Product?

                        </FormGroup>
                        <hr></hr>
                        <FormGroup>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>{' '}
                            <Button variant="primary" onClick={putData}>
                                Update
                            </Button>
                        </FormGroup>
                    </Form>
                    </Col>
                    
                </Row>
                
            </Container>
            </Modal.Body>
        </Modal>
        </>
        
    );
}

function EditProductModal(data){
    const [id, setId] = useState(0);
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [weight, setWeight] = useState(0);
    const [product_desc, setProduct_desc] = useState('');
    const [image_src, setImageUrl] = useState('');
    const [product_name, setProductName] = useState('');
    const [status, setProductStatus]= useState(true);

    const [dataReal, setDataReal]= useState(null);
    const [dataFuture, setDataFuture]=useState(null);

    const [show, setShow] = useState(false);


    useEffect(() => {
        // setTimeout(1500);
        if(show){
            // console.log(data.props.data.id);

            console.log("load data edit");
            axios.get('https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products/'+data.props.data.id)
            .then((response) => {
                setDataReal(response.data);
                setDataFuture(response.data);
                // console.log(response);
    
            })
        }
        
		
	}, [show])

    useEffect(()=>{
        if(dataReal !== null){
            console.log("loaded data edit");
            setBrand(dataReal.brand);
            setProductName(dataReal.product_name);
            setPrice(dataReal.price);
            setWeight(dataReal.weight);
            setImageUrl(dataReal.image_src);
            setId(dataReal.id);
            setProduct_desc(dataReal.product_desc);
        }

    },[dataReal]);

    const putData = () => {
        
        axios.put(`https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products/`+data.props.data.id,{
            brand,
            product_name,
            weight,
            price,
            image_src,
            product_desc
        })
        .then(function(response){
            setDataReal(response);
            setDataFuture(response);
            handleClose();
            // console.log(response);
            data.props.setReload(1);
        });
        
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
        <>
        <Button size='sm' variant="primary" onClick={handleShow} >
            <Icon.Pencil size={12} className='mb-1' /> Edit
        </Button>
        <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>                
                Edit Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>
                    <Form autoComplete='off'>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formBrand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" placeholder="Enter brand name" value={brand} onChange={(e) => setBrand(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name" value={product_name} onChange={(e) => setProductName(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="number" placeholder="Enter weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formProductName">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter product price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image url" value={image_src} onChange={(e) => setImageUrl(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProductDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter product description" value={product_desc} onChange={(e) => setProduct_desc(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    </Col>
                    
                </Row>
                
            </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={putData}>
                Update
            </Button>
            </Modal.Footer>
        </Modal>
        </>
        
    );
}

function AddProductModal(data) {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [weight, setWeight] = useState(0);
    const [product_desc, setProduct_desc] = useState('');
    const [image_src, setImageUrl] = useState('');
    const [product_name, setProductName] = useState('');
    const [status, setProductStatus]= useState(true);

    const postData = () => {
        
        axios.post(`https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products`, {
            brand,
            price,
            weight,
            product_desc,
            image_src,
            product_name,
            status
        }).then(function(response){
            handleClose();
            // console.log(response);
            data.setReload(1);
        });
        
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
        <>
        <Button variant="primary" onClick={handleShow}>
            <Icon.PlusCircle size={14} className='mb-1'  /> Add New Product
        </Button>
        <Modal show={show} onHide={handleClose} backdrop="static"
        keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>                
                Add Product
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container fluid>
                <Row>
                    <Col>
                    <Form autoComplete='off'>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formBrand">
                                <Form.Label>Brand</Form.Label>
                                <Form.Control type="text" placeholder="Enter brand name" onChange={(e) => setBrand(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formProductName">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter product name" onChange={(e) => setProductName(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} className="mb-3" controlId="formWeight">
                                <Form.Label>Weight</Form.Label>
                                <Form.Control type="number" placeholder="Enter weight" onChange={(e) => setWeight(e.target.value)} />
                            </Form.Group>
                            <Form.Group as={Col} className="mb-3" controlId="formProductName">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Enter product price" onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image url" onChange={(e) => setImageUrl(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formProductDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter product description" onChange={(e) => setProduct_desc(e.target.value)}/>
                        </Form.Group>
                    </Form>
                    </Col>
                    
                </Row>
                
            </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={postData}>
                Submit
            </Button>
            </Modal.Footer>
        </Modal>
        </>
        
    );
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
