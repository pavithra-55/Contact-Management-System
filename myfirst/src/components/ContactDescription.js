import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import user1 from "../images/businessman.png"

const ContactDetails = (props) => {
    const { name, email } = props.location.state.contact;
    // console.log(props);
    return (
        <div className="main" style={{paddingTop:'5rem'}}>
            <div className="ui card centered">
                <div className="image">
                    <img src={user1} alt="user"/>
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}<br />
                    <p className="ui floating message"><strong><i>Lorem Ipsum</i></strong> is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                    </div>

                </div>
            </div>
            <div className="center-div">
                <Link to='/'>
                    <button className="ui large primary button">Back to List page</button>
                </Link>
            </div>
         </div>
    );
}

export default ContactDetails;