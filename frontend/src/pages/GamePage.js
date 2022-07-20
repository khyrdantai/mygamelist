import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import GameUI from '../components/GameUI';
import BasicTable from '../components/Tables/BasicTable';
import BasicTable2 from '../components/Tables/BasicTable2';

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
