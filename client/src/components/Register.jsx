import axios from "axios";
import { useState } from "react";


const Register = () => {

    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState(''); // to display error message


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const signupResponse = await axios.post('http://localhost:3001/v1/user/new', {
                username: username,
                firstname: firstName,
                lastname: lastName,
                password: password,

            });

            if(signupResponse.status === 201){

                setMessage('User registered successfully');
                //clear input fields
            }else{
                setMessage('User registration failed');
            }
        }catch(err){
            console.log(err);
        }
    
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <h2 className="mx-auto text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 sm:w-full sm:max-w-sm">Register</h2>
            <p className="mt-2 text-center text-sm leading-5 text-gray-600">Already have an account? <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150">Login</a></p>
            <form className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={handleSubmit}>
                <div className="space-y-6">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div className="mt-2">
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        value={username}
                        onChange={e => setUser(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-gray-900">First Name</label>
                    <div className="mt-2">
                    <input
                        id="firstname"
                        name="firstname"
                        type="text" // Corrected type from "firstname" to "text"
                        autoComplete="given-name"
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-gray-900">Last Name</label>
                    <div className="mt-2">
                    <input
                        id="lastname"
                        name="lastname"
                        type="text" // Corrected type from "lastname" to "text"
                        autoComplete="family-name"
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>

                <div>
                    <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                    >
                    Register
                    </button>
                </div>
                </div>
            </form>

            <div className="mt-6 text-center">
                {message ? (
                <p className="text-sm text-gray-600">{message}</p> // Adjusted class for message display
                ) : (
                <p className="text-sm text-red-600">{message}</p> // Adjusted class for error message display
                )}
            </div>
        </div>
    );
}


 
export default Register;