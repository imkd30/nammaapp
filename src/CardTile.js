import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Alert,
    ScrollView,
    RefreshControl,
    View,
    Image, Button
} from 'react-native';
//import { Navigation } from 'react-native-navigation';
import Base64 from './utilities/base64';
export default class Card extends Component {
  constructor(props) {
    super(props);
    this.generateBearer = this.generateBearer.bind(this);
    this.state = {
      Consumer_Key: '3hxduVmElWBO0JVAgXYUlnsnu',
      Consumer_Secret: 'w57p5mAmARSebvOQZayEJiZV7oOV1BjEcSEkLCe6Msk8BNwf6r',
      isRefreshing: false
    };
  };

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
  };

fetchTweets(token) {
    return fetch('https://api.twitter.com/1.1/statuses/user_timeline.json?user_id=141129309&count=30', {
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
  };
  componentDidMount(){
        this._TwitterDataRefresh();
  };
  _TwitterDataRefresh(){
    let b = '';
    let c;
    let tweetArray = [];
    let a = this.generateBearer();
    a.then(res => {
    b = res.access_token;
    c = this.fetchTweets(b);
    c.then(res => {
    tweetArray = res.map(item => {
    let iteration = {message: item.text};
    return iteration;
    });
    this.setState({
    Consumer_Key: '3hxduVmElWBO0JVAgXYUlnsnu',
    Consumer_Secret: 'w57p5mAmARSebvOQZayEJiZV7oOV1BjEcSEkLCe6Msk8BNwf6r',
    data : tweetArray,
    isRefreshing: false
    })
    })
    });
  };

  _onRefresh() {
     this._TwitterDataRefresh();
   };

    /*componentDidMount___fb___API(){ //FB API
      var postsURL =  "https://graph.facebook.com/v2.10/me?fields=feed&access_token=EAACEdEose0cBANNmLKZBu86KT3FzhuTuFHdi49gnBy0OZAfJxvZA2uuF5V4gQZA8UEwPJCylxuxnxreHrdO5eSRprqOKvsCW72LxSFLqn3QfRaYsk5zzyUZAHb25nJ1fRwbiohWQ9VW6rYz9CIEn07WddIJPYoLoG4H7OkUZAgihU6H2rql5OvS3WExZBU7QqG8jLHeh1CyXwZDZD"
      return fetch(postsURL)  //('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
           //Alert.alert(JSON.stringify(responseJson.feed.data));
           this.setState({data: responseJson.feed.data});
      })
      .catch((error) => {
        Alert.alert(JSON.stringify(error));
      });
    };*/
    render() {
      //Binding concept
      var array = [];
      if(this.state.data != undefined)
      (this.state.data).map(x=> {
      array.push(
          <View style={styles.container} key={array.length}>
              <View style={styles.subContainer} >
                  <View style={styles.avatarContainer}>
                      <View style={styles.avatar}>
                      <Image source={require("./assets/images/ttwitter.png")}
                      style={{ width: 60, height: 60, borderRadius: 60 }}>
                      </Image>
                      </View>
                      <View style={{ margin: 7, flex: 6 }}>
                          <Text style={{ fontWeight: 'bold' }}>{x.message}</Text>
                          <Text style={{ fontWeight: 'bold' }}>{x.story}</Text>

                      </View>

                      </View>
              </View>
              </View>
          );
        });

       {
        return (
          <ScrollView refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=> this._onRefresh()}
            tintColor="#ff0000"
            title="Loading..."
            colors={['#252fbd', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffffff"
          />
        }>
          {array}
          </ScrollView>
        );
      }
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 6,
        borderColor: '#999',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 5,
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0,
        elevation: 2
    },
    avatarContainer: {
        flex: 1,
        flexDirection: 'row',
        //justifyContent: 'center'
    },
    avatar: {
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        flex: 1,
        margin: 2,

    },
    cardDetails: {

        margin: 10,
        marginLeft: 5,
        flex: 1.3,
        borderRadius: 5,
        flexDirection: 'row'

    },
    callIcon: {
        height: 60,
        width: 60,
        borderRadius: 60 / 2,
        alignSelf: 'flex-end',
    }

});
