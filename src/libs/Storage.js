
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class Storage{
    static instance = new Storage();

    addFavorites = async (key, value)=>{
        try {
            await AsyncStorage.setItem(key, value)

            return true;
        } catch (error) {
            console.log(error);

            return false;
        }
    }

    getFavorites = async (key)=>{
        try {

            return await AsyncStorage.getItem(key);
            
        } catch (error) {
            console.log(error);

            throw Error(error)
        }
    }

    multiFavorites = async(keys)=>{
        try {
            return await AsyncStorage.multiGet(keys)

        } catch (error) {
            console.log(error);

               throw Error(error);
        }
    }

    getAllFavorites = async()=>{
        try {
            return await AsyncStorage.getAllKeys()
        } catch (error) {
            console.log(error);

           throw Error(error)
        }
    }

    removeFavorites = async (key)=>{
        try {

            await AsyncStorage.removeItem(key);

            return true;
            
        } catch (error) {
            console.log(error);

            return false;
        }
    }
}