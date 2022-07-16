
import React, {Component} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';


class AllGameSearch extends Component 
{

    constructor(props)
    {
        super(props);

        this.state = 
        {
            message: '',
            gameName: '',
            gameList: '',
            success: false,

            PS4Check: false,


            RPGCheck: false,
            ARPCheck: false,
            FPSCheck: false
        }
    }

    app_name = 'my-game-list-front';

    buildPath = (route) =>
    {
        if (process.env.NODE_ENV === 'production')
        {
            return 'https://' + this.app_name +  '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }

    setMessage = (msg) =>
    {
        this.setState({ message: msg})
    }

    onkeyPress = (e) =>{

        if(e.keyCode === 13) 
        {
            e.preventDefault();
            //alert("we got here");
           this.onSubmit();
        }
    }
    onSubmit = async () =>{
        //console.log(this.state.userName + " " + this.state.password);
        
        let genre = undefined;
        let platform = [undefined];
        
        if(this.state.RPGCheck)
        {
            genre = "RPG";
        }
        if(this.state.FPSCheck)
        {
            genre = "FPS";
        }
        if(this.state.ARPCheck)
        {
            genre = "Action Role Playing"
        }
 
        await this.searchGame(genre);

        if(this.state.success)
        {
            
            console.log("we refactored the search all games!");
          
        }
        else
        {

            
        }
    }

    searchGame = async (genre) =>
    {
        
        //IMPORTANT: to test a certain game search parameter, change "name" to one of the other parameters, like "userCount"

        //what I tried to test for a platform search
        //let obj = {name: this.state.gameName, platform: ['Playstation 4']};

        let obj = {name: this.state.gameName, genre: genre};

        let js = JSON.stringify(obj);
        alert(js);
        try
        {
            const response = await fetch(this.buildPath('api/games/searchAllGames'),
            {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
 
            if (response.status === 404)
            {
                alert('No game found');
                return;
            }

            let txt = await response.text();
            let searchList = JSON.parse(txt); 
            let resultText = '';           

            //The response is an array of objects, so you need to
            //iterate through them to get the desired data
            for( var i=0; i<searchList.length; i++ )
            {
                console.log(searchList[i]);
                console.log(searchList[i].name);
                resultText += searchList[i].name;
                resultText += " \n platforms: "+ searchList[i].platforms + "\n";
                resultText += " genre: "+ searchList[i].genre + "\n";
                resultText += " release: "+ searchList[i].release + "\n";

                if( i < searchList.length - 1)
                {
                    resultText += '\n';
                }

            }
            // for( var i=0; i<_results.length; i++ )
            // {
            //     resultText += _results[i];
            //     if( i < _results.length - 1 )
            //     {
            //         resultText += ', ';
            //     }
            // }

           
            this.setMessage('Game(s) have been retrieved\n');
            this.setState({gameList: resultText});
            //setGameList(resultText);
            this.state.success = true;
            
        }
        catch(e)
        {
            alert(e.toString());
            this.setMessage(e.toString());
        }
        alert("done");
    };

    render()
    {
        return(
            <Form>
                <Container>
                    <Row className="justify-content-md-center">   
                        <Col> 
                            <InputGroup className="">
                                
                                    <FloatingLabel label = "Name">
                                        <Form.Control type = "text" placeholder="Name" value ={this.state.gameName} autoFocus
                                                    onChange ={e => this.setState({ gameName: e.target.value})}
                                                    onKeyDown={this.onkeyPress}
                                        />
                                    </FloatingLabel>
                                    <Button variant="secondary" id="AllGamesSearch" onClick={() => this.onSubmit()}>
                                        Search
                                    </Button>
                            </InputGroup>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row xxl={4}>
                        <Col>Platform</Col>
                        <Col>genre</Col>
                        
                    </Row>
                    <Row xxl={4}>
                        <Col xs lg="9"> 
                            <div id="checkboxPlatforms">
                                <Form.Group className="mb-3 w-50" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="Playstation 4" 
                                                onChange ={e => {this.setState({PS4Check: e.target.checked}); console.log(this.state.PS4Check);}}
                                                checked={this.state.PS4Check}
                                    />
                                    <Form.Check type="checkbox" id="PS4Check" label="Playstation 5"
                                                
                                    />
                                    <Form.Check type="checkbox" label="Xbox One"/>
                                    <Form.Check type="checkbox" label="Xbox Series X"/>
                                </Form.Group>
                            </div>
                        </Col>
                        <Col xs lg="9"> 
                            <div id="checkboxGenres">
                                <Form.Group className="mb-3 w-50" controlId="formBasicCheckbox">
                                    <Form.Check type="checkbox" label="RPG" disabled={this.state.FPSCheck || this.state.ARPCheck}
                                                onChange ={e => {this.setState({RPGCheck: e.target.checked});}}
                                                checked={this.state.RPGCheck}
                                    />
                                    <Form.Check type="checkbox" label="FPS" disabled={this.state.RPGCheck || this.state.ARPCheck}
                                                onChange ={e => {this.setState({FPSCheck: e.target.checked});}}
                                                checked={this.state.FPSCheck}
                                    />
                                    <Form.Check type="checkbox" label="Action Role Playing" disabled={this.state.RPGCheck || this.state.FPSCheck}
                                                onChange ={e => {this.setState({ARPCheck: e.target.checked});}}
                                                checked={this.state.ARPCheck}
                                    />
                                    
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                            {this.state.message}
                            <div id="gameFormat">{this.state.gameList} </div>
                </Container>
            </Form>
        )
    };

}


export default AllGameSearch;