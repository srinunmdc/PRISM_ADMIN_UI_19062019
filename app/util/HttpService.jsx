import React, { Component } from "react";
import axios from 'axios';

export default class HttpService extends Component {
    constructor(props){
        super(props);
    }


    post(url,request){
        axios.post(url,request)
            .then(function (response) {
                console.log("Invoked Successfully "+url );
                return response;
            })
            .catch(function (error) {
                console.log(" Failed to Invoked  "+error );
               // return error;
            });
    }

}