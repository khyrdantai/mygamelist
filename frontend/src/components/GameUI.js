import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalComponent from './Modals/ModalComponent';
import LoginModal from './Modals/LoginModal';
import RegisterModal from './Modals/RegisterModal';
import AllGameSearch from './AllGameSearch';

function GameUI()
{

    let game = '';
    let search = '';
    let name = '';
    let steamId = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [gameList,setGameList] = useState('');
    const [gamesList,setGamesList] = useState('');


    let ud = localStorage.getItem('user');
    let userId;
    let firstName;
    let lastName;

    if(ud)
    {

    }
    else
    {

    }


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


    const getGamesList = async event =>
    {
        event.preventDefault();

        let obj = {userId:userId,steamId:steamId.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/steam/getSteamGames'),
                {method:'POST', mode: 'cors',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            //console.log(res);
            //let fullList = await getGameNames(res);
            let test = [
                {appid: 3920, playtime_forever: 379, playtime_windows_forever: 0, playtime_mac_forever: 0, playtime_linux_forever: 0},
                {appid: 4000, playtime_forever: 3109, playtime_windows_forever: 88, playtime_mac_forever: 0, playtime_linux_forever: 0},
                {appid: 340, playtime_forever: 43, playtime_windows_forever: 0, playtime_mac_forever: 0, playtime_linux_forever: 0},
            ]
            let fullList = await getGameInfo(res);

            //console.log(fullList);
            alert('Steam games have been retrieved');
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    const getGameInfo = async (gameIdList) =>
    {
        const gameInfoArray = [];
        try
        {
            await (async () => 
            {

                //await gameIdList.forEach(async (game) =>
                for(let i = 0; i < 100; i ++)
                {
                    try
                    {
                        
                        let js = JSON.stringify(gameIdList.response.games[i]);
                        //console.log(js);
                        const response = await fetch(buildPath('api/steam/getGameInfo'),
                        {method:'POST', body:js, mode: 'cors', headers:{'Content-Type': 'application/json'}});

                        if(response.status === 200)
                        {
                            let txt = await response.text();
                            let res = JSON.parse(txt);
                            gameInfoArray.push(res);
                        }
                        else if(response.status === 404)
                        {
                            let txt = await response.text()
                            throw new Error('Unknown Game [' + i + '] = ' + txt);
                        }
                    }
                    catch (e)
                    {
                        console.log(e.toString());
                    }
                };
            })();
            console.log(gameInfoArray)
        }
        catch (e)
        {
            alert(e.toString());
        }
    }

    /*
    const getGameNames = async (appIdList) => 
    {
        const response = await fetch(buildPath('api/Steam/getAllGames'),
            {method:'GET', mode: 'cors'});

        let txt = await response.text();
        let gamesList = JSON.parse(txt);
        let parsedGames = await parseGameNames(appIdList, gamesList)

        return parsedGames;
    }

    const parseGameNames = (appIdList, gamesList) =>
    {
        let parsedGames = [];

        appIdList.response.games.filter(function(game1) {
            let temp = gamesList.applist.apps.find((game2) => game1.appid === game2.appid);

            if (typeof(temp) === 'object') 
            {
                parsedGames.push(temp.name);
            }
        });

        return parsedGames;
    }
    */

    const goToHome = async event =>
    {
        window.location.href = '/';
    }
   

    let dynamic_game_search;


    if(ud)
    {
        dynamic_game_search =

            <div id="gameUIDiv">
                <br />
                <Button type="submit" variant="dark" class="buttons"
                        onClick={goToHome}>Back to Home</Button><br/>
                <AllGameSearch/>
                <p id="gameList">{gameList}</p><br /><br />
                
                
                <input type="text" id="requestSteamIDText" placeholder="Enter your Steam ID"
                       ref={(c) => steamId = c} />
                <button type="button" id="requestSteamIDBtn" class="buttons"
                        onClick={getGamesList}> Get Games </button><br />
                <span id="gamesListResult">{message}</span>
                <p id="gamesList">{gamesList}</p>
            </div>


    }
    else
    {

        dynamic_game_search =

            <div id="gameUIDiv">
                <br />
                <Button type="submit" variant="dark" class="buttons"
                        onClick={goToHome}>Back to Home</Button><br/><br/>
                
                {/* login */}

                <ModalComponent
                    buttonType ={"Login"}
                    title={"Login"}
                    body={""}
                    componentType={LoginModal}
                />

                <br/>
                {/* register */}

                <ModalComponent
                    buttonType ={"Register"}
                    title={"Register"}
                    body={""}
                    componentType={RegisterModal}
                />
                <br/>
                <AllGameSearch/>
                <p id="gameList">{gameList}</p><br /><br />
            </div>
    }

    return(
        <div>
            {dynamic_game_search}
        </div>
    );
}

export default GameUI;
