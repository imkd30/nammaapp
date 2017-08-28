import React, { PureComponent } from 'react';
import { View, StatusBar,StyleSheet,TextInput, Text,TouchableHighlight } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import ComplaintForm from './Complaint';
import CardTile from './CardTile';
const FirstRoute = () => <ComplaintForm/>;
const SecondRoute = () => <CardTile/>;
export default class TabViewExample extends PureComponent {
  static title = 'Scrollable top bar';
  state = {
    index: 0,
    routes: [
      { key: '1', title: 'Complaints' },
      { key: '2', title: 'Social Buzz' },
    ],
  };

  _handleChangeTab = index => this.setState({ index });
  _renderHeader = props =>
  <View>
  <StatusBar backgroundColor="#3c4859" barStyle="light-content"/>
   {/*<View style={styles.headerColor}><Text style={styles.headerText} >NAMMA MLA</Text></View>*/}
  <TabBar style={{marginTop:0,fontSize:13,fontWeight: 'bold',
   backgroundColor:'#3c4859', borderColor: '#FFFF00'}}
   {...props}
   labelStyle={styles.label}
   tabStyle={styles.tab}
   indicatorStyle = {styles.indicator}
   />
  </View>;
  _renderScene = SceneMap({
    '1': FirstRoute,
    '2': SecondRoute,
  });

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onIndexChange={this._handleChangeTab}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tab : {},
  headerText : {
    fontSize:18, fontWeight: '500',marginTop: 10, marginLeft: 10, color: '#fff'
  },
  headerColor:{backgroundColor:'#3c4859', height: 40},
 indicator: {
   backgroundColor: '#fff',
 },
 label: {
   color: '#fff',
   fontWeight: '500',
   fontSize: 17
 }
});
