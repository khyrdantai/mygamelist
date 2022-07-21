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


    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId;
    let firstName;
    let lastName;

    if(ud)
    {
        userId = ud.id;
        firstName = ud.firstName;
        lastName = ud.lastName;
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

    const addGame = async event =>
    {
        event.preventDefault();

        let obj = {userId:userId,game:game.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/addgame'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Game has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

    };

    //-------------------------------------------------------------------------
    //old un-refactored searchallgames code
    // const searchGame = async event =>
    // {
    //     event.preventDefault();

    //     //IMPORTANT: to test a certain game search parameter, change "name" to one of the other parameters, like "userCount"
    //     let obj = {name:search.value};
    //     let js = JSON.stringify(obj);
    //     alert(js);
    //     try
    //     {
    //         const response = await fetch(buildPath('api/games/searchAllGames'),
    //         {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
 
    //         if (response.status === 404)
    //         {
    //             alert('No game found');
    //             return;
    //         }

    //         let txt = await response.text();
    //         let searchList = JSON.parse(txt);            

    //         //The response is an array of objects, so you need to
    //         //iterate through them to get the desired data
    //         for( var i=0; i<searchList.length; i++ )
    //         {
    //             console.log(searchList[i]);
    //             console.log(searchList[i].name);
    //         }

    //         setResults('Game(s) have been retrieved');
    //         //setGameList(resultText);
    //     }
    //     catch(e)
    //     {
    //         alert(e.toString());
    //         setResults(e.toString());
    //     }
    //     alert("done");
    // };
    //---------------------------------------------------------------------------

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
    const goToLogin = async event =>
    {
        window.location.href = '/login';
    }


    let dynamic_game_search;


    if(ud)
    {
        //alert("what now: ");
        dynamic_game_search =

            <div id="gameUIDiv">
                <br />
                <Button type="submit" variant="dark" class="buttons"
                        onClick={goToHome}>Back to Home</Button><br/>
                {/* <input type="text" id="searchText" placeholder="Game To Search For"
                       ref={(c) => search = c} />
                <button type="button" id="searchGameButton" class="buttons"
                        onClick={searchGame}> Search Game</button><br />
                <span id="gameSearchResult">{searchResults}</span> */}
                <AllGameSearch/>
                <p id="gameList">{gameList}</p><br /><br />
                
                
                <input type="text" id="gameText" placeholder="Game To Add"
                       ref={(c) => game = c} />
                <button type="button" id="addGameButton" class="buttons"
                        onClick={addGame}> Add Game </button><br />
                <span id="gameAddResult">{message}</span>
                
                
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
        //alert("what then?");

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
                {/* <input type="text" id="searchText" placeholder="Game To Search For"
                       ref={(c) => search = c} />
                <button type="button" id="searchGameButton" class="buttons"
                        onClick={searchGame}> Search Game</button><br />
                <span id="gameSearchResult">{searchResults}</span> */}
                <AllGameSearch/>
                <p id="gameList">{gameList}</p><br /><br />
                <input type="text" id="gameText" placeholder="Game To Add"
                       ref={(c) => game = c} />
                <button type="button" id="addGameButton" class="buttons"
                        onClick={addGame}> Add Game </button><br />
                <span id="gameAddResult">{message}</span>
            </div>
    }



    return(
        <div>
            {dynamic_game_search}
        </div>
    );
}

export default GameUI;
