import React, { useState } from 'react'
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'reactstrap';
import ls from 'local-storage'


function LevelBoost(props) {
    var storage_name = ls.get('adv_name') || "";
    const [adv_name, setAdvName] = useState(storage_name);

    return (
        <div className="center"> 
            <Form onSubmit={calcCost}>
                <p>
                    Leveling Boost Calculator
                </p>
                <Form.Group className="discount" controlId="exampleForm.ControlInput1">
                    <Form.Label>Advertiser Name</Form.Label>
                    <Form.Control type="string" value={adv_name} onChange={advUpdate} placeholder="name-realm" />
                </Form.Group>
                <div className='rowC'>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> Start Level </Form.Label>
                                    <Form.Control type="number" placeholder="ex: 10" />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> End Level </Form.Label>
                                    <Form.Control type="number" placeholder="ex: 50" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Form.Group className="discount" controlId="exampleForm.ControlInput2">
                    <Form.Label> Discount Amount</Form.Label>
                    <Form.Control type="number" value="0" placeholder="ex: 1 (for 1k)" />
                </Form.Group>

                <Button className="submit" variant="primary" type="submit">
                    Submit
                </Button>

                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="buyerOwes">
                                    <Form.Label> Buyer Owes</Form.Label>
                                    <Form.Control type="number" />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="advCut">
                                    <Form.Label> Your Cut (max discount)</Form.Label>
                                    <Form.Control type="number"/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Run Submission Form</Form.Label>
                    <Form.Control as="textarea" rows={7} />
                </Form.Group>
            </Form>
        </div>
    )

    function calcCost(data){
        data.preventDefault();
        console.log(adv_name);
    }
    
    function advUpdate(event){
        event.preventDefault();
        var adv_name = event.target.value;
        setAdvName(adv_name);
        ls.set('adv_name', adv_name);
    }
}



export default LevelBoost
