
import Modal from 'react-bootstrap/Modal';
import { useState  } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import * as Icon from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function AddProductModal() {
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [weight, setweight] = useState(0);
    const [product_desc, setProduct_desc] = useState('');
    const [image_src, setImageUrl] = useState('');
    const [product_name, setProductName] = useState('');

    const postData = () => {
        
        axios.post(`https://644b1ee817e2663b9de93566.mockapi.io/api/v1/products`, {
            brand,
            price,
            weight,
            product_desc,
            image_src,
            product_name
        })
    }
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        
        <>
        <Button variant="primary" onClick={handleShow}>
            <Icon.PlusCircle /> Add New Product
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
                        <Form.Group className="mb-3" controlId="formBrandName">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter brand name" onChange={(e) => setBrand(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formImage">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image url" onChange={(e) => setImageUrl(e.target.value)}/>
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

export default AddProductModal;