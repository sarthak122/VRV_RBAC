import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Home = () => {

  const navigate = useNavigate();
  const initialData = {
    username:'',
    email:'',
    role:''
  }

  const [user,setUser] = useState(initialData);

  useEffect( () => {
    const localStorageData = localStorage.getItem('user');
    const {username,email,role} = JSON.parse(localStorageData);
    setUser({username,email,role})
   
  },[])
  
    const handleLogout = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/auth/logout', { withCredentials: true });
        if (res.data.success) {
            localStorage.removeItem('user');
            navigate("/login");
            toast.success(res.data.message);
        }
    } catch (error) {
        toast.error(error.response.data.message);
    }
    }
    return (
        <>

    <div class="min-w-screen min-h-screen bg-white-900 flex items-center justify-center px-5 py-5">
    <div class="bg-indigo-600 text-white rounded shadow-xl py-5 px-5 w-full lg:w-10/12 xl:w-3/4">
        <div class="flex flex-wrap -mx-3 items-center">
            <div class="w-full sm:w-1/2 md:w-2/4 px-3 text-left">
                <div class="p-5 xl:px-8 md:py-5">
                    <h3 class="text-2xl">Welcome, {user.username}</h3>
                    <h5 class="text-xl mb-3">Lorem ipsum sit amet</h5>
                    <p class="text-sm text-indigo-200">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro sit asperiores perferendis odit enim natus ipsum reprehenderit eos eum impedit tenetur nemo corporis laboriosam veniam dolores quos necessitatibus, quaerat debitis.</p>
                </div>
            </div>
            <div class="w-full sm:w-1/2 md:w-1/4 px-3 text-center">
                <div class="p-5 xl:px-8 md:py-5">
                {user && user.role=='Admin' ? 
                   <Link class="block w-full py-2 px-4 rounded text-indigo-600 bg-gray-200 hover:bg-white hover:text-gray-900 focus:outline-none transition duration-150 ease-in-out mb-3" to="/admin">Go to admin page</Link> 
                  :
                  ''
                }
                   
                    <button class="w-full py-2 px-4 rounded text-white bg-indigo-900 hover:bg-gray-900 focus:outline-none transition duration-150 ease-in-out" onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </div>
    </div>
</div>

    
        </>
      )
}