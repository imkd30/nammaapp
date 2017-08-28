import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import nammaMLAHomePage from './src/HomePage';
export default class nammaMLA extends Component {
  render() {
    return (
      <nammaMLAHomePage/>
    );
  }
}

AppRegistry.registerComponent('nammaMLA', () => nammaMLA);
