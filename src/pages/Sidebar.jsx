import React from "react";
import "./Sidebar.css";


function Sidebar({setPage}) {


return (

<div className="sidebar">


<div className="sideLogo">

🌾 Smart Farmer

</div>



<div 
className="menuItem"
onClick={()=>setPage("dashboard")}
>

🏠 Dashboard

</div>




<div 
className="menuItem"
onClick={()=>setPage("profile")}
>

👨‍🌾 Farmer Profile

</div>





<div 
className="menuItem"
onClick={()=>setPage("weather")}
>

🌦 Weather

</div>





<div 
className="menuItem"
onClick={()=>setPage("market")}
>

📈 Market Prices

</div>





<div 
className="menuItem"
onClick={()=>setPage("profit")}
>

💰 Profit Predictor

</div>





<div 
className="menuItem"
onClick={()=>setPage("crop")}
>

🌱 Crop Recommendation

</div>





<div 
className="menuItem"
onClick={()=>setPage("history")}
>

📜 Farmer History

</div>





<div 
className="menuItem"
onClick={()=>setPage("tips")}
>

🌿 Daily Tips

</div>





<div 
className="menuItem"
onClick={()=>setPage("schemes")}
>

🏛 Government Schemes

</div>





<div 
className="menuItem"
onClick={()=>setPage("disease")}
>

🌱 Disease Detection

</div>





<div 
className="menuItem"
onClick={()=>setPage("chat")}
>

🤖 AI ChatBot

</div>





<div 
className="menuItem"
onClick={()=>setPage("settings")}
>

⚙ Settings

</div>





<div className="sideBottom">


<p>
🌾 Smart Farming
</p>


<p>
Version 1.0
</p>


</div>




</div>

);

}


export default Sidebar;