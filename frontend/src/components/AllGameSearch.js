
import React, {Component} from 'react';
import {Modal, Button, Container, Row, Col} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import BasicTable from './Tables/BasicTable';


class AllGameSearch extends Component 
{

    constructor(props)
    {
        super(props);

        this.state = 
        {
            message: '',
            gameName: '',
            gameListString: '',
            gameList: [],
            success: false,
            

            //platforms
            PCCheck: false,
            PS4Check: false,
            XOneCheck: false,
            XSeriesCheck: false,
            PS5Check: false,

           //genres
            RPGCheck: false,
            ActionCheck: false,
            FPSCheck: false,
            IndieCheck: false,
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
        
        let genre;
        let platform;

        //genre check
        if(this.state.RPGCheck || this.state.FPSCheck || this.state.ActionCheck || this.state.IndieCheck)
        {
            let genreArray = [];
            if(this.state.RPGCheck)
            {

                genreArray.push("Role Playing Game");

            }
            if(this.state.FPSCheck)
            {
                genreArray.push("First Person Shooter");
                
            }
            if(this.state.ActionCheck)
            {
                genreArray.push("Action");
                
            }
            if(this.state.IndieCheck)
            {
                genreArray.push("Indie");
                
            }
            
            genre = [...genreArray];
            //alert("this is genre, not genrearray " + genre);
        
        }
        else
        {
            genre = undefined;
        }
        //platforms check
        if(this.state.PCCheck || this.state.PS4Check || this.state.PS5Check || this.state.XOneCheck || this.state.XSeriesCheck)
        {
            let platformArray = [];
            if(this.state.PCCheck)
            {

                platformArray.push("PC");
            
            }
            if(this.state.PS4Check)
            {

                platformArray.push("PlayStation 4");
            
            }
            if(this.state.PS5Check)
            {
                platformArray.push("PlayStation 5");
               
            }
            if(this.state.XOneCheck)
            {
                platformArray.push("Xbox One");
    
            }
            if(this.state.XSeriesCheck)
            {
                platformArray.push("Xbox Series X");
            }
            platform = [...platformArray];
            //alert("this is platform, not platarray " + platform);
        }
        else
        {
            platform = undefined;   
        }
       
       

        await this.searchGame(genre, platform);

    
        if(this.state.success)
        {
            
            console.log("we refactored the search all games!");
            this.setState({success: false});
          
        }
        else
        {

            
        }
    }

    searchGame = async (genre, platform) =>
    {
        
        //IMPORTANT: to test a certain game search parameter, change "name" to one of the other parameters not in there, 
        //like "userCount"

        let obj = {name: this.state.gameName, genre: genre, platform: platform};

        let js = JSON.stringify(obj);
        //alert(js);
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
            let resultGames = [];     

            //The response is an array of objects, so you need to
            //iterate through them to get the desired data
            for( var i=0; i<searchList.length; i++ )
            {
                console.log(typeof(searchList[i]));
                console.log(searchList[i].name);
                resultText += searchList[i].name;
                resultText += " \n platforms: "+ searchList[i].platforms + "\n";
                resultText += " genre: "+ searchList[i].genre + "\n";
                resultText += " release: "+ searchList[i].release + "\n";

                resultGames.push(searchList[i]);

                console.log("our boi: " + resultGames[i].platforms);

                if( i < searchList.length - 1)
                {
                    resultText += '\n';
                }

            }
           
            this.setMessage('Game(s) have been retrieved\n');
            this.setState({gameListString: resultText});
            this.setState({gameList: resultGames});
            //setgameListString(resultText);

            alert(this.state.gameList);
            //this is dangerous
            this.state.success = true;

            
        }
        catch(e)
        {
            alert(e.toString());
            this.setMessage(e.toString());
        }
        //alert("done");
    };

    render()
    {
        return(
            <div>
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
                                <Form.Group className="mb-3 w-50" controlId="formPlatformCheckbox">

                                    <Form.Check type="checkbox" id="PCCheck" label="PC" 
                                                onChange ={e => {this.setState({PCCheck: e.target.checked});}}
                                                checked={this.state.PCCheck}
                                    />
                                    <Form.Check type="checkbox" id="PS4Check" label="PlayStation 4" 
                                                onChange ={e => {this.setState({PS4Check: e.target.checked}); console.log(this.state.PS4Check);}}
                                                checked={this.state.PS4Check}
                                    />
                                    <Form.Check type="checkbox" id="PS5Check" label="PlayStation 5"
                                                onChange ={e => {this.setState({PS5Check: e.target.checked});}}
                                                checked={this.state.PS5Check}
                                                
                                    />
                                    <Form.Check type="checkbox" id = "XOneCheck" label="Xbox One"
                                                onChange ={e => {this.setState({XOneCheck: e.target.checked});}}
                                                checked={this.state.XOneCheck}
                                    />
                                    <Form.Check type="checkbox" id = "XSeriesCheck" label="Xbox Series X"
                                                onChange ={e => {this.setState({XSeriesCheck: e.target.checked});}}
                                                checked={this.state.XSeriesCheck}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                        <Col xs lg="9"> 
                            <div id="checkboxGenres">
                                <Form.Group className="mb-3 w-50" controlId="formGenreCheckbox">
                                    <Form.Check type="checkbox" id = "RPGCheck" label="RPG"
                                                onChange ={e => {this.setState({RPGCheck: e.target.checked});}}
                                                checked={this.state.RPGCheck}
                                    />
                                    <Form.Check type="checkbox" id = "FPSCheck" label="FPS"
                                                onChange ={e => {this.setState({FPSCheck: e.target.checked});}}
                                                checked={this.state.FPSCheck}
                                    />
                                    <Form.Check type="checkbox" id = "ActionCheck" label="Action"
                                                onChange ={e => {this.setState({ActionCheck: e.target.checked});}}
                                                checked={this.state.ActionCheck}
                                    />
                                     <Form.Check type="checkbox" id = "IndieCheck" label="Indie"
                                                onChange ={e => {this.setState({IndieCheck: e.target.checked});}}
                                                checked={this.state.IndieCheck}
                                    />
                                </Form.Group>
                            </div>
                        </Col>
                    </Row>
                            {/* {this.state.message}
                            <div id="gameFormat">{this.state.gameListString} </div> */}
                            
                </Container>
                
            </Form>
            <BasicTable payload = {this.state.gameList}/>
            </div>
        )
    };

}


export default AllGameSearch;