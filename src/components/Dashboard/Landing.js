import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart, LinearScale, CategoryScale, BarElement } from 'chart.js'
import { Button, Card } from 'react-bootstrap'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
Chart.register(LinearScale, CategoryScale, BarElement)

function LandingPage1() {
    const [data, setData] = useState('')
    const [name, setName] = useState([])
    const [quantity, setQuantity] = useState([])
    // const token = localStorage.getItem('token')



    useEffect(() => {

        axios.get("http://192.168.4.9:8011/inventory/stock/")
            .then(resp => setData(resp.data.results))
        console.log(data);

    }, [])
    console.log(data);
    useEffect(() => {
        data && data.map((e) => (
            name.push(e.name),
            quantity.push(e.quantity
            )
        ))

    }, [data])

    const labels = name
    const data1 = {
        labels,
        datasets: [

            {
                label: "2020 Expense",
                data: quantity,
                backgroundColor: "aqua"
            },
            // {
            //     label: "2021 Expense",
            //     data: [170000, 80000, 20000, 75000, 55000, 65000,60000,30000,75000,65000,45000],
            //     backgroundColor: "aqua"
            // }
        ]
    }
    return (
       <>
            <div>
                {/* <h1>ddddddddddddddddd</h1> */}
                <Card className='rounded' >
                    <Bar style={{ width: "200px" }}
                        data={data1}
                    />
                </Card>

            </div>
             <div className='mt-4 sm-6'>
                 <Button className="btn btn-secondary" id='boxes'>New Incoming Stock</Button>
                 <Button className='btn btn-secondary' id='boxes'>New Outcoming Stock</Button>
             </div>
       </>
    )

}

export default Landing