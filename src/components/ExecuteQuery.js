import React from 'react';
// import YASQE from 'yasgui-yasqe';
import CodeMirror from 'codemirror/lib/codemirror.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sparql/sparql';

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
        // CodeMirror(document.getElementById('editor-div'));
        return (
            <div className= "wrapper">
                    <form onSubmit={this.handleExecuteQuery}>
                        <h2>Execute Query</h2>
                        {this.state.error && <p>{this.state.error}</p>}
                        <div className="inputs">
                            <textarea id="showcase"
                                className="input" type="text" name="sparqlQuery" placeholder = "You may add your custom query or press query from the queries table to execute existing queries." required/> 
                            <button className="input submit-btn" type="submit">QUERY</button>     
                        </div>
                        <div id="editor-div"></div>
                    </form>
            </div>
        );
    }
}