import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, SectionList, FlatList, Pressable, Alert } from 'react-native'
import Http from '../../libs/http'
import colors from '../../res/colors'
import CoinMarketItem from './CoinMarketItem'
import Storage from '../../libs/Storage';

export default class CoinsDetailScreen extends Component {

    state = {
        coin: {},
        markets: [],
        isFavorite: false,
    }

    toogleFavorite = async()=>{
        if (this.state.isFavorite) {
            this.removeFavorite();
        }else{
            this.addFavorite();
        }
    }

    addFavorite = async()=>{
        const coin = JSON.stringify(this.state.coin);
        const key = `favorite${this.state.coin.id}`;

        const stored = await Storage.instance.addFavorites(key, coin) 

        console.log("stored", stored);  

        if (stored) {
            this.setState({isFavorite: true});
        }
    }

    removeFavorite = async()=>{
        Alert.alert("Remove Favorite", "Are You Sure?", [
            {
                text: "Cancel",
                onPress: ()=>{},
                style: "cancel"
            },
            {
                text: "Remove",
                onPress: async()=>{
                    const key = `favorite${this.state.coin.id}`;

                    const stored = await Storage.instance.removeFavorites(key) 
            
                    console.log("stored", stored);  

                    if (stored) {
                        this.setState({isFavorite: false});
                    }
                },
                style: "destructive"
            }
        ])

       

       
    }

    getFavorite = async()=>{
       try {
            const key = `favorite${this.state.coin.id}`;

            const stored = await Storage.instance.getFavorites(key)

            console.log("fav", stored);

            if (stored != null) {
                this.setState({isFavorite: true})
            }

       } catch (error) {
            console.log(error);
       }



    }


    getSymbolIcon = (symbolStr)=>{

        if (symbolStr) {
            const symbol = symbolStr.toLowerCase().replace(" ", "-");

            return `https://c1.coinlore.com/img/16x16/${symbol}.png`;
        }    

    }

    getSections = (coin)=>{
        const section = [
            {
                title: "Market Cap",
                data: [coin.market_cap_usd],
            },
            {
                title: "Volume 24hrs",
                data: [coin.volume24],
            },
            {
                title: "Change 24hrs",
                data: [coin.percent_change_24h],
            },
        ]

        return section;
    }

    getMarkets = async(coinId)=>{
        const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;

        const markets = await Http.instance.get(url);

        this.setState({markets});
    }

    componentDidMount(){
       try {
        const {coin} = this.props.route.params

        console.log('detalles',coin);

        this.props.navigation.setOptions({title: coin.symbol})

        this.getMarkets(coin.id);

        this.setState({coin}, ()=>{
            this.getFavorite()
        });
       } catch (error) {
        console.log(error);
       }
    }

  render() {

    const {coin, markets, isFavorite} = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.subHeader}>
            <View style={styles.row}>
                <Image style={styles.img} source={{ uri: this.getSymbolIcon(coin.name) }}/>
                <Text style={styles.titleText}>{coin.name}</Text>
            </View>
            <View>
                <Pressable 
                   onPress={this.toogleFavorite}
                    style={[styles.btnFavorite, isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd]}>
                    <Text style={styles.btnFavoriteText}>{isFavorite ? "Remove Favorite" : "Add Favorite"}</Text>
                </Pressable>
            </View>               
        </View>

        <SectionList
            style={styles.sectionList}
            sections={this.getSections(coin)}
            keyExtractor={(item) => item}
            renderItem={({item})=>
                <View style={styles.sectionItem}>
                    <Text style={styles.itemText}>{item}</Text>
                </View>
            }
            renderSectionHeader={({section})=> 
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionText}>{section.title}</Text>
                </View>
            }
        />

        <Text style={styles.marketTitle}>Markets</Text>
        <FlatList
            style={styles.list}
            horizontal={true}
            data = {markets}
            renderItem={({item})=> <CoinMarketItem item={item}/>}
        />
      </View>
    )}
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: colors.charade,
        flex: 1,
    },
    row:{
        flexDirection: 'row',
    },
    subHeader:{
        backgroundColor: "rgba(0,0,0,0.1)",
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sectionList:{
        maxHeight: 220
    },
    titleText:{
        fontSize: 16,
        color: colors.white,
        fontWeight: 'bold',
        marginLeft: 8
    },
    img:{
        width: 25,
        height: 25
    },
    sectionHeader:{
        backgroundColor: "rgba(0,0,0,0.2)",
        padding: 8,
    },
    sectionItem:{
        padding: 8,
    },
    itemText:{
        color: colors.white,
        fontSize: 14,
    },
    sectionText:{
        color: colors.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    marketTitle:{
        color: colors.white,
        fontWeight: 'bold',
        fontSize: 16,
        paddingBottom: 10
    },
    list:{
        maxHeight: 100,
        paddingLeft: 16,      
        paddingRight: 16,
    },
    btnFavorite:{
        padding: 8,
        borderRadius: 8,
    },
    btnFavoriteText:{
        color: colors.white,

    },
    btnFavoriteAdd:{
        backgroundColor: colors.picton,
    },
    btnFavoriteRemove:{
        backgroundColor: colors.carmine,
    }

})
