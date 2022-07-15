import React from 'react';

function LoggedInName()
{
	
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    
    let dynamicLogged;

    //to do: use states to not have to re-render everything on logout
    const doLogout = event => 
    {
      const currentPath = window.location.pathname;
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = currentPath;

    };   
    
    if(ud)
    {

        let userId = ud.id;
        let firstName = ud.firstName;
        let lastName = ud.lastName;
        //alert("what now: ");
        dynamicLogged = 

        <div id="loggedInDiv">
          <span id="userName">Logged In As {firstName} {lastName}</span><br />
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
