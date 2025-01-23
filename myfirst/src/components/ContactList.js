import React, { useRef } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import CardContact from "./Contactcard";

const ContactList = (props) => {
    console.log(props);
    const inputEl = useRef("");
    const deleteContactHandler = (id) => {
        props.getContactId(id);
    };
    // console.log(props);
    const getSearchTerm = () => {
        // console.log(inputEl.current.value);
        props.searchKeyword(inputEl.current.value);
    }
    const renderedContactList = props.contacts.map((contact) => {
        return <CardContact contact={contact} clickHandler={deleteContactHandler} key={ contact.id} />
});
    return (
        <div className="main" style={{paddingTop:'5rem'}}>
            <h2 >Contact List
                <Link to='/add'>
                    <button className="ui button blue right floated">Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input type="text" placeholder="Search Contacts" ref={ inputEl } className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="sistrix icon"></i>
                    
                </div>
            </div>
            <br />
            <div className="ui celled list ">
                {renderedContactList.length > 0 ? renderedContactList : <span className='ui tertiary inverted segment'>There is no contact available now!!!</span>}
            </div>
        </div>
    );
}
export default ContactList;