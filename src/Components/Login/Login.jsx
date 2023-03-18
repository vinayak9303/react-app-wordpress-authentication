import React, {useState } from "react";
import Cookies from 'js-cookie';

import axios from 'axios';  
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	let navigate = useNavigate();
	const HandleLogin = (e) => {
		e.preventDefault();
		const options = {
			headers: {
			  "Access-Control-Allow-Origin": "*",
			  "Content-Type": "application/json",
			},
		  };
		const loginData = {
			username: username,
			password: password
		};
		axios
			.post('https://www.insaid.co/wp-json/jwt-auth/v1/token', loginData,options)
			.then((res) => {
				// console.log(res.data);
				// document.cookie = `wp-login=${res.data.token}; path=/`;
				
				Cookies.set('wp-login', `${res.data.token}`, {
					expires: 30, // Expires in 30 days
					path: '/',
					domain: 'https://www.insaid.co/', // Replace with your domain name
					secure: true,
					sameSite: 'none'
				  });
				  console.log(Cookies.get('wp-login')) ;
				// Redirect to the home page
				window.location.href = 'https://www.insaid.co/cookies-check.php';
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('user_nicename', res.data.user_nicename);
				localStorage.setItem('user_email', res.data.user_email);
				localStorage.setItem('user_display_name', res.data.user_display_name);
			})
			.catch((err) => {
				console.log(err);
			});
	};

   // console.log(sendData);
    return (
<>
<div >
				{/* {credentials.error && <p>{credentials.error}</p>} */}
				<h2>Login</h2>
				<form onSubmit={HandleLogin}>
					<input
					
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="username"
					/>
					<br />
					<input
						
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="password"
					/>
					<br />
					<button  type="submit">
						Login
					</button>
				</form>
			</div>
</>
      
    );

}