import React, {Component} from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import 'rsuite-table/dist/css/rsuite-table.css';

const dataList = [
    { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 3, name: 'c', email: 'c@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
        { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
        { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
  ];
 

function BasicTable2() 
{
    
        return(
            
            <Table 
            virtualized
            height={400}
            autoHeight= {false}
            fillHeight= {false}
            data={dataList}>
                <Column width={100} align='center' fixed>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
                </Column>

                <Column width={100} align='center' fixed>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
                </Column>

                <Column minwidth={100} flexGrow={2} align='center' fixed>
                <HeaderCell>Email</HeaderCell>
                <Cell dataKey='email'/>
                </Column>

                <Column width={100} flexGrow={1} align='center' fixed>
                <HeaderCell>Avartar</HeaderCell>
                <Cell dataKey='avartar'/>
                </Column>
        </Table>
        )
}

export default BasicTable2;