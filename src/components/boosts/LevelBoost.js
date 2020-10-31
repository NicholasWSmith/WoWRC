import React, { useState, useEffect } from 'react'
import { Form } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'reactstrap';
import ls from 'local-storage'
import {Helmet} from "react-helmet";

function LevelBoost(props) {
    var storage_name = ls.get('adv_name') || "";
    const [adv_name, setAdvName] = useState(storage_name);
    const [goldDict, setGoldDict] = useState({});
    const [startLevel, setStart] = useState(10);
    const [endLevel, setEnd] = useState(50);
    const [paid, setPaid] = useState(false);
    const [buyerTotal, setBuyTotal] = useState(0)
    const [advTotal, setAdvTotal] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [horde, setHorde] = useState(true);
    
    // keys are:
    // advertiser_cut: "1.00"
    // advertiser_perc: "20.00%"
    // booster_cut: "3.00"
    // gbank_deposit: "4.00"
    // list_price: "5.00"
    
    useEffect(() => {
        console.log('got here!');
        fetch('get_prices').then(
            response => {
                return response.json();
            }
        ).then(data => {
           setGoldDict(data);
           return data;
        }).then((data) => {
            const defaultBundle = data['bundles']['10-50'];
            var list_price = defaultBundle['list_price'];
            var boost_cut = defaultBundle['boost_cut'];
            var advertiser_cut = defaultBundle['advertiser_cut']
            setBuyTotal(list_price);
            setAdvTotal(advertiser_cut);
        })
    }, []);

    return (
        <div className="center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Huokan Lvl Calc</title>
                <script data-ad-client="ca-pub-5493170330729204" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            </Helmet>
            <Form>
                <p>
                    Leveling Boost Calculator 
                    <br />
                    All values are in <b> 000's of gold</b> (ex: 1.0 = 1000)
                </p>
                <Form.Group className="discount" controlId="exampleForm.ControlInput1">
                    <Form.Label>Advertiser Name</Form.Label>
                    <Form.Control type="string" value={adv_name} onChange={advUpdate} placeholder="name-realm" />
                </Form.Group>
                <div className='rowC'>
                    <Container>
                        <Row>
                            <Col sm={4}>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> Start Level </Form.Label>
                                    <Form.Control value={startLevel} onChange={updateStartLevel} type="number" placeholder="ex: 10" />
                                </Form.Group>
                            </Col>
                            
                            <Col sm={4}>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> End Level </Form.Label>
                                    <Form.Control value={endLevel} onChange={updateEndLevel} type="number" placeholder="ex: 50" />
                                </Form.Group>
                            </Col>

                            <Col sm={4}>
                                <Form.Group controlId="exampleForm.ControlInput2">
                                    <Form.Label> Discount Amount </Form.Label>
                                    <Form.Control type="number" value="0" placeholder="ex: 1 (for 1k)" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <Form.Group controlId="buyerOwes">
                                    <Form.Label> Buyer Owes</Form.Label>
                                    <Form.Control value={buyerTotal} type="number" />
                                </Form.Group>
                            </Col>
                            
                            <Col>
                                <Form.Group controlId="advCut">
                                    <Form.Label> Advertiser Cut </Form.Label>
                                    <Form.Control value={advTotal} type="number"/>
                                </Form.Group>
                            </Col>
                            <Col className="paid" >
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check value={paid} onChange={setPaid} type="checkbox" label="Paid" />
                                </Form.Group>
                            </Col>
                            <Col className="paid" >
                                <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check defaultChecked={horde} value={horde} onChange={setHorde} type="checkbox" label="Horde" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Container>
                </div>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <Form.Group controlId="createOffer">
                                    <Form.Label> Offer Post </Form.Label>
                                    <Form.Control as="textarea" rows={7} />
                                </Form.Group>
                            </Col>

                            <Col xs={6}>
                                <Form.Group controlId="createSubmission">
                                    <Form.Label> Level Submission </Form.Label>
                                    <Form.Control as="textarea" rows={7} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <Button className="submit" id="offer" variant="primary" onClick={copyElement}>
                                    Copy me! 
                                </Button>
                            </Col>
                            <Col sm={6}>
                                <Button className="submit" id ="submission" variant="primary" onClick={copyElement}>
                                    Copy me! 
                                </Button>
                            </Col>
                        </Row>
                    </Container>
            </Form>
        </div>
    )

    function calcCost(){
        
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
        calcCost();
    }
    
    function updateEndLevel(event){
        var level = event.target.value;
        if (level == null){
            level = 0;
        }
        setEnd(level);
        calcCost();
    }

    function createOffer(event) {

    }

    function submitRun(event) {

    }

    function copyElement(event){

    }
}



export default LevelBoost
