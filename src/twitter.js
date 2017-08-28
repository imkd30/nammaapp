import React, { Component } from 'react';
import {
AppRegistry,
StyleSheet,
Text,
Alert,
View
} from 'react-native';
import Base64 from './utilities/base64';
export default class Auth extends Component {
constructor(props) {
super(props);
this.state = {
Consumer_Key: '3hxduVmElWBO0JVAgXYUlnsnu',
Consumer_Secret: 'w57p5mAmARSebvOQZayEJiZV7oOV1BjEcSEkLCe6Msk8BNwf6r'
}
}
generateBearer() {
let encoded_C_Key = encodeURI(this.state.Consumer_Key);
let encoded_C_Secret = encodeURI(this.state.Consumer_Secret);
//let bearerTokenCreds = Base64.btoa(encoded_C_Key + ':' + encoded_C_Secret);
let bearerTokenCreds = 'M2h4ZHVWbUVsV0JPMEpWQWdYWVVsbnNudTp3NTdwNW1BbUFSU2Vidk9RWmF5RUppWlY3b09WMUJqRWNTRWtMQ2U2TXNrOEJOd2Y2cg=='
console.log(bearerTokenCreds)
return fetch('https://api.twitter.com/oauth2/token', {
method: 'POST',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
'Authorization': 'Basic ' + bearerTokenCreds,
},
body: 'grant_type=client_credentials'
})
.then((response) => response.json())
.then((responseJson) => {
return responseJson;
})
.catch((error) => {
  Alert.alert("E=>" + JSON.stringify(error));
console.error(error);
});
}

fetchTweets(token) {
return fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=141129309&count=3', {
method: 'GET',
headers: {
'Accept': 'application/json',
'Content-Type': 'application/JSON',
'Authorization': 'Bearer ' + token,
}
})
.then((response) => response.json())
.then((responseJson) => {
return responseJson;
})
.catch((error) => {
console.error(error);
});
}

render() {
let b = '';
let c;
let tweetArray = [];
let a = this.generateBearer();
a.then(res => {
b = res.access_token;
c = this.fetchTweets(b);
c.then(res => {
tweetArray = res.map(item => {
return item.text;
})
//console.log(JSON.stringify(tweetArray));
this.setState({
Consumer_Key: '3hxduVmElWBO0JVAgXYUlnsnu',
Consumer_Secret: 'w57p5mAmARSebvOQZayEJiZV7oOV1BjEcSEkLCe6Msk8BNwf6r',
data_twitter : tweetArray
})
})
});


return (
<Text>
{this.state.data_twitter}
</Text>

)
}
}
