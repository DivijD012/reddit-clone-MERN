import '../index.css';
import MyNavBar from "./navbar"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function ignoreReport(index, pageid, reports, setReports, changeNow, setChangeNow) {
    axios.post('http://localhost:8000/ignoreReport', {
        reportid:reports[index]._id
    })
    .then((response) => {
        reports.splice(index);
        setChangeNow(changeNow + 1)
    })
}

function deleteReport(index, pageid, reports, setReports, changeNow, setChangeNow) {
    axios.post('http://localhost:8000/ignoreReport', {
        reportid:reports[index]._id
    })
    .then((response) => {
        // console.log(response)
        setChangeNow(changeNow + 1)
        axios.post('http://localhost:8000/deletePost', {
            postid:reports[index].postId
        })
        .then((response2)=> {
            console.log(response2);
            reports.splice(index);
        })
    })
}

export default function MySubRedditPageReport() {
    let {state} = useLocation()
    const [pageid, setPageId] = useState(state.pageid)
    const [reports, setReports] = useState([])
    const [changeNow, setChangeNow] = useState(0)

    useEffect(() => {
        let userid = localStorage.getItem("token_store");
        axios.post('http://localhost:8000/getReport', {
            pageid:pageid
        })
        .then((response) => {
            console.log(response)
            setReports(response.data)
        })
    }, [changeNow]);
    console.log(reports);
    return (
        <div>
            {MyNavBar(1, pageid)}
            <div id="list">
            {
                reports.map((some, index) => (
                    <div>
                        Index : {1 + index} <br />
                        Reported by : {some.userReportingName} <br />
                        Whom has gotten reported : {some.userReportedName} <br />
                        Concern : {some.complaint} <br />
                        Text : {some.postText} <br />
                        <button onClick={() => ignoreReport(index, pageid, reports, setReports, changeNow, setChangeNow)}>IGNORE</button>
                        <button onClick={() => deleteReport(index, pageid, reports, setReports, changeNow, setChangeNow)}>DELETE</button>
                        <br /><br /><br />
                    </div>
            ))}
            </div>
        </div>
    )
}