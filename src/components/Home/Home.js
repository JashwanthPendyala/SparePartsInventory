import React from 'react'
import TopNav from '../Navbar/TopNav'
import Graph from '../Graph/Graph'
import { Container } from 'react-bootstrap'

const Dash = () => {
    return (
        <Container fluid>
            <TopNav />
            <Graph />
            <div className='mt-5'></div>
            <Graph />
        </Container>
    )
}

export default Dash