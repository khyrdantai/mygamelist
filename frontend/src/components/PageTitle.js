import React from 'react';

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
    title = <h1 id="title">MAIN PAGE</h1>;
  }

   return(
    <div>
      {/* {alert("are ya winnin' son?")} */}
      {title}
    </div>
    
   );
};

export default PageTitle;
