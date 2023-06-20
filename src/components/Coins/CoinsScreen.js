import React, { Component, useState, useEffect } from 'react'
import { Text, View, Pressable, StyleSheet, FlatList, ActivityIndicator } from 'react-native'
import Http from '../../libs/http';
import CoinsItem from './CoinsItem';
import colors from '../../res/colors';
import CoinsSearch from './CoinsSearch';

export default class CoinsScreen extends Component {

  state = {
    coins: [],
    oldCoins: [],
    loading: false,
  }

  componentDidMount = () =>{
    this.getCoins();
  } 

  getCoins = async()=>{
    this.setState({loading: true});
    const data = await Http.instance.get('https://api.coinlore.net/api/tickers/');

    this.setState({coins: data.data, oldCoins: data.data, loading: false})
  }

  handlePress = (coin) =>{

    this.props.navigation.navigate('Details',{coin})
  }

  handleSearch = (query) =>{
    const {oldCoins} = this.state;

    const coinsFilter = oldCoins.filter((coin)=>{
      return coin.name.toLowerCase().includes(query.toLowerCase()) 
      ||     coin.symbol.toLowerCase().includes(query.toLowerCase());
    });

    this.setState({coins: coinsFilter})
  }

  render() {

    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinsSearch onChange={this.handleSearch}/>
        {loading ? 
        <ActivityIndicator
          style={styles.spinner}
          color={'#fff'}
          size='large'/> : true
        }
        <FlatList
          data={coins}
          renderItem={({item})=> 
          <CoinsItem item={item} onPress={()=> this.handlePress(item)}/>}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: colors.charade,
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
  },
  btn:{
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8,
    margin: 16,
  },
  btnText:{
    color: '#fff',
    textAlign: 'center'
  },
  spinner:{
    marginTop: 60,
  }
})


