import React from 'react';
import gamelogo from '../newgamelogo.png';

function PageTitle()
{
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  let title;
  //console.log(currentUrl);
  //console.log(currentPath);
  

  if(currentPath === '/login')
  {
    title = <h1 id="title">Sign In</h1>;
  }
  else
  {
    console.log("working?");
    title = <h1 id="title">Welcome!</h1>;
  }

   return(
    <div id="titles">
      {title}
      {/* {alert("are ya winnin' son?")} */}
      
      
      
      
    </div>
    
   );
};

export default PageTitle;
