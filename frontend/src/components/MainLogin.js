import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoggedInName from '../components/LoggedInName';


function MainLogin()
{
    const goToLogin = async event => 
    {
        window.location.href = '/login';
    }


    let gimmie = localStorage.getItem('user_data');
    let gimmieMoar = JSON.parse(gimmie);
    let dynamicMain;
    

    if(gimmieMoar)
    {
        
        dynamicMain = 
        <div> 
        <span id="inner-title">Welcome to teh homepage</span><br />
        <p>you ARE already logged in! Your login is: {gimmieMoar.userName}</p>
        <LoggedInName />
        </div>
        
    }
    else
    {
        
        dynamicMain = 
        <div>
            <span id="inner-title">Welcome to teh homepage</span><br />
            <Button type="submit" variant="dark" class="buttons"
            onClick={goToLogin}>Sign In maybe?</Button>
        </div>
    }


    return(
    //   <div id="loginDiv">
    //     <Button type="submit">Button</Button>{' '}
    //     <form onSubmit={doLogin}>
    //     <span id="inner-title">PLEASE LOG IN</span><br />
    //     <input type="text" id="loginName" placeholder="Username" 
    //     ref={(c) => loginName = c} /> <br />
    //     <input type="password" id="loginPassword" placeholder="Password" 
    //     ref={(c) => loginPassword = c} /> <br />
    //     <Button type="submit" variant="dark" id="loginButton" class="buttons"
    //       onClick={doLogin}>button</Button>{'hello'}
    //     </form>
    //     <span id="loginResult">{message}</span>
    //  </div>
        <div>
            {dynamicMain}
        </div>
    );
}

export default MainLogin;
