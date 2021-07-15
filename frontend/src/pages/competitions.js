import React from 'react'
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table'
import { useHistory } from "react-router-dom"
import Jumbotron from 'react-bootstrap/Jumbotron'

export default function Competitions() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const history = useHistory()

    function handleCompetitions() {
        history.push("/competitions")
    }

    function handleChats() {
        history.push("/chats")
    }
    function format(time) {
        // Hours, minutes and seconds
        var hrs = ~~(time / 3600);
        var mins = ~~((time % 3600) / 60);
        var secs = ~~time % 60;

        // Output like "1:01" or "4:03:59" or "123:03:59"
        var ret = "";
        if (hrs > 0) {
            ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
        }
        ret += "" + mins + ":" + (secs < 10 ? "0" : "");
        ret += "" + secs;
        return ret;
    }
    function convertDate(date)
    {
        date = new Date(date);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }

        return (year + '-' + month + '-' + dt);
    }
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("/all")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (

            <Jumbotron >
                <div className='nav-bar'>
                    <div onClick={handleChats} className='logo-tab'>
                        Name of Project
                    </div>
                    <div onClick={handleCompetitions} className='competitions'>
                        Competitions
                    </div>
                </div>
                <Table Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Start Time</th>
                                <th>Contest Name</th>
                                <th>Time Duration</th>
                                <th>Site Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                item.duration / 3600<20?<tr key={item.name}>
                                    <td>{convertDate(item.start_time)}</td>
                                    <td > <a color="black" href={item.url}>{item.name}</a></td>
                                    <td>{format(item.duration)} hrs</td>
                                    <td> {item.site} </td>
                                    <td>{item.status} </td>
                                </tr>:null
                            ))}

                        </tbody>
                    </Table>

            </Jumbotron>

        );
    }
}