
import { useEffect, useState } from "react"
import "./signup.css"
import { useNavigate } from "react-router-dom"
export default function Signup()
 {
    const navigate = useNavigate()
 
    const [user,setUser] = useState({
        name : "",
        mobile : "",
        password : ""
    })

    const[users,setUsers] = useState([])

    const [confirmPassword,setconfirmPassword]= useState(true)

    function getUserDetails(e){
      const {name, value} = e.target
       switch (name) {
        case "name":setUser({...user,[name]:value})
            
            break;
         case "mobile":setUser({...user,[name]:value})
            
            break;
        case "password":setUser({...user,[name]:value})
            
            break;
      default:setUser({...user,[name]:value})
    
       }
    }

    function checkPass(e){
        const confirm = e.target.value
        if(user.password === confirm){
            setconfirmPassword(true)
        }else{
            setconfirmPassword(false)
        }
     
    }

    function Submit(e){
        e.preventDefault()
        if(checkPass && user.name && user.mobile && user.password){
            users.push(user)
            localStorage.setItem('users',JSON.stringify(users))
            e.target.reset()
            navigate("/login")
        }

    }

    console.log(user);

    useEffect(()=>{
      let data = JSON.parse(localStorage.getItem('users'))
      setUsers(data?.length?data:[])
    },[])

    return (
        
            <div class="registration-form">
                {/* <h2>Sign Up</h2> */}
              <form onSubmit={Submit} >

                    <label for="name">Name:</label>
                    <input type="text" id="name" onChange={getUserDetails} name="name" required />


                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" onChange={getUserDetails} name="mobile" required />

                    <label for="password">Password:</label>
                    <input type="password" id="password" onChange={getUserDetails} name="password" required/>

                        <label for="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirmcheckPass-password" onChange={checkPass} name="confirm-password" required/>
                        {!confirmPassword?<h4 className="text-danger">password is not match</h4>:""}

                            <input type="submit" value="Register"/>
              </form>
                 </div>           
                   
                    )
}