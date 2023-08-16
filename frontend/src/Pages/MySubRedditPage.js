import React, { useEffect, useState } from "react";
import axios from "axios";
import '../index.css';
import MyNavBar from "./navbar"

function createReddit(changeNow, setChangeNow) {
    console.log("HEYYEY")
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let tags = document.getElementById("tags").value;
    tags = tags.split(",");
    for(let i=0;i<tags.length;i++)
    {
        tags[i] = tags[i].trim();
        console.log(tags[i])
    }
    let banned_keywords = document.getElementById("banned_keywords").value;
    banned_keywords = banned_keywords.split(",");
    for(let i=0;i<banned_keywords.length;i++)
    {
        banned_keywords[i] = banned_keywords[i].trim();
        console.log(banned_keywords[i])
    }
    axios.post('http://localhost:8000/cReddit', {
            userid:localStorage.getItem("token_store"),
            name:name,
            description:description,
            tags:tags,
            banned_keywords:banned_keywords,
            num_follows:"1",
            num_posts:"0"
          })
          .then(function (response) {
            // console.log(response);
            if(response.data.success == true)
            {
                console.log("HHEHEH")
                setChangeNow(changeNow+1)
                // alert("Created successfully!")
                // window.location.reload();
            }
            else
                return;
            })
          .catch(function (error) {
            console.log(error);
          });
          
}


function renderForm(formOpen, changeNow, setChangeNow) {
    if(formOpen == false)
        return;
    else
        return (
            <div>
                <label>Name : </label><br />
                <input type="text" id="name" name="name" className="input1" /><br />
                <label>Description : </label><br />
                <input type="text" id="description" name="description" className="input1" /><br />
                <label>Tags (Seperate them by comma) : </label><br />
                <input type="text" id="tags" name="tags" className="input1" /><br />
                <label>Banned Keywords (Seperate them by comma) : </label><br />
                <input type="text" id="banned_keywords" name="banned_keywords" className="input1" /><br />
                <button onClick={() => createReddit(changeNow, setChangeNow)}>SUBMIT</button>
            </div>
        )
}

function deleteReddit(index, data, setData)
{
    let temp  = []
    for(let i = 0;i<data.length;i++)
    {
        if(i != index)
        {
            temp = temp.concat(data[i])
        }
        else
        {
            axios.post('http://localhost:8000/cascadeDeletePosts', {
                pageid:data[i]._id
            })
            .then((response) => {
                console.log(response);
                axios.get('http://localhost:8000/user', {

                })
                .then((response2) => {
                    console.log(response2)
                    for(let i =0;i<response2.data.length;i++)
                    {   
                        let x = []
                        for(let j=0;j<response2.data[i].savedPosts.length;j++)
                        {
                            let flag = 0;
                            for(let k =0;k<response.data.length;k++)
                            {
                                if(response.data[k]._id == response2.data[i].savedPosts[j])
                                {
                                    flag = 1;
                                    break;
                                }
                            }
                            if(flag == 0)
                            {
                                console.log(response2.data[i].savedPosts[j])
                                x.push(j)
                            }
                        }
                        for(let j = x.length-1;j>=0;j--)
                        {
                            response2.data[i].savedPosts.splice(x[j], 1);
                        }
                        axios.post('http://localhost:8000/unsavePost', {
                            userid:response2.data[i]._id,
                            array:response2.data[i].savedPosts
                        })
                        .then((response3) => {
                            console.log(response3);
                        })
                    }
                })
            })
            axios.post('http://localhost:8000/deleteReddit', {
            postid:data[i]._id
        })
        }
    }
    setData(temp);
    // console.log(data);
}

function openReddit(index, data) {
    window.location.replace("/mygreddiit/" + data[index]._id);
}

export default function MyRedditFunction (props) {
    const [data, setData] = useState([]);
    const [changeNow, setChangeNow] = useState(0);
    useEffect(() => {
        // console.log(changeNow)
        axios.post('http://localhost:8000/getReddit', {
            userid:localStorage.getItem("token_store")
        })
        .then((response) => {
            // console.log(response.data)
            let temp = [];
            for(let i = 0;i<response.data.length;i++)
            {   
                temp = temp.concat(response.data[i]);
            }
            setData(temp);
        })
    }, [changeNow]);
    // console.log("id = ", data);
    const [formOpen, setFormOpen] = useState(false);
    // console.log(formOpen);
    return (
        <div>
            {MyNavBar(0)}
            {renderForm(formOpen, changeNow, setChangeNow)}
            <button onClick={() => {setFormOpen(!formOpen)}}>CREATE REDDIT PAGE</button>
            <div id="list">
            {
                data.map((some, index) => (
                    <div>
                        Index : {1 + index} <br />
                        Name : {some.name} <br />
                        Description : {some.description} <br />
                        Number of People : {some.num_follows} <br />
                        Number of Posts : {some.num_posts} <br />
                        Banned Keywords : {some.banned_keywords.join(", ")} <br />
                        <button onClick={() => deleteReddit(index, data, setData)}>DELETE</button>
                        <button onClick={() => openReddit(index++, data)}>OPEN</button>
                    </div>
            ))}
            </div>
        </div>
    )
}