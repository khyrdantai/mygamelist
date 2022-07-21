import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import GameUI from '../components/GameUI';

const GamePage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <GameUI />
        </div>
    );
}

export default GamePage;
