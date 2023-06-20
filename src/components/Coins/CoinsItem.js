import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native'
import colors from '../../res/colors';

export default function CoinsItem(props) {

  const {item, onPress} = props;

  const getImageArrow = ()=>{
    if (item.percent_change_1h > 0) {
        return require('../../assets/arrow_up.png');       
    }else{
        return require('../../assets/arrow_down.png');
    }
  }

  return (
    <Pressable onPress={onPress} style={styles.container}>
        <View style={styles.row}>
            <Text style={styles.nameText}>{item.name}</Text>
            <Text style={styles.symbolText}>{item.symbol}</Text>
            <Text style={styles.priceText}>{`$ ${item.price_usd}`}</Text>
        </View>

        <View style={styles.row}>
            <Text style={styles.percentText}>{item.percent_change_1h}</Text>
            <Image style={styles.imageIcon} source={getImageArrow()} />
        </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: "space-between",
        padding: 16,
        borderBottomColor: colors.zircon,
        borderBottomWidth: 1,
    },
    row:{
        flexDirection: 'row',
    },
    symbolText:{
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 14,
    },
    nameText:{
        color: colors.white,
        fontSize: 14
    },
    priceText:{
        color: colors.white,
        fontSize: 14,
        marginLeft: 14,
    },
    percentText:{
        color: colors.white,
        fontSize: 12,
        marginRight: 8

    },
    imageIcon:{
        width: 22,
        height: 22,
    },
})
