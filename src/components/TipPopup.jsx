import React from "react";


function TipPopup({
tip,
language,
speak,
close
}){


return(

<div className="popupOverlay">


<div className="popupBox">


<h2>

{tip.title[language]}

</h2>



<p>

{tip.details[language]}

</p>




<h3>
🌾 Crops
</h3>


<ul>

{

tip.crops.map((crop,index)=>(

<li key={index}>
{crop}
</li>

))

}

</ul>




<h3>
✅ Benefits
</h3>


<ul>

{

tip.benefits.map((b,index)=>(

<li key={index}>
{b}
</li>

))

}

</ul>



<button

onClick={()=>speak(tip.details[language])}

>

🔊 Listen

</button>



<button

onClick={close}

>

❌ Close

</button>



</div>


</div>


);


}


export default TipPopup;