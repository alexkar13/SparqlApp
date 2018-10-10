import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default class QueriesTable extends React.Component{
    componentDidUpdate(prevProps){
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
                Header: "Delete Button",
                accessor: "delete-btn",
                Cell: (row) => (
                    <button className = "my-btn" onClick={(e) => this.props.handleDeleteQuery(this.props.queries[row.index])}>Delete</button>
                ),
                width:100,
                filterable: false
            },
            {
                Header: "Edit Button",
                accessor: "edit-btn",
                Cell: (row) => ( 
                    <button className="my-btn" onClick={(e) => this.props.handleEditButton(row.index)}>Edit</button>
                ),
                maxWidth: 100,
                filterable: false
            },
            {
                Header: "Query Button",
                accessor: "query-btn",
                Cell: (row, columns) => (
                    <button className="my-btn" onClick={(e) => this.props.handleExecuteQuery(this.props.queries[row.index].query)}>Query {row.query}</button>
                ),
                maxWidth: 100,
                filterable: false
            }
        ];

        return (
            <div>
                <h2>Listing Queries</h2>
                {this.props.error && <p>{this.props.error}</p>}
                <ReactTable
                    data={this.props.queries}
                    filterable
                    defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                    columns={columns}
                    defaultPageSize={4}
                    className="-striped -highlight"
                />
            </div>
        );
    }
}