import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS

const API_URL = 'https://betest-a4e0d0euefhegmbn.canadacentral-01.azurewebsites.net/contacts'; // Correct API URL

function App() {
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    // Fetch contacts
    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get(API_URL);
            setContacts(response.data);
        } catch (error) {
            console.error("Error fetching contacts:", error);
            alert("Failed to fetch contacts. Please check your backend.");
        }
    };

    // Add contact
    const addContact = async () => {
        if (!name || !phone) return alert("Please enter name and phone!");
        try {
            await axios.post(API_URL, { name, phone });
            fetchContacts();
            setName('');
            setPhone('');
        } catch (error) {
            console.error("Error adding contact:", error);
            alert("Failed to add contact. Please try again.");
        }
    };

    // Delete contact
    const deleteContact = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchContacts();
        } catch (error) {
            console.error("Error deleting contact:", error);
            alert("Failed to delete contact.");
        }
    };

    return (
        <div className="container">
            <h1>Contact Manager</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Phone" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                />
                <button className="add-button" onClick={addContact}>Add Contact</button>
            </div>
            <ul className="contact-list">
                {contacts.map(contact => (
                    <li key={contact.id} className="contact-item">
                        {contact.name} - {contact.phone}
                        <button className="delete-button" onClick={() => deleteContact(contact.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
