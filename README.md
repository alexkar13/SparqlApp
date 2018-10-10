# SPARQL CRUD Application

## Introduction

An app that keeps track of **SPARQL** queries built with React. 

The user is able to **create**, **remove**, **update**, **delete** queries and also execute them by communicating with the pizza triplestore found in [http://sparql-vps02.semmtech.com/rdf4j-server/repositories/pizza](http://sparql-vps02.semmtech.com/rdf4j-server/repositories/pizza). 

The list of queries gets served from the following REST API [http://challenge.semmtech.com/sparql-cabinet/api/](http://challenge.semmtech.com/sparql-cabinet/api/).

## Setup

**Please note** that to be able to make calls to the backend API an **authentication key is needed**. You can place the key inside the _src/components/QueriesApp.js_ file in the variable authKey. 

* ` git clone https://github.com/alexkar13/SparqlApp.git/ `
* `npm install `
* `npm run dev-server`

### Build

The app gets built with dev server which is integrated into Webpack. Babel is also set up with the **react** and **env** presets, and also the **transform-class-properties** plugin which allows for some more flexible component level syntax. 

## Architecture

### Design

The application design solely depends on component state and props. No Router or Redux are used. **QueriesApp** is the parent component which renders all the other components as its children. These are all the components.

* QueriesApp
* Header
* QueriesTable
* AddQuery
* ExecuteQuery
* EditModal
* SparqlTable

### Dependencies

The following npm packages are used:

* **react-table**: renders the two tables for the list of queries and the query results. The table has also built in sorting, filtering and pagination.
* **react-modal**: this package is used to render the modal of editing an existing query.
* **axios**: is used for all the **http** communication with the **rest api** and the **triplestore**. 
