import { INFO_HISTORY_KEY, MAX_INFO_HISTORY } from "./constants";
import { Info, InfoHistory } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeInfoHistory(info: Info){
    const history_info = await AsyncStorage.getItem(INFO_HISTORY_KEY);
    const history: InfoHistory = history_info ? JSON.parse(history_info) : [] ;

    const newInfo = {
        ...info,
        timestamp: Date.now()
    }

    const updateInfo = [newInfo, ...history].slice(0, MAX_INFO_HISTORY);

    await AsyncStorage.setItem(INFO_HISTORY_KEY, JSON.stringify(updateInfo));

    return updateInfo;
}

export const getInfoHistory = async (): Promise<InfoHistory | null> => {
    try {
        const history_info = await AsyncStorage.getItem(INFO_HISTORY_KEY);
        return history_info ? JSON.parse(history_info) : [] ;
    } catch (error) {
        console.log(`Error fetching info history: ${error}`)
        return null;
    }
}