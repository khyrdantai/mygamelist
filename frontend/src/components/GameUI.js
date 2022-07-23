import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';



function GameUI(props)
{

    //alert(props.gameName);
    
    const location = useLocation();
    //let dynamicGame;
    const [dynamicGame,setDynamicGame] = useState(<div></div>);
    

    useEffect(() => 
    {
        //todo: memory leak cleanup since we're calling an api and will probably use useState/states
        if(location.state === null)
        {
            //run game search for name?
            (async () => {
                
            console.log("we're calling the allgamessearch api");
            let obj = {name: props.gameName};

            let js = JSON.stringify(obj);
            try
            {
                const response = await fetch(buildPath('api/games/searchAllGames'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                if (response.status === 404)
                {
                    alert('No game found');
                    return;
                }

                let txt = await response.text();
                let searchList = JSON.parse(txt); 
                console.log(searchList[0].name);

                //alert(searchList[0].cover);
                setDynamicGame(<div>name: {searchList[0].name}<br/>
                                platforms: {searchList[0].platforms.join(', ')}<br/>
                                genre: {searchList[0].genre}<br/>
                                img: <br/> <img src={searchList[0].cover} alt="game cover img"/><br/>
                           </div>)
                


                

            }
            catch(e)
            {
                alert("error!");
                alert(e.toString());
                window.location.href = '/games';
            }
            })();
            
            
        }      
        else
        {
            //we have a game already
            console.log(location.state.data.name);
            setDynamicGame(<div>name: {location.state.data.name}<br/>
                                platforms: {location.state.data.platforms}<br/>
                                genre: {location.state.data.genre}<br/>
                                img: <br/><img src={location.state.data.cover} alt="game cover img"/><br/>
                           </div>)

        }

        
    }, [location]);

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

    //alert(location.state.data.id); //we check to see if state is null to determine if we got here from a modal or manually

    return(
        <div>
        {dynamicGame}
        </div>
    );

}

export default GameUI

