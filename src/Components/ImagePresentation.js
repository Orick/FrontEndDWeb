import React, { Component } from 'react';
import { Row, Col, Image, Grid } from 'react-bootstrap'

class ImagePresentation extends Component {
    render() {
        return (
            <Grid>
                <Row>
                    <Col sm={12} md={12} lg={12}>
                        <Image src='../image/thumbnail.png'/>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
export default ImagePresentation;
