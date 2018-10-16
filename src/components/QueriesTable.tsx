import * as React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

import IQuery from './QueriesApp';


interface IProps {
    queries: Array<IQuery>
    handleDeleteQuery: any
    handleEditButton: any
    handleExecuteQuery: any
    fetchData: any
    error: any
}

export default class QueriesTable extends React.Component<IProps>{
    componentDidUpdate(prevProps: IProps){
        if(JSON.stringify(this.props.queries) !== JSON.stringify(prevProps.queries)){
        this.props.fetchData();
        }
    }

    render(){
        const columns = [
            {
                Header: "ID",
                accessor:"id",
               
            },
            {
                Header: "Name",
                accessor:"name"
            },
            {
                Header: "Description",
                accessor: "description" 
            },
            {
                Header: "Creator",
                accessor: "creator"                           
            },
            {
                Header: "Query",
                accessor: "query" 
            },
            {
                Cell: (row: any) => (
                    <button className = "my-btn" onClick={(e) => this.props.handleDeleteQuery(this.props.queries[row.index])}>Delete</button>
                ),
                Header: "Delete Button",
                accessor: "delete-btn",
                filterable: false,
                width:100
            },
            {
                Cell: (row: any) => ( 
                    <button className="my-btn" onClick={(e) => this.props.handleEditButton(row.index)}>Edit</button>
                ),
                Header: "Edit Button",
                accessor: "edit-btn",
                filterable: false,
                maxWidth: 100
            },
            {
                Cell: (row: any) => (
                    <button className="my-btn" onClick={(e) => this.props.handleExecuteQuery(this.props.queries[row.index]['query'])}>Query {row.query}</button>
                ),
                Header: "Query Button",
                accessor: "query-btn",
                filterable: false,
                maxWidth: 100
            }
        ];

        return (
            <div>
                <h2>Listing Queries</h2>
                {this.props.error && <p>{this.props.error}</p>}
                <ReactTable
                    data={this.props.queries}
                    filterable
                    defaultFilterMethod={(filter:any, row:any) => String(row[filter.id]) === filter.value}
                    columns={columns}
                    defaultPageSize={4}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}