import React, { useState, useEffect } from 'react'
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'reactstrap';
import ls from 'local-storage'


function LevelBoost(props) {
    var storage_name = ls.get('adv_name') || "";
    const [adv_name, setAdvName] = useState(storage_name);
    const [gold_dict, setGoldDict] = useState({});
    const [startLevel, setStart] = useState(10);
    const [endLevel, setEnd] = useState(50);
    
    useEffect(() => {
        console.log('got here!');
        fetch('get_prices').then(
            response => {
                return response.json();
            }
        ).then(data => {
           setGoldDict(data);
        })
    }, []);

    return (
        <div className="center">
            <script data-ad-client="ca-pub-5493170330729204" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> 
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
                                    <Form.Control value={startLevel} onChange={updateStartLevel} type="number" placeholder="ex: 10" />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> End Level </Form.Label>
                                    <Form.Control value={endLevel} onChange={updateEndLevel} type="number" placeholder="ex: 50" />
                                </Form.Group>
                            </Col>

                            <Col>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> Discount Amount</Form.Label>
                                    <Form.Control type="number" value="0" placeholder="ex: 1 (for 1k)" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </div>

                <Button className="submit" variant="primary" type="submit">
                    Submit Run
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
        console.log(gold_dict);
    }
    
    function advUpdate(event){
        event.preventDefault();
        var adv_name = event.target.value;
        setAdvName(adv_name);
        ls.set('adv_name', adv_name);
    }

    function updateStartLevel(event){
        var level = event.target.value;
        if (level == null){
            level = 0;
        }
        setStart(level);
    }
    
    function updateEndLevel(event){
        var level = event.target.value;
        if (level == null){
            level = 0;
        }
        setEnd(level);
    }
}



export default LevelBoost
