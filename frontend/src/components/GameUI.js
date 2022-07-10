import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function GameUI()
{

    let game = '';
    let search = '';
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
            return 'http://localhost:3000/' + route;
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

    const searchGame = async event =>
    {
        event.preventDefault();

        let obj = {userId:userId,search:search.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/searchgames'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            let _results = res.results;
            let resultText = '';
            for( var i=0; i<_results.length; i++ )
            {
                resultText += _results[i];
                if( i < _results.length - 1 )
                {
                    resultText += ', ';
                }
            }
            setResults('Game(s) have been retrieved');
            setGameList(resultText);
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    const getGamesList = async event =>
    {
        event.preventDefault();

        let obj = {userId:userId,steamId:steamId.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/Steam/getSteamGames'),
                {method:'POST', mode: 'cors',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            let fullList = await getGameNames(res);

            console.log(fullList);
            alert('Steam games have been retrieved');
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

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
                <input type="text" id="searchText" placeholder="Game To Search For"
                       ref={(c) => search = c} />
                <button type="button" id="searchGameButton" class="buttons"
                        onClick={searchGame}> Search Game</button><br />
                <span id="gamwSearchResult">{searchResults}</span>
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
                <Button type="submit" variant="dark" class="buttons"
                        onClick={goToLogin}>Sign In </Button><br/><br/>
                <input type="text" id="searchText" placeholder="Game To Search For"
                       ref={(c) => search = c} />
                <button type="button" id="searchGameButton" class="buttons"
                        onClick={searchGame}> Search Game</button><br />
                <span id="gameSearchResult">{searchResults}</span>
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
