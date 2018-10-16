import * as React from 'react';

interface IProps {
    handleExecuteQuery: any
}

export default class ExecuteQuery extends React.Component<IProps> {

    state = {
        error: undefined
    }
   
    handleExecuteQuery = (e: any) => {
        e.preventDefault();
        const sparqlQuery = e.target.elements.sparqlQuery.value.trim();
        this.props.handleExecuteQuery(sparqlQuery); 
    }

    render(){
        return (
            <div className= "wrapper">
                    <form onSubmit={this.handleExecuteQuery}>
                        <h2>Execute Query</h2>
                        {this.state.error && <p>{this.state.error}</p>}
                        <div className="inputs">
                            <textarea 
                                id="showcase"
                                className="input" 
                                name="sparqlQuery" 
                                placeholder = "You may add your custom query or press query from the queries table to execute existing queries." 
                                required
                            /> 
                            <button 
                                className="input submit-btn" 
                                type="submit">
                                QUERY
                            </button>     
                        </div>
                        <div id="editor-div"></div>
                    </form>
            </div>
        );
    }
}