import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
export const Login = () => {

    const [cred, setcred] = useState({ email: '', password: "" });
    const [error, setError] = useState('');
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/loginuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: cred.email, 
                    password: cred.password 
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
            if (json.success) {
                localStorage.setItem("userEmail",cred.email);
                localStorage.setItem("authToken",json.authToken);
                console.log(localStorage.getItem("authToken"))
                navigate("/")
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
                <button type="submit" className="btn btn-success">Submit</button>
                <Link to="/creatuser" className="m-3 btn btn-danger">I'm  a user</Link>
            </form>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    )
}
