import '../index.css';
import MyNavBar from "./navbar"
import React, { useEffect, useState } from "react";
import axios from "axios";

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

function unsave(index, setPosts, posts, setChangeNow, changeNow) {
    let userid = localStorage.getItem("token_store");
    axios.post('http://localhost:8000/getUser', {
        userid:userid
    })
    .then((response) => {
        console.log(response)
        let temp = []
        let copy = []
        copy.push(...posts)
        copy.splice(index, 1)
        for(let i=0;i<response.data.savedPosts.length;i++)
        {
            if(response.data.savedPosts[i] == posts[index]._id)
                continue;
            else
                temp = temp.concat(response.data.savedPosts[i]);
        }
        axios.post('http://localhost:8000/unsavePost', {
            userid:userid,
            array:temp
        })
        .then((response2) => {
            console.log(response2);
            setChangeNow(changeNow + 1)
        })
        setPosts(copy);
    })
}


export default function SavedPosts() {
    const [posts, setPosts] = useState([])
    const [changeNow, setChangeNow] = useState(0)

    useEffect(() => {
        let userid = localStorage.getItem("token_store");
        axios.post('http://localhost:8000/getUser', {
            userid:userid
        })
        .then((response) => {
            // console.log(response)
            let x = []
            for(let i=0;i<response.data.savedPosts.length;i++)
            {
                axios.post('http://localhost:8000/getPostData', {
                    postid:response.data.savedPosts[i]
                })
                .then((response2) => {
                    // console.log(response2);
                    x = x.concat(response2.data)
                    setPosts(x)
                })
            }
        })
    }, []);
    console.log(posts);
    return (
        <div>
            {MyNavBar(0)}
            <div id="list">
            {
                posts.map((some, index) => (
                    <div>
                        {index + 1}<br />
                        Post : {some.text} <br />
                        Posted By : {some.postedByName} <br />
                        Posted In : {some.postedInName} <br />
                        Upvotes : {some.upvotes} <br />
                        Downvotes : {some.downvotes} <br />
                        <button onClick={() => upvote(index, posts, setChangeNow, changeNow)}>UPVOTE</button>
                        <button onClick={() => downvote(index, posts, setChangeNow, changeNow)}>DOWNVOTE</button> <br />
                        <label>Comment : </label><br />
                        <input type="text" id={"comment" + index} name="comment" className="input1" /><br />
                        <button onClick={() => comment(index, posts, setChangeNow, changeNow)}>COMMENT</button> <br />
                        <button onClick={() => unsave(index, setPosts, posts, setChangeNow, changeNow)}>UNSAVE</button> <br />
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