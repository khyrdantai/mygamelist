import React from 'react';

import PageTitle from '../components/PageTitle';
import Login from '../components/Login';
import MainLogin from '../components/MainLogin';

//import {withRouter} from 'react-router-dom';




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
