import React from 'react';

export default class ExecuteQuery extends React.Component {

    state = {
        error: undefined
    }
   
    handleExecuteQuery = (e) => {
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
                            <textarea className="input" type="text" name="sparqlQuery" placeholder = "You may add your custom query or press query from the queries table to execute existing queries." required/> 
                            <button className="input submit-btn" type="submit">ADD</button>     
                        </div>
                    </form>
            </div>
        );
    }
}