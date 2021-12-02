import * as React from 'react';
import { StyleSheet, View, Text,TouchableOpacity } from 'react-native';
import { Test } from 'react-native-swipe-menu';

const TabBar = ({item,focused}: any) => {
  return <View style={{justifyContent: 'center',alignItems: 'center'}}>
     <Text style={{color: focused ? "pink" : "#310438"}}>{item.title}</Text>
  </View>
}

const RenderContent = ({item} : any) => {
  return <View style={{flex: 1,backgroundColor: 'pink'}}>
    <TouchableOpacity>
       <Text style={{color:"#310438"}}>{item.data}</Text>
    </TouchableOpacity>
  </View>
}

const TabComponent= [
  {
    title: 'Home',
    data: 'hello'
  },
  {
    title: 'Card',
    data: 'hello world'
  },
  {
    title: 'Wish',
    data: 'hello world'
  },
  {
    title: 'Profile',
    data: 'hello world',
  }
];

export default function App() {
  return (
    <View style={styles.container}>
      <Test 
        RenderContent={RenderContent}
        TabBar={TabBar}
        TabComponent={TabComponent}
        tabOptions={{
          tabStyle: {
            backgroundColor: 'red'
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
