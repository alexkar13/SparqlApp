import React from 'react';
import axios from 'axios';

import Header from './Header';
import AddQuery from './AddQuery';
import QueriesTable from './QueriesTable';
import EditModal from './EditModal';
import ExecuteQuery from './ExecuteQuery';
import SparqlTable from './SparqlTable';

export default class QueriesApp extends React.Component {
    state = {
        queries: [],
        selectedQuery: undefined,
        error: undefined,
        sparqlData: undefined
    }
    // Here goes the authentication key if it is not there
    authKey = "24153d5c-172c-4440-a3e5-5e3e0b1a51fc";
    apiUrl = "";

    handleAddQuery = (query) => {
        if (!query.id || !query.name || !query.creator || !query.query){
            return 'Required Fields are ID, name, creator, query.';
        } else if (this.state.queries.filter((filterQuery) => filterQuery.id == query.id).length !== 0 ) {
            return 'Cannot have duplicate IDs.';
        } else if (query.id.indexOf(' ') != -1 || query.id.indexOf('/') != -1 || query.id.indexOf('?') != -1 || query.id.indexOf('#') != -1){
            return 'Cannot have the following characters in id : \'/\', \'?\', \'#\' and space.'
        }
        axios.post(`${this.apiUrl}sparql/queries?api_key=${this.authKey}`, query)
            .then(res => this.fetchData())
            .catch(error => this.handleAxiosErrors(error));
    }

    handleEditQuery = (query) => { 
        axios.put(`${this.apiUrl}sparql/queries/${query.id}?api_key=${this.authKey}`, query)
            .then(res => {
                this.fetchData();
                this.setState({selectedQuery: undefined});
            })
            .catch(error => this.handleAxiosErrors(error));
    }

    handleDeleteQuery = (query) => {
        axios.delete(`${this.apiUrl}sparql/queries/${query.id}?api_key=${this.authKey}`)
            .then(res => this.fetchData())
            .catch(error => this.handleAxiosErrors(error));  
    }

    handleExecuteQuery = (sparqlQuery) => {
        axios({
            method: 'post',
            url: 'http://sparql-vps02.semmtech.com/rdf4j-server/repositories/pizza',
            data: sparqlQuery,
            headers: {
                'Content-Type':'application/sparql-query',
                'Accept': 'application/sparql-results+json' 
            }
          })
          .then((res) => { 
            this.setState({
                sparqlData: res.data
            })   
          })
          .catch((error) => {
            this.handleAxiosErrors(error)
          });
    }

    handleEditButton = (index) => {
        const query = this.state.queries[index];
        this.setState(() => ({
            selectedQuery: query,
            editingIndex: index
        }));
    }

    handleCloseModal = () => {
        this.setState(() => ({selectedQuery: undefined}));
    }

    fetchData = () => {
        axios.get(`${this.apiUrl}sparql/queries?api_key=${this.authKey}`)
        .then((response) => {
            this.setState({
                queries: response.data,
                error: undefined
            })
        })
        .catch((error) => this.handleAxiosErrors(error))
    }

    handleAxiosErrors = (error) => {
        if (error.response) {
            this.setState({error: `There was a problem with the response from the API. Error Code ${error.response.status} ${error.response.data}`});
          } else if (error.request) {
            this.setState({error:`There was a problem with the request to the API.`})
          } else {
            this.setState({error: 'Something happened in setting up the request that triggered an Error' })
          }
    }

    componentDidMount() {
        this.fetchData();
    }

    render(){
        return (
            <div>
                <Header />
                <QueriesTable 
                    queries = {this.state.queries} 
                    handleDeleteQuery = {this.handleDeleteQuery}
                    handleEditButton = {this.handleEditButton}
                    handleExecuteQuery = {this.handleExecuteQuery}
                    fetchData = {this.fetchData}
                    error = {this.state.error}
                />
                <SparqlTable sparqlData = {this.state.sparqlData} />
                <div className="flex-div">
                    <AddQuery handleAddQuery = {this.handleAddQuery} />
                    <ExecuteQuery handleExecuteQuery = {this.handleExecuteQuery} />
                </div>
                <SparqlTable sparqlData = {this.state.sparqlData} />
                <EditModal
                    selectedQuery = {this.state.selectedQuery} 
                    handleEditQuery ={this.handleEditQuery}
                    handleCloseModal = {this.handleCloseModal}
                />
            </div>
        );
    }
}