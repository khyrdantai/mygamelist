import React from 'react';
//import Button from 'react-bootstrap/Button';
//import 'bootstrap/dist/css/bootstrap.min.css';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';


const LoginPage = () =>
{
  const currentUrl = window.location.href;
  const currentPath = window.location.pathname;
  console.log(currentUrl);
  console.log(currentPath);


  return(
    <div>
      <PageTitle />
      <Login />
    </div>
  );
};

export default LoginPage;
//export {Locationn};
