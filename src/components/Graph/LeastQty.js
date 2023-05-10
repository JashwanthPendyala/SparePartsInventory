import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import AxiosServices from '../Services/AxiosServices';

Chart.register(CategoryScale);

// Now you can create your chart as usual


const LeastQty = () => {
    const [data, setData] = useState({
        labels: [],
        datasets: [
          {
            label: 'Quantity',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: []
          }
        //   ,
        //   {
        //     label: 'Price',
        //     backgroundColor: 'rgba(255,99,132,1)',
        //     borderColor: 'rgba(0,0,0,1)',
        //     borderWidth: 2,
        //     data: []
        //   }
        ]
      });
      



    useEffect(() => {
        // axios.get('http://192.168.3.61:8011/transactions/leastQty/',{
        //     headers:{
        //         Authorization:"Token "+localStorage.getItem("token")
        //     }
        // })
          AxiosServices.leastQty().then(response => {
                console.log(response.data);
                setData({
                    labels: response.data.map(item => item.name),
                    datasets: [
                        {
                            label: 'Quantity',
                            backgroundColor: 'rgba(75,192,192,1)',
                            borderColor: 'rgba(0,0,0,1)',
                            borderWidth: 2,
                            data: response.data.map(item => item.quantity)
                        }
                        // ,
                        // {
                        //     label: 'Price',
                        //     backgroundColor: 'rgba(255,99,132,1)',
                        //     borderColor: 'rgba(0,0,0,1)',
                        //     borderWidth: 2,
                        //     data: response.data.map(item => item.price)
                        // }
                    ]
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



    return (
        <Container className='mb-5'>
            <Bar
                data={data}
                options={{
                    title: {
                        display: true,
                        text: 'Product Quantity and Price',
                        fontSize: 20
                    },
                    legend: {
                        display: true,
                        position: 'right'
                    }
                }}
            />
        </Container>
    );
};



export default LeastQty