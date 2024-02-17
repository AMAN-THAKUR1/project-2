import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [cred, setcred] = useState({ name: '', email: '', password: '', geolocation: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/createuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: cred.name,
                    email: cred.email, 
                    password: cred.password, 
                    location: cred.geolocation 
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                setError('Invalid data entered');
            }
        } catch (error) {
            console.error('Error:', error.message);
            setError('Failed to submit data. Please try again later.');
        }
    };

    const handleChange = (event) => {
        setcred({ ...cred, [event.target.name]: event.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" placeholder="Enter name" name="name"
                        value={cred.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
                        name="email" value={cred.email} onChange={handleChange} />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
                        name="password" value={cred.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input type="text" className="form-control" id="address" placeholder="Address"
                        name="geolocation" value={cred.geolocation} onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}