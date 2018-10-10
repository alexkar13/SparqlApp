import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

export default class SparqlTable extends React.Component{

    createColumns = (sparqlData) => {
        const vars = sparqlData.head.vars;
        const columns = [];
        vars.forEach((headerName) => {
            columns.push({
                Header: headerName,
                id: headerName,
                accessor: (d) => { 
                    if(!d[headerName]){
                        return 'No Entry';
                    }
                    return d[headerName].value;
                }

            });
        });
        return columns; 
    }

    render(){
        return (
            <div>
                {this.props.sparqlData && 
                    <div className="sparql-table">
                        <h2>Sparql Table</h2>
                        <ReactTable
                            data={this.props.sparqlData.results.bindings}
                            filterable
                            defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                            columns={this.createColumns(this.props.sparqlData)}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </div>
                }
            </div>
         
        );
    }
}