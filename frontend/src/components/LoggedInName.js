import React from 'react';

function LoggedInName()
{
	
    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    
    let dynamicLogged;

    const doLogout = event => 
    {
	    event.preventDefault();

        localStorage.removeItem("user_data")
        window.location.href = '/';

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
