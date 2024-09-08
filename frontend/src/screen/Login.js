import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom';
export default function Login() {
    const [credentials, setCredentials] = useState({
        
        email: "",
        password: ""
      });
      let navigate=useNavigate()
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/loginuser", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password
          })
        });
        const json = await response.json();
        console.log(json);
    
        if (!json.success) {
          alert("Enter valid credentials");
        }
        if (json.success) {
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"))
          navigate("/");
        }
      };
    
      const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
      };
  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          
          <button type="submit" className="m-3 btn btn-success">Login</button>
          <Link to="/signup" className='m-3 btn btn-danger'>Go to Singup</Link>
        </form>
      </div>
    </div>
  )
}
