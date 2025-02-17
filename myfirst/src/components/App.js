import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/contacts';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetails from './ContactDescription';
import { all } from 'axios';
import EditContact from './EditContact';


function App() {
   const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  //Retrive Contacts from api
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  }
  // const contacts = [
  //   {
  //     'id': 1,
  //     'name': 'Pranith',
  //     'email': 'prani@gmail.com'
  //   },
  //   {
  //     'id': 2,
  //     'name': 'Saravanan',
  //     'email': 'saro@gmail.com'
  //   },
  //   {
  //     'id': 1,
  //     'name': 'Pavithra',
  //     'email': 'pavi@gmail.com'
  //   }
  // ]
 
   const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuidv4,
      ...contact
    }

    const response = await api.post("/contacts", request);

    setContacts([...contacts, response.data]);
   };
  
  
  const updateContactHandler = async (contact) => {
    const response = await api.put(`/contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
};

  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts)
    }
  }
 useEffect(() => {
  // try {
  //   const getContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (Array.isArray(getContacts)) {
  //     setContacts(getContacts);
  //   }
  // } catch (error) {
  //   console.error("Failed to load contacts:", error);
    // }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
   getAllContacts();
}, []);

useEffect(() => {
  // if (contacts.length > 0) {
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }
}, [contacts]);

  return (

    <div className='ui container'>
      <Router>
        <Header />
        
        <Switch>
          <Route path="/" exact render={(props) => (<ContactList {...props} contacts={searchTerm.length < 1 ? contacts : searchResults} getContactId={removeContactHandler} term={searchTerm} searchKeyword={searchHandler} />)} />
          <Route path="/add" render={(props) => (<AddContact {...props} addContactHandler={addContactHandler} />)} />
          <Route path="/edit" render={(props) => (<EditContact {...props} updateContactHandler={updateContactHandler} />)} />
          <Route path="/contact/:id" component={ContactDetails} />
        {/* <Route path="/add"  component={AddContact} />

        <Route path="/" exact component={ContactList} /> */}
          
        
          

        </Switch>

      </Router>
      {/* <Header />
      <AddContact addContactHandler={addContactHandler} />
      <ContactList contacts={contacts} getContactId={removeContactHandler} /> */}
      </div>
  );
}

export default App;
