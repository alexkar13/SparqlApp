import * as React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

interface IProps {
    sparqlData:any,
    error: any
}

export default class SparqlTable extends React.Component<IProps>{

    state = {
        error: undefined
    }

    createColumns = (sparqlData:any) => {
        const vars = sparqlData.head.vars;
        const columns: any = [];
        vars.forEach((headerName: any) => {
            columns.push({
                Header: headerName,
                accessor: (d: any) => { 
                    if(!d[headerName]){
                        return 'No Entry';
                    }
                    return d[headerName].value;
                },
                id: headerName,
            });
        });
        return columns; 
    }

    render(){
        return (
            <div>
                    <div className="sparql-table">
                        <h2>Sparql Table</h2>
                        {this.props.error && <p>{this.props.error}</p>}
                        {this.props.sparqlData && 
                            <ReactTable
                                data={this.props.sparqlData.results.bindings}
                                filterable
                                defaultFilterMethod={(filter, row) => String(row[filter.id]) === filter.value}
                                columns={this.createColumns(this.props.sparqlData)}
                                defaultPageSize={5}
                                className="-striped -highlight"
                            />  
                        }
                    </div>
            </div>
         
        );
    }
}