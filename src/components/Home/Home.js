// import React from 'react'
// import TopNav from '../Navbar/TopNav'
// import Graph from '../Graph/Graph'
// import { Col, Container, Row } from 'react-bootstrap'
// import LeastQty from '../Graph/LeastQty'
// import LowSale from '../Graph/LowSale'
// import HighSale from '../Graph/HighSale'

// const Dash = () => {
//     return (
//         <Container fluid>
//             <TopNav />
//             <Container>
//                 {/* <Row>
//                     <Col lg={4}>
//                     <LeastQty />
//                     </Col>
//                     <Col lg={4} >
//                     <LeastQty />
//                     </Col>
//                     <Col lg={4} >
//                     <LeastQty />
//                     </Col>
//                 </Row> */}
//             </Container>
//             <LeastQty />
//             <div className='mt-5'></div>
//             <LowSale />
//             <div className='mt-5'></div>
//             <HighSale />
//         </Container>
//     )
// }

// export default Dash
import React, { useState } from 'react';
import TopNav from '../Navbar/TopNav';
import Graph from '../Graph/Graph';
import { Card, Col, Container, Row } from 'react-bootstrap';
import LeastQty from '../Graph/LeastQty';
import LowSale from '../Graph/LowSale';
import HighSale from '../Graph/HighSale';

const Dash = () => {
  const [selectedComponent, setSelectedComponent] = useState('lowsale');

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectedComponent(value);
  };

  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      case 'lowsale':
        return <LowSale />;
      case 'highsale':
        return <HighSale />;
      case 'leastqty':
        return <LeastQty />;
      default:
        return null;
    }
  };

  return (
    <Container fluid className='mb-5'>
      <TopNav />
      <Container className='mt-2 mb-5'>
        <Row>
          <Col>
          <h1 className='text-center'> Analytics</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
            <div className="form-group">
              <label htmlFor="component-select mt-1 mb-3">Choose</label>
              <select
                className="form-control mb-3"
                id="component-select"
                value={selectedComponent}
                onChange={handleSelect}
              >
                <option value="lowsale">LowSale</option>
                <option value="highsale">HighSale</option>
                <option value="leastqty">LeastQty</option>
              </select>
            </div>
          </Col>
        </Row>
        <Card className='bg-dark p-4'>
        {renderSelectedComponent()}
        </Card>
       
      </Container>
      
    </Container>
  );
};

export default Dash;
