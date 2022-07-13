import React from 'react';

import PageTitle from '../components/PageTitle';
import MainLogin from '../components/MainLogin';

//import {withRouter} from 'react-router-dom';


//this is the main page of the site
//should display multiple clickable consoles that then display popular games
//PageTitle is a component that displays the title of the page

const MainPage = () =>
{

    const currentUrl = window.location.href;
    const currentPath = window.location.pathname;
    console.log(currentUrl);
    console.log(currentPath);

    return(
      <div>
        
        <PageTitle />
        {/*alert("did we get here!")}*/}
        <MainLogin />
      </div>
    );
};

export default MainPage;
