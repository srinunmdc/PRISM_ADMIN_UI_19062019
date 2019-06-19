'use strict';
/**
 * @author - obhadekar
 */

import React, { Component } from 'react';
import { Route, Router, hashHistory } from 'react-router';
import App from './App';
import EditTemplate from './edit-template';


class Routes extends Component {
    render() {
        return (
            <Router history = {hashHistory}>
                <Route path = '/' component = {App} />
                <Route path = '/edit' component = {EditTemplate} />

            </Router>
        )
    }
}

export default Routes