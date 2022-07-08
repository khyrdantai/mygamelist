import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

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

        <div id="cardUIDiv">
            <br />
                <Button type="submit" variant="dark" class="buttons"
                onClick={goToHome}>Back to homepage?</Button><br/>
            <input type="text" id="searchText" placeholder="Card To Search For" 
                ref={(c) => search = c} />
            <button type="button" id="searchCardButton" class="buttons" 
                onClick={searchCard}> Search Game</button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />
            <input type="text" id="cardText" placeholder="Card To Add" 
                ref={(c) => card = c} />
            <button type="button" id="addCardButton" class="buttons" 
                onClick={addCard}> Add Card </button><br />
            <span id="cardAddResult">{message}</span>
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

        <div id="cardUIDiv">
            <br />
                <Button type="submit" variant="dark" class="buttons"
                onClick={goToHome}>Back to homepage?</Button><br/><br/>
                <Button type="submit" variant="dark" class="buttons"
                onClick={goToLogin}>Sign In maybe?</Button><br/><br/>
            <input type="text" id="searchText" placeholder="Card To Search For" 
                ref={(c) => search = c} />
            <button type="button" id="searchCardButton" class="buttons" 
                onClick={searchCard}> Search Game</button><br />
            <span id="cardSearchResult">{searchResults}</span>
            <p id="cardList">{cardList}</p><br /><br />
            <input type="text" id="cardText" placeholder="Card To Add" 
                ref={(c) => card = c} />
            <button type="button" id="addCardButton" class="buttons" 
                onClick={addCard}> Add Card </button><br />
            <span id="cardAddResult">{message}</span>
        </div>
       
    }



    return(
    <div>
        {dynamic_game_search}
    </div>
    );
}

export default CardUI;
