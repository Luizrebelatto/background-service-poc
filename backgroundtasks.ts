import * as BackgroundTasks from "expo-background-task";
import * as TaskManager from "expo-task-manager";
import { API_URL, BACKGROUND_TASK_IDENTIFIER, MINIMUM_INTERVAL } from "./src/constants";
import { Info } from "./src/types";
import { storeInfoHistory } from "./src/store";

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