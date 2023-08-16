import React from "react";
import { Link } from "react-router-dom";

function renderMore(x, id) {
    if(x == 0)
        return;
    else if(x == 1) {
        const url = "/mygreddiit/" + id;
        return (
            <div>
                <Link to={url + "/users"} state={{ pageid: id }}>       USERS      </Link>
                <Link to={url + "/joiningRequest"} state={{ pageid: id }}>       JOINING REQUESTS      </Link>
                <Link to={url + "/stats"} state={{ pageid: id }}>       STATS      </Link>
                <Link to={url + "/reported"} state={{ pageid: id }}>       REPORTED      </Link>
            </div>
        )
    }
}

export default function MyNavBar (checkValue, id) {
    
    return (
        <div>
            <Link to="/profile">     PROFILE     </Link>
            <Link to="/mygreddiit">       MYSUBGREDDIIT      </Link>
            <Link to="/greddiit">       SUBGREDDIIT      </Link>
            <Link to="/saved">       SAVED POSTS      </Link>
            {renderMore(checkValue, id)}
        </div>
    )
}