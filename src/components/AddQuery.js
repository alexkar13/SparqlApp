import React from 'react';

export default class AddQuery extends React.Component {
    state = {
        error: undefined
    }
    handleAddQuery = (e) => {
        e.preventDefault();
        const query = {
            id: e.target.elements.id.value.trim(),
            name: e.target.elements.name.value.trim(),
            creator: e.target.elements.creator.value.trim(),
            description: e.target.elements.description.value.trim(),
            query: e.target.elements.query.value.trim()
        }
        const error = this.props.handleAddQuery(query);
        this.setState( () => ({error}));
        if (!error){
            e.target.reset();
        }   
    }
    
    render(){
        return (
            <div className= "wrapper">
                <form onSubmit={this.handleAddQuery}>
                    <h2>Add Query</h2>
                    {this.state.error && <p>{this.state.error}</p>}
                    <div className="inputs">
                        <input className="input" type="text" name="id" placeholder = "id" required />
                        <input className="input" type="text" name="name" placeholder = "name" required/>
                        <br/>
                        <input className="input" type="text" name="creator" placeholder = "creator" required/>
                        <input className="input" type="text" name="description" placeholder = "description"/>
                        <br/>
                        <textarea className="input" type="text" name="query" placeholder = "query" required/> 
                        <button className="input submit-btn" type="submit">ADD</button>     
                    </div>
                    <br></br>
                    
                </form>
            </div>
        );
    }
}