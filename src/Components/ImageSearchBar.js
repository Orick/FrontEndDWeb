import React, { Component } from 'react';
import { Row, Col, Image } from 'react-bootstrap';


class ImageSearchBar extends Component {
    render() {
        return (
            <Row>
                <Col sm={12} md={12} lg={12}>
                    <Image src='../image/center.png' className="image-search"/>
                </Col>
            </Row>

        );
    }
}

export default ImageSearchBar;
