import React, {Component} from 'react';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
//import 'rsuite-table/dist/css/rsuite-table.css';
import 'rsuite-table/lib/less/index.less';



class AllGamesTable extends Component 
{
    
    constructor(props)
    {
        super(props);

        this.state = 
        {
            sortType: 'desc',
            sortColumn: ''
        }
    }

    dataList = this.props.payload;
    

    // dataList = [
    //     { id: 1, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 2, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 3, name: 'c', email: 'c@email.com', avartar: '...' },
    //     { id: 4, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 5, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 6, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 7, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 8, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 9, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 10, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 11, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 12, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 13, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 14, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 15, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 16, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 17, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 18, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 19, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 20, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 21, name: 'b', email: 'b@email.com', avartar: '...' },
    //     { id: 22, name: 'a', email: 'a@emawdwfwfwfwfwfwfil.com', avartar: '...' },
    //     { id: 23, name: 'b', email: 'b@email.com', avartar: '...' },
    //   ];



      getData = () => 
      {
        //alert("hello");
        if (this.state.sortColumn && this.state.sortType) {
          return this.props.payload.sort((a, b) => {
            let x = a[this.state.sortColumn];
            let y = b[this.state.sortColumn];
            if (typeof x === 'string') {
              x = x.charCodeAt();
            }
            if (typeof y === 'string') {
              y = y.charCodeAt();
            }
            if (this.state.sortType === 'asc') {
              return x - y;
            } else {
              return y - x;
            }
          });
        }
        return this.props.payload;
      };

    handleSortColumn = (sortColumnn, sortTypee) => 
    {
        //alert("do you re-render");
        //alert(this.props.payload);
        //alert(this.dataList);   

        this.setState({ sortColumn: sortColumnn});
        this.setState({ sortType: sortTypee}); 
        //alert(this.state.sortColumn);
        //alert(this.state.sortType);
    };

    render()
    {
        return(
            <div id='allGamesTable'>
            
            <Table 
            height={700}
            wordWrap="break-word"
            autoHeight= {false}
            fillHeight= {false}
            align = 'right'
            bordered
            cellBordered
            sortColumn={this.state.sortColumn}
            sortType={this.state.sortType}
            onSortColumn={this.handleSortColumn}
            data={this.getData()}>
                <Column width={100} align='center' verticalAlign='middle'>
                <HeaderCell>ID</HeaderCell>
                <Cell dataKey="id" />
                </Column>

                <Column width={100} flexGrow= {2} align='center' verticalAlign='middle' sortable>
                <HeaderCell>Name</HeaderCell>
                <Cell dataKey="name" />
                </Column>

                <Column width={100} flexGrow= {2} align='center' verticalAlign='middle'>
                <HeaderCell>Platforms</HeaderCell>
                <Cell dataKey='platforms'/>
                </Column>

                <Column width={100} flexGrow= {2} align='center' verticalAlign='middle'>
                <HeaderCell>Genres</HeaderCell>
                <Cell dataKey='genre'/>
                </Column>
        </Table>
        </div>
        )
    };

}

export default AllGamesTable;