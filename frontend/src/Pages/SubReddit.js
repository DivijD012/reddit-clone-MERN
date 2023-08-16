import React, { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';
import MyNavBar from "./navbar"
import FuzzySeach from "fuzzy-search"

function searchReddit(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined) {
    axios.post("http://localhost:8000/searchReddit", {
        search : "test"
    })
    .then((response) => {
        // console.log("HI")
        // console.log(response);
        const searcher = new FuzzySeach(response.data, ['name']);
        var search = document.getElementById("search").value;
        let userid = localStorage.getItem("token_store");
        const result = searcher.search(search);
        console.log(result);
        var temp_joined = []
        var temp_not_joined = []
        for(let i =0;i<result.length;i++)
        {
            let x = 0;
            for(let j=0;j<result[i].members.length;j++)
            {
                console.log(userid)
                console.log(result[i].members[j])
                if(userid == result[i].members[j])
                {
                    temp_joined = temp_joined.concat(result[i])
                    x = 1;
                    break;
                }
            }
            for(let j=0;j<result[i].membersBlocked.length;j++)
            {
                console.log(userid)
                console.log(result[i].members[j])
                if(userid == result[i].membersBlocked[j])
                {
                    temp_joined = temp_joined.concat(result[i])
                    x = 1;
                    break;
                }
            }
            if(x==0)
                temp_not_joined = temp_not_joined.concat(result[i])
        }
        console.log(temp_joined);
        console.log(temp_not_joined);
        setSearchJoined(temp_joined);
        setSearchNotJoined(temp_not_joined);
    })
}

function searchByTagsReddit(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined) {
    axios.post("http://localhost:8000/searchReddit", {
        search : "test"
    })
    .then((response) => {
        // console.log("BYE")
        // console.log(response);
        let search = document.getElementById("searchByTags").value;
        search = search.split(",")
        for(let i=0;i<search.length;i++)
        {
            search[i] = search[i].trim();
        }
        // console.log(search)
        let userid = localStorage.getItem("token_store");
        let result = Array.from(response.data);
        // console.log(result)
        // console.log(response.data)
        console.log(search)
        for(let i=0;i<response.data.length;i++)
        {
            let flagger = 0;
            for(let j=0;j<response.data[i].tags.length;j++)
            {
                // console.log(search[k])
                for(let k=0;k<search.length;k++)
                {
                    // console.log(search[k])
                    if(response.data[i].tags[j] == search[k])
                    {
                        flagger = 1;
                        break;
                    }
                }
                if(flagger == 1)
                    break;
            }
            if(flagger == 0)
            {
                response.data.splice(i, 1);
            }
        }
        // console.log(result);
        let temp_joined = []
        let temp_not_joined = []
        for(let i =0;i<response.data.length;i++)
        {
            let x = 0;
            for(let j=0;j<response.data[i].members.length;j++)
            {
                // console.log(userid)
                // console.log(result[i].members[j])
                if(userid == response.data[i].members[j])
                {
                    temp_joined = temp_joined.concat(response.data[i])
                    x = 1;
                    break;
                }
            }
            for(let j=0;j<response.data[i].membersBlocked.length;j++)
            {
                // console.log(userid)
                // console.log(result[i].members[j])
                if(userid == response.data[i].membersBlocked[j])
                {
                    temp_joined = temp_joined.concat(response.data[i])
                    x = 1;
                    break;
                }
            }
            if(x==0)
                temp_not_joined = temp_not_joined.concat(response.data[i])
        }
        // console.log(temp_joined);
        // console.log(temp_not_joined);
        setSearchJoined(temp_joined);
        setSearchNotJoined(temp_not_joined);
    })
}

function leaveReddit(index, searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined, changeNow, setChangeNow) {
    let userid = localStorage.getItem("token_store");
    let temp = []
    for(let i = 0;i<searchJoined.length;i++)
    {
        console.log(index)
        if(i==index)
        {
            axios.post('http://localhost:8000/getMembers', {
                pageid:searchJoined[index]._id
            })
            .then((response) => {
                if(userid == response.data.userid)
                {
                    alert("You can't leave your own GReddiit page")
                    window.location.reload()
                    return;
                }
                console.log(response)
                let copy = []
                let count = response.data.num_follows
                copy.push(...response.data.members);
                for(let j=0;j<copy.length;j++)
                {
                    if(copy[j] == userid)
                    {
                        copy.splice(j, 1);
                    }
                }
                console.log(copy)
                setSearchNotJoined(searchNotJoined.concat(searchJoined[i]))
                axios.post('http://localhost:8000/leaveReddit', {
                    userid:userid,
                    pageid:searchJoined[i]._id,
                    array:copy,
                    count:count
                })
                .then((response) => {
                    console.log(response);
                    setChangeNow(changeNow + 1)
                })
            })
        }
        else {
            temp = temp.concat(searchJoined[i])
        }
    }
    console.log(temp);
    setSearchJoined(temp);
}

function joinReddit(index, searchNotJoined) {
    let userid = localStorage.getItem("token_store");
    let flag = true;
    for(let i = 0;i<searchNotJoined.length;i++)
    {
        console.log(index)
        if(i==index)
        {
            axios.post('http://localhost:8000/getMembers', {
                pageid:searchNotJoined[index]._id
            })
            .then((response) => {
                console.log(response.data.membersLeft)
                for(let j=0;j<response.data.membersLeft.length;j++)
                {
                    if(userid == response.data.membersLeft[i])
                    {
                        flag = false;
                        alert("You can't apply to join this GReddiit again")
                    }
                }
                if(flag)
                {
                    axios.post('http://localhost:8000/joinRequest', {
                        userid:userid,
                        pageid:searchNotJoined[i]._id
                    })
                    .then((response1) => {
                        console.log(response1);
                    })
                }
            })
        }
    }
}

function openReddit(index, searchJoined) {
    window.location.replace("/greddiit/" + searchJoined[index]._id);
}

function sortAsc(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined) {
    let copyJoined = []
    copyJoined.push(...searchJoined)
    let copyNotJoined = []
    copyNotJoined.push(...searchNotJoined)
    copyJoined.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    copyNotJoined.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
      });
    setSearchJoined(copyJoined)
    setSearchNotJoined(copyNotJoined)
}
function sortDesc(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined) {
    let copyJoined = []
    copyJoined.push(...searchJoined)
    let copyNotJoined = []
    copyNotJoined.push(...searchNotJoined)
    copyJoined.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
    copyNotJoined.sort(function(a, b){
        let x = a.name.toLowerCase();
        let y = b.name.toLowerCase();
        if (x < y) {return 1;}
        if (x > y) {return -1;}
        return 0;
      });
    setSearchJoined(copyJoined)
    setSearchNotJoined(copyNotJoined)
}

function sortFollow(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined) {
    let copyJoined = []
    copyJoined.push(...searchJoined)
    let copyNotJoined = []
    copyNotJoined.push(...searchNotJoined)
    console.log(copyJoined)
    copyJoined.sort(function(a, b){
        return b.num_follows - a.num_follows;
      });
    copyNotJoined.sort(function(a, b){
        return b.num_follows - a.num_follows;
      });
    setSearchJoined(copyJoined)
    setSearchNotJoined(copyNotJoined)
}

function sortDate(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined) {
    let copyJoined = []
    copyJoined.push(...searchJoined)
    let copyNotJoined = []
    copyNotJoined.push(...searchNotJoined)
    console.log(copyJoined)
    copyJoined.sort(function(a, b){
        return b.time - a.time;
      });
    copyNotJoined.sort(function(a, b){
        return b.time - a.time;
      });
    setSearchJoined(copyJoined)
    setSearchNotJoined(copyNotJoined)
}

export default function SubReddit() {
    const [searchJoined, setSearchJoined] = useState([])
    const [searchNotJoined, setSearchNotJoined] = useState([])
    const [changeNow, setChangeNow] = useState(0)
    useEffect(() => {
            searchReddit(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)
    }, [changeNow]);
    return (
        <div>
            {MyNavBar(0)}
            <label>Search : </label><br />
            <input type="text" id="search" name="search" className="input1" /><br />
            <button onClick={() => searchReddit(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)}id="search" type="button">SEARCH</button>
            <button onClick={() => sortAsc(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)} id="sortAsc" type="button">SORT BY ASCENDING ORDER</button>
            <button onClick={() => sortDesc(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)} id="sortDesc" type="button">SORT BY DESCENDING ORDER</button><br />
            <button onClick={() => sortFollow(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)} id="sortFollow" type="button">SORT BY FOLLOWERS</button><br />
            <button onClick={() => sortDate(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)} id="sortDate" type="button">SORT BY CREATION DATE</button><br />
            <label>Search by Tags : </label><br />
            <input type="text" id="searchByTags" name="searchByTags" className="input1" /><br />
            <button onClick={() => searchByTagsReddit(searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined)} id="searchbyTags" type="button">SEARCH By Tags</button>
            <div id="list" className="font1">
            {
                searchJoined.map((some, index) => (
                    <div>
                        <br />
                        <br />
                        Index : {1 + index} <br />
                        Name : {some.name} <br />
                        Description : {some.description} <br />
                        Number of People : {some.num_follows} <br />
                        Number of Posts : {some.num_posts} <br />
                        Banned Keywords : {some.banned_keywords.join(", ")} <br />
                        <button onClick={() => leaveReddit(index, searchJoined, setSearchJoined, searchNotJoined, setSearchNotJoined, changeNow, setChangeNow)}>LEAVE</button>
                        <button onClick={() => openReddit(index++, searchJoined)}>OPEN</button>
                    </div>
            ))}
            </div>
            <div id="notList" className="font2">
            {
                searchNotJoined.map((some, index) => (
                    <div>
                        <br />
                        <br />
                        Index : {1 + searchJoined.length + index} <br />
                        Name : {some.name} <br />
                        Description : {some.description} <br />
                        Number of People : {some.num_follows} <br />
                        Number of Posts : {some.num_posts} <br />
                        Banned Keywords : {some.banned_keywords.join(", ")} <br />
                        <button onClick={() => joinReddit(index, searchNotJoined)}>JOIN</button>
                    </div>
            ))}
            </div>
        </div>
    )
}