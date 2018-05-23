import React from 'react';
import { Row, Col, Grid, Image } from 'react-bootstrap'
import imagePres from '../image/fondo.png';

const ImagePresentation = (props) => {
    return (
        <Grid>
            <Row>
                <Col sm={12} md={12} lg={12} style={{textAlign:'center'}}>
                    <Image src={imagePres} style={{width:'29%'}} />
                </Col>
            </Row>
        </Grid>
    );
};

// class ImagePresentation extends Component {
//     render() {
//         return (
//             <Grid>
//                 <Row>
//                     <Col sm={12} md={12} lg={12}>
//                         <img src={imagePres} style={{width:'150px',height:'100px'}} />
//                     </Col>
//                 </Row>
//             </Grid>
//         );
//     }
// }
export default ImagePresentation;
