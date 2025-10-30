import * as BackgroundTasks from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKGROUND_TASK_IDENTIFIER = "fetch-info-tasks";
const MINIMUM_INTERVAL = 15;
const INFO_HISTORY_KEY = "@info_history";
const MAX_INFO_HISTORY = 10;


export type Info = {
    title: string;
    description: string;
    author: string;
    timestamp: number;
}

type InfoHistory = Info[]