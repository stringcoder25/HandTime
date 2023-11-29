import { useState } from "react"
import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState({
    mobile: "",
    password: ""
  })
  // const[resData,setResData]= useState()

  function getInput(e) {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }

  function formSubmit(e){
    e.preventDefault()
    let data = JSON.parse(localStorage.getItem('users'))

    let res = data?.find((item)=>item.mobile===userData.mobile && item.password ===userData.password)
    if(res?.name?.length){
     localStorage.setItem('id',res.mobile)
     toast.success('login success')
     navigate("/")
    }else{
      toast.error("invalid login id and password")
    }

  }

  // function formSubmit(e){
  //  e.preventDefault()
  //   let data = JSON.stringify(userData)
  //   fetch("http://apps.codebetter.in:8082/clinic/auth/login",{
  //     method:"post",
  //     headers:{
  //       'Content-Type':'application/json'
  //       // 'Authorization':`Bearer ${}`
  //     },
  //     body:data
  //   }).then(res=>res.json()).then(data=>{
  //     if(data.status){
  //       setResData(data)
  //       navigate("/")
  //     }
      
  //   }).catch(e=>console.log(e))
  // }
console.log(userData);


  return (
    <>
      <div className="wrapper">
        <ToastContainer/>
        <div>
          {/* <div className="title-text">
          <div className="title login">Login </div>
          <div className="title signup">Signup </div>
        </div> */}
          <div className="form-container">
            <div className="slide-controls">
              <input type="radio" name="slide" id="login" defaultChecked />
              <input type="radio" name="slide" id="signup" />
              <label  className="slide login">Login</label>
              <label className="slide signup">Signup</label>
              <div className="slider-tab"></div>
            </div>
            <div className="form-inner">
              <form className="login" onSubmit={formSubmit}>
                <div className="field">
                  <input type="tel" placeholder="Mobile No." name="mobile" onChange={getInput} required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Password" onChange={getInput} name="password" required />
                </div>
                <div className="pass-link"><a href="#">Forgot password?</a></div>
                <div className="field btn">
                  <div className="btn-layer"></div>
                  <input type="submit" value="Login" />
                </div>
                <div className="signup-link">Not a member? <Link to="/signup">Signup now</Link></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}