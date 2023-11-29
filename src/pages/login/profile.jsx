export default function Profile(){
    return(

    
<>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>User Profile Popup</title>
  {/* Trigger button */}
  <button onclick="openPopup()">Open Profile</button>
  {/* The overlay and popup container */}
  <div id="profilePopup" className="overlay">
    <div className="popup" style={{ textAlign: "center" }}>
      <span className="close" onclick="closePopup()">
        ×
      </span>
      {/* Profile content goes here */}
      <h2>User Profile</h2>
      <p>Name:</p>
      <p>Mobile no.</p>
      <button>logout</button>
      {/* Add more profile information as needed */}
    </div>
  </div>
</>
)
}
