import '../index.css';
import MyNavBar from "./navbar"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

export default function MySubRedditPageUser() {
    let {state} = useLocation()
    const [pageid, setPageId] = useState(state.pageid)
    const [blocked, setBlocked] = useState([])
    const [members, setMembers] = useState([])
    // console.log(pageid)
    useEffect(() => {
        axios.post('http://localhost:8000/getMembers', {
            pageid:pageid
        })
        .then((response) => {
            let temp = [];
            for(let i = 0;i<response.data.members.length;i++)
            {   
                axios.post('http://localhost:8000/getUser', {
                    userid:response.data.members[i]
                })
                .then((response2) => {
                    console.log(response2)
                    temp = temp.concat(response2.data.username)
                    setMembers(temp)
                })
            }
        })
    }, []);
    // console.log(members);
    return (
        <div>
            {MyNavBar(1, pageid)}
            <div id="blockedList">
            {
                blocked.map((some, index) => (
                    <div>
                        Index : {1 + index++} <br />
                        Userame : {some} <br />
                    </div>
            ))}
            </div>
            <div id="list">
            {
                members.map((some, index) => (
                    <div>
                        Index : {1 + index++} <br />
                        Name : {some} <br />
                    </div>
            ))}
            </div>
        </div>
    )
}