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
import { Col, Container, Row } from 'react-bootstrap';
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
    <Container fluid>
      <TopNav />
      <Container>
        <Row>
          <Col lg={4}>
            <div className="form-group">
              <label htmlFor="component-select">Select a component:</label>
              <select
                className="form-control"
                id="component-select"
                value={selectedComponent}
                onChange={handleSelect}
              >
                <option value="">Choose a component</option>
                <option value="lowsale">LowSale</option>
                <option value="highsale">HighSale</option>
                <option value="leastqty">LeastQty</option>
              </select>
            </div>
          </Col>
        </Row>
      </Container>
      {renderSelectedComponent()}
    </Container>
  );
};

export default Dash;
