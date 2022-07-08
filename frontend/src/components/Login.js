import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Login()
{

    let loginName;
    let loginPassword;

    const [message,setMessage] = useState('');

    const app_name = 'my-game-list-front'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production') 
        {
            return 'https://' + app_name +  '.herokuapp.com/' + route;
        }
        else
        {        
            return 'http://localhost:5000/' + route;
        }
    }
    
    const doLogin = async event => 
    {
        event.preventDefault();

        let obj = {login:loginName.value, password:loginPassword.value};
        let js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(buildPath('api/login'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let res = JSON.parse(await response.text());

            //alert(res.id);
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
                //alert("local storage is: " + localStorage.getItem('user_data'));
            }
            else
            {
                
                let user = {firstName:res.firstName,lastName:res.lastName,id:res.id, userName:res.userName}
                localStorage.setItem('user_data', JSON.stringify(user));
                alert("local storage is: " + localStorage.getItem('user_data'));

                //let gimmie = localStorage.getItem('user_data');
                //let gimmieMoar = JSON.parse(gimmie);
                //alert("paresed local storage is: " + gimmieMoar);
                
                
                //alert("hello: " + gimmieMoar.id + " " + gimmieMoar.firstName);
                //fine for string but need to convert locastorage.getitem using stringify or parse

                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
        }    
    };

    let gimmie = localStorage.getItem('user_data');
    let gimmieMoar = JSON.parse(gimmie);
    let dynamicLogin;
    

    if(gimmieMoar)
    {
        //alert("what now: ");
        dynamicLogin = <p>you ARE logged in!</p>

    }
    else
    {
        //alert("what then?");
        
        dynamicLogin = 
        <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" 
        ref={(c) => loginName = c} /> <br />
        <input type="password" id="loginPassword" placeholder="Password" 
        ref={(c) => loginPassword = c} /> <br />
        <Button type="submit" variant="dark" id="loginButton" class="buttons"
          onClick={doLogin}>button</Button>{'hello'}
        </form>
        <span id="loginResult">{message}</span>
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
            {dynamicLogin}
        </div>
    );
}

export default Login;
//<Button type="submit">Button</Button>{' '}