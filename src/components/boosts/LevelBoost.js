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
    const [boosterCut, setBoostCut] = useState(0);
    const [vip, setVIP] = useState(true);
    const levelRanges = [
        [10, 30, '10-30'],
        [30, 40, '30-40'],
        [40, 45, '40-45'],
        [45, 50, '45-50'],
        [10, 50, '10-50']
    ];

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
            const defaultBundle = data['vip']['bundles']['10-50'];
            setBundlePrices(defaultBundle);
        })
    }, []);

    function advUpdate(event){
        event.preventDefault();
        var adv_name = event.target.value;
        setAdvName(adv_name);
        ls.set('adv_name', adv_name);
    }

    function updateStartLevel(event){
        var level = parseInt(event.target.value);
        if (level == NaN || level < 10 || level > 50){
            level = 10;
        }
        setStart(level);
        calcCost(level, endLevel);
    }
    
    function updateEndLevel(event){
        var level = parseInt(event.target.value);
        if (level == NaN || level < 10 || level > 50){
            level = 50;
        }
        setEnd(level);
        calcCost(startLevel, level);
    }

    function createOffer(event) {

    }

    function submitRun(event) {

    }

    function copyElement(event){

    }

    function calcCost(start, end){
        if (vip) {
            // Means that we can get a full bundle price
            if (start % 10 == 0 && end % 10 == 0) {
                var key = String(start) + "-" + String(end);

                
                for (var i in levelRanges){
                    if (key == levelRanges[i][2]){
                        var bundlePrice = goldDict['vip']['bundles'][key];
                        setBundlePrices(bundlePrice);
                        return;
                    }
                }

                // Edge case where per level is actually cheaper. 
                if (start == 10 && end == 20){
                    var price = goldDict['vip']['per_level']['10-30'];
                    setPerLevelPrices(price, 10)
                    return;
                }

                if (start == 10 && end == 40){
                    var price1 = goldDict['vip']['bundles']['10-30'];
                    var price2 = goldDict['vip']['bundles']['30-40']

                    var cost = {
                        'list_price': parseInt(price1['list_price']) + parseInt(price2['list_price']),
                        'boost_cut': parseInt(price1['list_price']) + parseInt(price2['boost_cut']),
                        'advertiser_cut': parseInt(price1['advertiser_cut']) + parseInt(price2['advertiser_cut'])
                    }
                    setBundlePrices(cost);
                    return;
                }
                
            // Means we gotta do some math...
            // Most of the time, the end result is 50. 
            // Per level until round #, then bundles rest of the way. 
            } else if (end == 50) {
                for (var i in levelRanges){
                    // If start is less than the end range, its within this range. 
                    if (start < levelRanges[i][1]){
                        // per level at this range. 
                        var levelDiff = levelRanges[i][1] - start;
                        var levelPrices = goldDict['vip']['per_level'][levelRanges[i][2]]
                    }
                }
            }
        }
    }

    function setBundlePrices(defaultBundle){
        var list_price = defaultBundle['list_price'];
        var boost_cut = defaultBundle['boost_cut'];
        var advertiser_cut = defaultBundle['advertiser_cut']
        setBuyTotal(list_price - discount);
        setAdvTotal(advertiser_cut - discount);
        setBoostCut(boost_cut);
    }

    function setMultiBundlePrices(multiBundle){

    }

    function setPerLevelPrices(levelDict, levels){
        var list_price = levelDict['list_price'] * levels;
        var boost_cut = levelDict['boost_cut'] * levels;
        var advertiser_cut = levelDict['advertiser_cut'] * levels;
        setBuyTotal(list_price - discount);
        setAdvTotal(advertiser_cut - discount);
        setBoostCut(boost_cut);
    }

    return (
        <div className="center">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Huokan Lvl Calc</title>
                <script data-ad-client="ca-pub-5493170330729204" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            </Helmet>
            <Form>
                <p>
                    Huokan Leveling Boost Calculator <a href="https://docs.google.com/spreadsheets/d/155thp4_gWSQN8A8T-kqdxpBkLeueWPUXd3IUG62iMwQ/edit#gid=1345316560" target="_blank"> Excel sheet</a>
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
                            <Col sm={4}>
                                <Form.Group controlId="buyerOwes">
                                    <Form.Label> Buyer Owes</Form.Label>
                                    <Form.Control value={buyerTotal} type="number" />
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Form.Group controlId="advCut">
                                    <Form.Label> Advertiser Cut </Form.Label>
                                    <Form.Control value={advTotal} type="number"/>
                                </Form.Group>
                            </Col>
                            <Col sm={4}>
                                <Row>
                                    <Form.Group className="paid" controlId="formBasicCheckbox">
                                        <Form.Check value={paid} onChange={setPaid} type="checkbox" label="Paid" />
                                    </Form.Group>
                                    <Form.Group className="paid" controlId="formBasicCheckbox">
                                        <Form.Check defaultChecked={vip} value={vip} onChange={setVIP} type="checkbox" label="VIP" />
                                    </Form.Group>
                                    <Form.Group className="paid" controlId="formBasicCheckbox">
                                        <Form.Check defaultChecked={horde} value={horde} onChange={setHorde} type="checkbox" label="Horde" />
                                    </Form.Group>
                                </Row>
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
}



export default LevelBoost
