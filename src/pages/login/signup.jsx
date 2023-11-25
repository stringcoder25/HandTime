
import "./signup.css"
export default function Signup()
 {
    return (
        
            <div class="registration-form">
                {/* <h2>Sign Up</h2> */}
              <form >

                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required />

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required />

                    <label for="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" required />

                    <label for="password">Password:</label>
                    <input type="password" id="password" name="password" required/>

                        <label for="confirm-password">Confirm Password:</label>
                        <input type="password" id="confirm-password" name="confirm-password" required/>

                            <input type="submit" value="Register"/>
              </form>
                 </div>           
                   
                    )
}