'use strict';
var React = require('react');
var ReactNative = require('react-native');
var { AppRegistry, StyleSheet, Text, Alert, View, TextInput, ScrollView , TouchableHighlight } = ReactNative;
//import { Linking } from 'react-native';
import { Madoka} from 'react-native-textinput-effects';
import SubmitButtonAnimate from './animate/homepage';
var AwesomeProject = React.createClass({
    onPress: function () {
      const url = 'mailto:somethingemail@gmail.com?subject=abcdefg&body=body';
            Linking.canOpenURL(url).then(supported => {
            if (!supported) {
              console.log('Can\'t handle url: ' + url);
            } else {
              return Linking.openURL(url);
            }
            }).catch(err => console.error('An error occurred', err));


    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    if (value) { // if validation fails, value will be null
      console.log(value); // value here is an instance of Person
    }
  },

  render: function() {
    return (
      <ScrollView  style={styles.container}>
        {/* display */}
        <Text style={{marginTop: 30}}/>
        <Madoka
          label={'Name (ಹೆಸರು)'} borderColor={'#002D40' }
          labelStyle={{ color: '#000'}}
          inputStyle={{ color: '#000' }}
          />
          <Madoka
            label={'Subject (ವಿಷಯ)'} borderColor={'#002D40' }
            labelStyle={{ color: '#000'}}
            inputStyle={{ color: '#000' }}
            />
            <Madoka
              style = {{height: 100}}
              label={'Complaints (ದೂರು)'}
              borderColor={'#002D40' }
              labelStyle={{ color: '#000'}}
              inputStyle={{ color: '#000'}}
              />
              <SubmitButtonAnimate/>
        <Text style={{marginBottom: 30}}/>

      </ScrollView >
    );
  }
});

var styles = StyleSheet.create({
  container: {
  //  marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default AwesomeProject;
