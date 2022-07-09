import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import LoggedInName from '../components/LoggedInName';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';



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
            <br/><br/>

            {/* login */}

            <ModalComponent
                buttonType ={"Login"}
                title={"Login"}
                body={""}
                bodyModal = 
                {
                    <div>
                        <LoginModal/>
                    </div>
                    
                }
            />

            <br/>
            {/* register */}

            <ModalComponent
                buttonType ={"Register"}
                title={"Register"}
                body={""}
                bodyModal = 
                {
                    <div>
                        <RegisterModal/>
                    </div>
                }
            />
            
        </div>
    }


    return(

        <div>
            {dynamicMain}
        </div>
    );
}

export default MainLogin;
