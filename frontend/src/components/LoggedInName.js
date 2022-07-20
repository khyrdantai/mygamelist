import React from 'react';

function LoggedInName()
{
	
    let ud = localStorage.getItem('user');
    //let ud = JSON.parse(_ud);
    
    let dynamicLogged;

    //to do: use states to not have to re-render everything on logout
    const doLogout = event => 
    {
      const currentPath = window.location.pathname;
	    event.preventDefault();

        localStorage.removeItem("user")
        window.location.href = currentPath;

    };   
    
    if(ud)
    {

        dynamicLogged = 

        <div id="loggedInDiv">
          <span id="userName">Logged In As {"it's a secret!"}</span><br />
          <button type="button" id="logoutButton" class="buttons" 
            onClick={doLogout}> Log Out </button>
        </div>


    }
    else
    {
      
        dynamicLogged = 

        <div id="loggedInDiv">
        </div>
       
    }

  return(
   <div>
      {dynamicLogged}
   </div>
  );

};

export default LoggedInName;
