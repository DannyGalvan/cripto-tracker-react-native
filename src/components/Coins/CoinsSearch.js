import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet } from 'react-native'
import colors from '../../res/colors'

export default class CoinsSearch extends Component {

    state ={
        query: "",
    }

    handleText = (query)=>{
        this.setState({query});

        if (this.props.onChange) {

            this.props.onChange(query)            
        }
    }

  render() {

    const {query} = this.state;

    return (
      <View>
        <TextInput style={styles.search} placeholder='Buscar Coins...'
        onChangeText={this.handleText}
        value={query}
        placeholderTextColor={colors.white}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    search:{
        color: colors.white,
        height: 46,
        backgroundColor: colors.charade,
        borderWidth: 1,
        borderColor: colors.white,
        borderBottomWidth: 2,
        borderBottomColor: colors.zircon, 
        borderRadius: 20,
        margin: 20,
        paddingLeft: 16
    }
})
