import React, { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Info, getInfoHistory, initializeBackgroundTask } from './backgroundtasks';
import * as TaskManager from "expo-task-manager";

TaskManager.getRegisteredTasksAsync().then((task) => {
  console.log(task)
})

let resolver: (() => void) | null;

const promise = new Promise<void>((resolve) => {
  resolver = resolve;
});

initializeBackgroundTask(promise)

export default function App() {
  const [infoHistory, setInfoHistory] = useState<Info[]>([]);
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    if(resolver){
      resolver();
      console.log("resolver called")
    }
    loadInfoHistory();

    const appStateSubscription = AppState.addEventListener(
      "change",
      (nextAppState: AppStateStatus) => {
        if (
          appState.current.match(/inactive|background/) &&
          nextAppState === "active"
        ) {
          loadInfoHistory()
        }
        if (appState.current.match(/active/) && nextAppState === "background") {
          console.log("App has gone to the background!");
        }
        appState.current = nextAppState;
      }
    );

    return () => {
      appStateSubscription.remove();
    };
  },[])

  const loadInfoHistory = async () => {
    const history = await getInfoHistory();

    if(history){
      setInfoHistory(history);
    }
  }

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.textContainer}></View>

      <View style={styles.quotesContainer}>
        <Text style={styles.sectionTitle}>Latest Quote:</Text>
        {infoHistory.length > 0 ? (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>"{infoHistory[0].q}"</Text>
            <Text style={styles.authorText}>- {infoHistory[0].a}</Text>
            <Text style={styles.timestamp}>
              {new Date(infoHistory[0].timestamp).toLocaleString()}
            </Text>
          </View>
        ) : (
          <Text>No Infos available yet</Text>
        )}

        {infoHistory.length > 1 && (
          <>
            <Text style={[styles.sectionTitle, styles.previousTitle]}>
              Previous Infos:
            </Text>
            {infoHistory.slice(1).map((info, index) => (
              <View
                key={index}
                style={[
                  styles.infoContainer,
                  index === 0 && styles.previousQuote,
                ]}
              >
                <Text style={styles.infoText}>"{info.q}"</Text>
                <Text style={styles.authorText}>- {info.a}</Text>
                <Text style={styles.timestamp}>
                  {new Date(info.timestamp).toLocaleString()}
                </Text>
              </View>
            ))}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  textContainer: {
    margin: 10,
    marginTop: 60,
  },
  boldText: {
    fontWeight: "bold",
  },
  quotesContainer: {
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  previousTitle: {
    marginTop: 20,
  },
  infoContainer: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  previousQuote: {
    backgroundColor: "#e8e8e8",
    opacity: 0.8,
  },
  infoText: {
    fontSize: 16,
    fontStyle: "italic",
    marginBottom: 8,
  },
  authorText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    marginBottom: 8,
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
    textAlign: "right",
  },
});
