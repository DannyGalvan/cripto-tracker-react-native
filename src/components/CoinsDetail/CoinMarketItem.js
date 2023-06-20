import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import colors from '../../res/colors';

export default function CoinMarketItem(props) {

    const {item} = props;

    return (
      <View style={styles.container}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.nameText}>{item.price_usd}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderColor: colors.zircon,
        borderWidth: 1,
        padding: 16,
        marginRight: 8,
        alignItems: 'center',
        borderRadius: 20,
        minWidth: 200
    },
    nameText:{
        color: colors.white,
        fontWeight: 'bold',
    },
    priceText:{
        color: colors.white
    }
})
