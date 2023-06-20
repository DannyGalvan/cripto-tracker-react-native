import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import colors from '../../res/colors'
import FavoriteEmptyState from './FavoriteEmptyState'
import Storage from '../../libs/Storage'
import CoinsItem from '../Coins/CoinsItem'

export default class FavoriteScreen extends Component {

  state = {
    favorites: [],
  }

  getFavorites = async () => {
    try {
      const allKeys = await Storage.instance.getAllFavorites();

      const keys = allKeys.filter((key)=>key.includes("favorite"));

      const favs = await Storage.instance.multiFavorites(keys);

      const favorites = favs.map((fav)=>{
        return JSON.parse(fav[1]);
      })

      this.setState({favorites})
    } catch (error) {
      console.log(error);
    }
  }

  handlePress = (coin) =>{
    this.props.navigation.navigate('Details', {coin})
  }

  componentDidMount(){
    this.getFavorites();
    this.props.navigation.addListener("focus", this.getFavorites);
  }

  componentWillUnmount(){
    this.props.navigation.removeListener("focus", this.getFavorites);
  }

  render() {

    const {favorites} = this.state;

    return (
      <View style={styles.container}>
        {
          favorites.length == 0 ?
          <FavoriteEmptyState/> :
          <FlatList
            data = {favorites}
            renderItem = {({item})=><CoinsItem item={item}
            onPress = {()=>this.handlePress(item)}/>}
          />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.charade,
        flex: 1,

    }
})
