import { useState,useEffect } from 'react';
import '../index.css';
import axios from "axios"
import MyNavBar from "./navbar"
import reality from "./reality.jpg";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { height } from "@mui/system";

function createPost(pageData, setPageData, handleDisplay) {
    handleDisplay(true)
}

function renderInfo(pageData) {
    if(pageData == undefined)
        return;
    return (
        <div>
        Name : {pageData.name} <br />
        Description : {pageData.description} <br />
        </div>
    )
}

function submitPost(pageData, handleDisplay, setChangeNow, changeNow) {
    let posttext = document.getElementById("posttext").value;
    if(posttext == undefined || posttext == "")
        return;
    let userid = localStorage.getItem("token_store")
    // console.log(pageData)
    axios.post('http://localhost:8000/getUser', {
        userid:userid
    })
    .then((response) => {
        console.log(response)
        axios.post('http://localhost:8000/createPost', {
            pageid:pageData._id,
            pagename:pageData.name,
            userid:userid,
            username:response.data.username,
            posttext:posttext
        })
        .then((response2) => {
            console.log(response2);
            setChangeNow(changeNow + 1)
        })
    })
    handleDisplay(false);
}

function upvote(index, posts, setChangeNow, changeNow) {
    let userid = localStorage.getItem("token_store")
    console.log(posts[index])
    for(let i=0;i<posts[index].upvoteList.length;i++)
    {
        if(userid == posts[index].upvoteList[i])
            return;
    }
    axios.post('http://localhost:8000/upvotePost', {
        userid:userid,
        postid:posts[index]._id,
        count:posts[index].upvotes
    })
    .then((response)=> {
        console.log(response);
        setChangeNow(changeNow + 1)
    })
}

function downvote(index, posts, setChangeNow, changeNow) {
    let userid = localStorage.getItem("token_store")
    console.log(posts[index])
    for(let i=0;i<posts[index].downvoteList.length;i++)
    {
        if(userid == posts[index].downvoteList[i])
            return;
    }
    axios.post('http://localhost:8000/downvotePost', {
        userid:userid,
        postid:posts[index]._id,
        count:posts[index].downvotes
    })
    .then((response)=> {
        console.log(response);
        setChangeNow(changeNow + 1)
    }) 
}

function comment(index, posts, setChangeNow, changeNow) {
    let commentText = document.getElementById("comment" + index).value;
    if(commentText == undefined || comment == "")
        return;
    axios.post('http://localhost:8000/commentPost', {
         postid:posts[index]._id,
         text:commentText
    })
    .then((response) => {
        console.log(response);
        setChangeNow(changeNow + 1);
    })
}

function savePost(index, posts) {
    let userid = localStorage.getItem("token_store");
    axios.post('http://localhost:8000/getUser', {
        userid:userid
    })
    .then((response) => {
        console.log(response)
        for(let i=0;i<response.data.savedPosts.length;i++)
        {
            if(response.data.savedPosts == posts[index]._id)
            {
                return;
            }
        }
        axios.post('http://localhost:8000/savePost', {
            userid:userid,
            postid:posts[index]._id
        })
        .then((response2) => {
            console.log(response2);
        })
    })
}

function followUser(index, posts) {
    let userid = localStorage.getItem("token_store");
    let otheruserid = posts[index].postedById;
    axios.post('http://localhost:8000/getUser', {
        userid:userid
    })
    .then((response2) => {
        console.log(response2)
        let flag = 0
        for(let i=0;i<response2.data.following.length;i++)
        {
            if(response2.data.following[i] == otheruserid)
            {
                flag = 1;
                break;
            }
        }
        if(flag == 1)
            return;
        axios.post('http://localhost:8000/followUser', {
            userid:userid,
            otheruserid:otheruserid
        })
        .then((response1) => {
            console.log(response1);
        })
        axios.post('http://localhost:8000/followingUser', {
            userid:userid,
            otheruserid:otheruserid
        })
        .then((response3) => {
            console.log(response3);
        })
    })
}

function reportPost(index, posts) {
    let userid = localStorage.getItem("token_store")
    let otheruserid = posts[index].postedById;
    let complaint = document.getElementById("report"+index).value;
    axios.post('http://localhost:8000/getUser', {
        userid:userid
    })
    .then((response) => {
        axios.post('http://localhost:8000/createReport', {
            userid:userid,
            username:response.data.username,
            otheruserid : otheruserid,
            otherusername : posts[index].postedByName,
            redditid:posts[index].postedInId,
            redditname:posts[index].postedInName,
            text:posts[index].text,
            postid:posts[index]._id,
            complaint:complaint
        })
        .then((response2) => {
            console.log(response2);
        })
    })
}
 
export default function SubRedditPage() {
    var url = document.URL;
    url = url.split("/")
    url = url[4]
    const [openDialog, handleDisplay] = useState(false);
    const [pageid, setPageId] = useState(url)
    const [pageData, setPageData] = useState([])
    const [posts, setPosts] = useState([])
    const [changeNow, setChangeNow] = useState(0)
    const handleClose = () => {
        handleDisplay(false);
     };
    useEffect(() => {
        axios.post('http://localhost:8000/getMembers', {
            pageid:pageid
        })
        .then((response) => {
            setPageData(response.data);
            // console.log(pageData)
        })
        axios.post('http://localhost:8000/getAllPosts', {
            pageid:pageid
        })
        .then((response) => {
            setPosts(response.data)
        })
    }, [changeNow]);
    console.log(posts)
    // console.log(pageData)
    return (
        <div>
            {MyNavBar(0)}
            <img src={reality} alt="React Image" height = "150" width = "200"/> <br />
            {renderInfo(pageData)}
            <button onClick={() => createPost(pageData, setPageData, handleDisplay)}>CREATE POST</button>
            <Dialog onClose = {handleClose} open = {openDialog}>
            <DialogTitle> Demo Dialog </DialogTitle>
                <label>Enter text : </label><br />
                <input type="text" id="posttext" name="posttext" className="input1" /><br />
                <button onClick={() => submitPost(pageData, handleDisplay, setChangeNow, changeNow)}>CREATE</button>
            </Dialog>
            <div id="list">
            {
                posts.map((some, index) => (
                    <div>
                        {index + 1}<br />
                        Post : {some.text} <br />
                        Posted By : {some.postedByName} <br />
                        Upvotes : {some.upvotes} <br />
                        Downvotes : {some.downvotes} <br />
                        <button onClick={() => upvote(index, posts, setChangeNow, changeNow)}>UPVOTE</button>
                        <button onClick={() => downvote(index, posts, setChangeNow, changeNow)}>DOWNVOTE</button> <br />
                        <button onClick={() => savePost(index, posts)}>SAVE POST</button><br />
                        <button onClick={() => followUser(index, posts)}>FOLLOW</button><br />
                        <label>Report : </label><br />
                        <input type="text" id={"report" + index} name="report" className="input1" /><br />
                        <button onClick={() => reportPost(index, posts)}>REPORT</button><br />
                        <button onClick={() => comment(index, posts, setChangeNow, changeNow)}>COMMENT</button> <br />
                        Comments : <br />
                        {
                            some.comments.map((some2, index2) => {
                                return(
                                <div>
                                    {1 + index2++}
                                    {". " + some2} <br />
                                </div>
                                )
                            })
                        }
                    </div>
            ))}
            </div>
        </div>
    )
}