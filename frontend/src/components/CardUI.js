import React, { useState } from 'react';

function CardUI()
{
    
    let card = '';
    let search = '';
    let steamId = '';

    const [message,setMessage] = useState('');
    const [searchResults,setResults] = useState('');
    const [cardList,setCardList] = useState('');
    const [gamesList,setGamesList] = useState('');


    let _ud = localStorage.getItem('user_data');
    let ud = JSON.parse(_ud);
    let userId = ud.id;
    let firstName = ud.firstName;
    let lastName = ud.lastName;
	
const app_name = 'cop4331-1234'
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

    const addCard = async event => 
    {
	    event.preventDefault();

        let obj = {userId:userId,card:card.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/addcard'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);

            if( res.error.length > 0 )
            {
                setMessage( "API Error:" + res.error );
            }
            else
            {
                setMessage('Card has been added');
            }
        }
        catch(e)
        {
            setMessage(e.toString());
        }

	};

    const searchCard = async event => 
    {
        event.preventDefault();
        		
        let obj = {userId:userId,search:search.value};
        let js = JSON.stringify(obj);

        try
        {
            const response = await fetch(buildPath('api/searchcards'),
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
            setResults('Card(s) have been retrieved');
            setCardList(resultText);
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
            const response = await fetch(buildPath('api/getSteamGames'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            let txt = await response.text();
            let res = JSON.parse(txt);
            console.log(res);
            alert('Steam games have been retrieved');
        }
        catch(e)
        {
            alert(e.toString());
            setResults(e.toString());
        }
    };

    return(
<div id="cardUIDiv">
  <br />
  <input type="text" id="searchText" placeholder="Card To Search For" 
    ref={(c) => search = c} />
  <button type="button" id="searchCardButton" class="buttons" 
    onClick={searchCard}> Search Card</button><br />
  <span id="cardSearchResult">{searchResults}</span>
  <p id="cardList">{cardList}</p><br /><br />
  <input type="text" id="cardText" placeholder="Card To Add" 
    ref={(c) => card = c} />
  <button type="button" id="addCardButton" class="buttons" 
    onClick={addCard}> Add Card </button><br /><br />
  <span id="cardAddResult">{message}</span>
  <input type="text" id="requestSteamIDText" placeholder="Enter your Steam ID" 
    ref={(c) => steamId = c} />
  <button type="button" id="requestSteamIDBtn" class="buttons" 
    onClick={getGamesList}> Get Games </button><br /> 
  <span id="gamesListResult">{message}</span>
  <p id="gamesList">{gamesList}</p>
</div>
    );
}

export default CardUI;
