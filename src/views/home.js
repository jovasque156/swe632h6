import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Button, Card, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import explore_icon from '../assets/explore.png';
import model_icon from '../assets/model.png';

export const Home = () => {
    return(
    <>
        <Container style={{paddingTop: "60px", paddingLeft: '0px', paddingRight: '0px'}} fluid='lg'>
            <Row className='text-center'>
                <h1>Welcome to Student Dropout App!</h1>
            </Row>
            <br/>
            <Row>
                <Col></Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" as='img' src={explore_icon} />
                        <Card.Body>
                            <Card.Title>Explore Students</Card.Title>
                            <Card.Text>
                                Explore students at risk of Dropout. Download their information and use
                                them as input of interventions.
                            </Card.Text>
                            <Button variant="primary" as={Link} to='/search'>Take me to Explore!</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={model_icon} />
                        <Card.Body>
                            <Card.Title>Learn About the Risk</Card.Title>
                            <Card.Text>
                                Learn about the risk score and the model that computes it.<br/>
                                Click on the button below and read more about it!
                            </Card.Text>
                            <Button variant="primary" as={Link} to='/risk'>Let's learn!</Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>
    </>
    )
}