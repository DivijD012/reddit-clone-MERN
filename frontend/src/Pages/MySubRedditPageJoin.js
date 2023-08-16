import '../index.css';
import MyNavBar from "./navbar"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function acceptRequest(index, pageid, joining, setJoining) {
    axios.post('http://localhost:8000/getMembers', {
        pageid:pageid
    })
    .then((response) => {
        console.log(response)
        let temp = []
        let copy = []
        copy.push(...joining);
        console.log(copy)
        let count = response.data.num_follows;
        temp.push(...response.data.joining_request);
        console.log(temp)
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i] == joining[index]._id)
            {
                temp.splice(i, 1);
            }
        }
        console.log(temp)
        axios.post('http://localhost:8000/updateJoin', {
            join:temp,
            pageid:pageid
        })
        .then((response2) => {
            console.log(response2)
        })
        axios.post('http://localhost:8000/acceptJoin', {
            userid:joining[index]._id,
            pageid:pageid,
            count:count
        })
        .then((response3) => {
            console.log(response3);
            copy.splice(index, 1);
            setJoining(copy);    
        })
    })
}

function rejectRequest(index, pageid, joining, setJoining) {
    axios.post('http://localhost:8000/getMembers', {
        pageid:pageid
    })
    .then((response) => {
        console.log(response)
        let temp = []
        temp.push(...response.data.joining_request);
        console.log(temp)
        let copy = []
        copy.push(...joining);
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i] == joining[index]._id)
            {
                temp.splice(i, 1);
            }
        }
        console.log(temp)
        axios.post('http://localhost:8000/updateJoin', {
            join:temp,
            pageid:pageid
        })
        .then((response2) => {
            console.log(response2)
            copy.splice(index, 1);
            setJoining(copy); 
        })
    })
}

export default function MySubRedditPageJoin() {
    let {state} = useLocation()
    const [pageid, setPageId] = useState(state.pageid)
    const [joining, setJoining] = useState([])
    // console.log(pageid)
    useEffect(() => {
        axios.post('http://localhost:8000/getMembers', {
            pageid:pageid
        })
        .then((response) => {
            console.log(response)
            let temp = [];
            let temp_id = []
            for(let i = 0;i<response.data.joining_request.length;i++)
            {   
                let y = 0;
                for(let j=0;j<temp_id.length;j++)
                {
                    if(response.data.joining_request[i] == temp_id[j])
                    {
                        y = 1;
                        break;
                    }
                }
                if(y==1)
                    continue;
                temp_id = temp_id.concat(response.data.joining_request[i])
                axios.post('http://localhost:8000/getUser', {
                    userid:response.data.joining_request[i]
                })
                .then((response2) => {
                    // console.log(response2)
                    temp = temp.concat(response2.data)
                    console.log(temp)
                    setJoining(temp)
                })
            }
        })
    }, []);
    // console.log(members);
    return (
        <div>
            {MyNavBar(1, pageid)}
            <div id="list">
            {
                joining.map((some, index) => (
                    <div>
                        Index : {1 + index} <br />
                        Name : {some.username} <br />
                        <button onClick={() => acceptRequest(index, pageid, joining, setJoining)}>ACCEPT</button>
                        <button onClick={() => rejectRequest(index++, pageid, joining, setJoining)}>REJECT</button>
                    </div>
            ))}
            </div>
        </div>
    )
}