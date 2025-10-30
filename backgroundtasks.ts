import * as BackgroundTasks from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_TASK_IDENTIFIER = "fetch-info-tasks";
const MINIMUM_INTERVAL = 15;
const INFO_HISTORY_KEY = "@info_history";
const MAX_INFO_HISTORY = 10;
const API_URL = "https://zenquotes.io/api/random"


export type Info = {
    q: string;
    a: string;
    h: string;
    timestamp: number;
}

type InfoHistory = Info[]

export const initializeBackgroundTask = async (innerAppMountedPromise: Promise<void>) => {
    TaskManager.defineTask(BACKGROUND_TASK_IDENTIFIER, async () => {
        console.log("Task started")
        await innerAppMountedPromise;

        try {
            const response = await fetch(API_URL);
            const infos: Info[] = await response.json();

            if(infos && infos.length > 0){
                await storeInfoHistory(infos[0])
            }
        } catch (error) {
            console.log("Error fetching Info: ", error)
        }
        

        console.log("Task done ")
    })

    if (!(await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_IDENTIFIER))) {
        await BackgroundTasks.registerTaskAsync(BACKGROUND_TASK_IDENTIFIER, {
            minimumInterval: MINIMUM_INTERVAL
        })
    }
}

async function storeInfoHistory(info: Info){
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