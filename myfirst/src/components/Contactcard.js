import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import user from "../images/user.png"

const CardContact = (props) => {
    const { id, name, email } = props.contact;
     return (
        
         <div className="item" style={{ marginTop: "7px", paddingTop:"5px"}}>
             <img className="ui avatar image" src={user} alt="user" />
             <div className="content" >  
                <Link to={{pathname:'/contact/${id}', state:{contact: props.contact}}}>
                    <div className="header">{name}</div>
                    <div>{email}</div>
                </Link>
             </div>
             
             <i className=" right floated trash alternate icon " style={{ color: "red", marginTop: "7px", marginLeft:"10px" }}
                 onClick={() => {
                     if (window.confirm(`Are you want to delete this (${name}) contact ?`)) {
                         props.clickHandler(id); 
                         alert("Deleted Successfully!!!");
                     } else {
                         alert("Action cancelled");
                    }
                }}
                //  onClick={() => { alert(`Are you want to delete this(${name}) contact`); props.clickHandler(id);}}
             ></i>
             <Link to={{pathname:'/edit', state:{contact: props.contact}}}>
                 <i className=" right floated edit alternate icon " style={{ color: "blue", marginTop: "7px" }}></i>
             </Link>
            
        </div>
    );
}

export default CardContact;