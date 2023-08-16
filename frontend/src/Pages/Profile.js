import React, { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';
import MyNavBar from "./navbar";

function logout() {
    localStorage.setItem("isLoggedIn", 0);
    window.location.replace('/auth');
}

function removeFollow(otheruserid, index) {
    let userid = localStorage.getItem("token_store");
    otheruserid = otheruserid[index][0]
    console.log("HI")
    console.log("control")
    axios.post('http://localhost:8000/removeFollowersList', {
        userid:userid,
        otheruserid:otheruserid
    })
    .then((response) => {
        console.log(response)
        axios.post('http://localhost:8000/removeFollowingList', {
            userid:userid,
            otheruserid:otheruserid
        })
        .then((response) => {
            console.log(response)
            window.location.reload()
        })
    })
}

function removeFollowing(otheruserid, index) {
    let userid = localStorage.getItem("token_store");
    otheruserid = otheruserid[index][0]
    console.log("HI")
    console.log("control")
    axios.post('http://localhost:8000/removeFollowersList', {
        userid:otheruserid,
        otheruserid:userid
    })
    .then((response) => {
        console.log(response)
        axios.post('http://localhost:8000/removeFollowingList', {
            userid:otheruserid,
            otheruserid:userid
        })
        .then((response) => {
            console.log(response)
            window.location.reload()
        })
    })
}

function renderSideTable(tableState, setTableState, realToken, followersList, followingList) {
    if(tableState === 0)
        return;
    else if(tableState == 1) {
        if(realToken == undefined)
            return;
        console.log(realToken.followers)
        return (
            <div>
                {
                    followersList.map((some, index) => {
                        return (
                            <div>
                                    {index + 1 +". " + some[1]}
                                    <button onClick={() => {removeFollow(followersList, index)}}>REMOVE</button> <br />
                            </div>
                        )
                    })
                }
            </div>
        );
    }
    else {
        if(realToken == undefined)
            return;
        console.log(realToken.following)
        return (
            <div>
                {
                    followingList.map((some, index) => {
                        return (
                            <div>
                                    {index + 1 +". " + some[1]}
                                    <button onClick={() => {removeFollowing(followingList, index)}}>UNFOLLOW</button>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

function renderFollowersButton(realToken, setTableState)
{
    if(realToken.followers == undefined)
        return;
    return (
        <button className="button-table" onClick={() => {setTableState(1)}}>{realToken.followers.length}</button>
    )
}

function renderFollowingButton(realToken, setTableState) {
    if(realToken.following == undefined)
        return;
    return (
        <button className="button-table" onClick={() => {setTableState(2)}}>{realToken.following.length}</button>
    )
}
 
function renderPage(tableState, setTableState, realToken, setRealToken, followersList, followingList)
{
    if(realToken == undefined)
        return;
    return (
        <div className="prof table1">
                <table className="table-in-style table2">
                    <tr>
                        <td>
                            First Name :
                        </td>
                        <td id="fname">
                            {realToken.fname}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Last Name :
                        </td>
                        <td id="lname">
                            {realToken.lname}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Username :
                        </td>
                        <td id="uname">
                            {realToken.username}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Email ID :
                        </td>
                        <td id="email">
                            {realToken.email}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Age :
                        </td>
                        <td id="age">
                            {realToken.age}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Contact No. :
                        </td>
                        <td id="pno">
                            {realToken.contact}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Followers :
                        </td>
                        <td>
                            {renderFollowersButton(realToken, setTableState, followersList)}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Following :
                        </td>
                        <td>
                            {renderFollowingButton(realToken, setTableState, followingList)}
                        </td>
                    </tr>
                </table>
                {renderSideTable(tableState, setTableState, realToken, followersList, followingList)}
            </div>
    )
}

function updateProfile(realToken, setRealToken, setChangeNow, changeNow) {
    let fname = document.getElementById("fnameedit").value;
    let lname = document.getElementById("lnameedit").value;
    let age = document.getElementById("ageedit").value;
    let contact = document.getElementById("contactedit").value;
    let pass = document.getElementById("passedit").value;
    let userid = localStorage.getItem("token_store")
    axios.post('http://localhost:8000/updateProfile', {
        fname:fname,
        lname:lname,
        age:age,
        contact:contact,
        password:pass,
        userid:userid
    })
    .then((response) => {
        setChangeNow(changeNow+1)
        console.log(response)
        axios.post('http://localhost:8000/decode', {
            token: localStorage.getItem("AuthToken")
            })
            .then((response2) => {
                setRealToken(response2.data)
                localStorage.setItem("token_store", response2.data.decode)
            })
    })
}

function renderEditProfile(realToken, setRealToken, editProfile, setChangeNow, changeNow) {
    if(editProfile == false)
        return;
    return (
       <div>
            <label>First Name : </label><br />
            <input type="text" id="fnameedit" name="fnameedit" className="input1"/><br />
            <label>Last Name : </label><br />
            <input type="text" id="lnameedit" name="lnameedit" className="input1"/><br />
            <label>Age : </label><br />
            <input type="text" id="ageedit" name="ageedit" className="input1"  /><br />
            <label>Contact Number : </label><br />
            <input type="text" id="contactedit" name="contactedit" className="input1" /><br />
            <label>Password : </label><br />
            <input type="password" id="passedit" name="passedit" className="input1" /><br />
            <button type="button" onClick={() => {updateProfile(realToken, setRealToken, setChangeNow, changeNow)}}>SAVE EDIT</button>
       </div> 
    )
}

export default function UserProfile() {
    const [tableState, setTableState] = useState(0)
    const [realToken, setRealToken] = useState(0)
    const [editProfile, setEditProfile] = useState(false)
    const [changeNow, setChangeNow] = useState(0)
    const [followersList, setFollowersList] = useState([])
    const [followingList, setFollowingList] = useState([])
    useEffect(() => {
        if(localStorage.getItem("isLoggedIn") == 0)
        {
            window.location.replace('/auth');
        }
        axios.post('http://localhost:8000/decode', {
            token: localStorage.getItem("AuthToken")
            })
            .then((response) => {
                setRealToken(response.data)
                localStorage.setItem("token_store", response.data.decode)
                console.log(response.data)
                let temp1 = []
                let temp2 = []
                for(let i=0;i<response.data.followers.length;i++)
                {
                    axios.post('http://localhost:8000/getUser', {
                        userid:response.data.followers[i]
                    })
                    .then((response2) => {
                        let temp11 = [response2.data._id, response2.data.username]
                        // console.log(temp11)
                        temp1.push(temp11)
                        setFollowersList(temp1)
                        // console.log(temp1)
                    })
                }
                for(let j=0;j<response.data.following.length;j++)
                {
                    axios.post('http://localhost:8000/getUser', {
                        userid:response.data.following[j]
                    })
                    .then((response3) => {
                        let temp22 = [response3.data._id, response3.data.username]
                        temp2.push(temp22)
                        setFollowingList(temp2)
                    })
                }
            })
    }, [changeNow]);
    console.log(followersList)
    console.log(followingList)
    return (
        <div>
            {MyNavBar(0)}
            <h1><center>Profile Page</center></h1>
            <button onClick={() => logout()} className="button3 button4">LOGOUT</button>
            {renderPage(tableState, setTableState, realToken, setRealToken, followersList, followingList)}
            <button onClick={() => {setEditProfile(!editProfile)}}>EDIT PROFILE</button>
            {renderEditProfile(realToken, setRealToken, editProfile, setChangeNow, changeNow)}
        </div>
    );
}