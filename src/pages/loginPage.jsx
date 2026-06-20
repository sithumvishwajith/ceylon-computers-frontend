import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginPage(){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    function handleLogin(){
        console.log("Email: ", email);
        console.log("Password: ", password)

        axios.post(import.meta.env.VITE_API_URL + "/users/login",{
            email,
            password
        }).then((response)=>{
            console.log("Login Successful: ", response.data)
        }).catch((error)=>{
            console.error("Login failed: ", error)
        })
    }

    return(
        <div className="w-full h-screen flex justify-center items-center bg-[url('login-bg.jpg')] bg-center bg-cover">
            <div className="w-1/2 h-full ">
            </div>
            <div className="w-1/2 h-full flex justify-center items-center">
                <div className="w-[400px] h-[500px] backdrop-blur-sm rounded-xl shadow-2xl flex flex-col justify-center items-center">
                    <h1 className="text-4xl font-bold mb-8 text-secondary">Sign in</h1>
                    <input
                        onChange={
                            (e)=>{
                                setEmail(e.target.value)
                            }
                        }
                        value={email} 
                        type="text" 
                        placeholder="Email" 
                        className="w-3/4 p-3 mb-6 rounded-lg border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    <input
                        onChange={
                            (e)=>{
                                setPassword(e.target.value)
                            }
                        }
                        value={password}
                        type="password" 
                        placeholder="Password" 
                        className="w-3/4 p-3 rounded-lg border border-secondary focus:outline-none focus:ring-2 focus:ring-secondary"/>
                    <p className="mb-6 w-3/4 text-right text-secondary">
                        Forget password? Click <Link to="/forgot-password" className="text-accent hover:underline">here</Link>
                    </p>
                    <button onClick={handleLogin} className="w-3/4 p-3 bg-accent text-white rounded-lg mb-6">
                        Sign in
                    </button>
                    <p className="mb-6 w-3/4 text-center text-secondary">
                        Don't have an account? <Link to="/register" className="text-accent hover:underline">Register</Link>
                    </p>

                </div>
            </div>
        </div>
    )
}