import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

// Define types
interface Recording {
  id: string;
  uri: string;
  duration: number; // in seconds
  date: Date;
  size?: number; // in bytes
}

interface UseRecordingReturn {
  recording: Audio.Recording | null;
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<Recording | null>;
  pauseRecording: () => Promise<void>;
  resumeRecording: () => Promise<void>;
  savedRecordings: Recording[];
  loadRecordings: () => Promise<void>;
}

export function useRecording(): UseRecordingReturn {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState<Recording[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  // Start a timer to track recording duration
  const startTimer = () => {
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setRecordingTime(accumulatedTimeRef.current + elapsedTime);
    }, 1000);
  };

  // Stop the timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Pause the timer and accumulate time
  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      accumulatedTimeRef.current += elapsedTime;
    }
  };

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Request permission to record audio
  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required', 
          'VoiceAlchemy needs access to your microphone to record audio.',
          [{ text: 'OK' }]
        );
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error requesting audio permissions:', error);
      return false;
    }
  };

  // Configure audio mode for recording
  const configureAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error configuring audio mode:', error);
    }
  };

  // Start recording
  const startRecording = async () => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      await configureAudio();
      
      // Reset timer values
      setRecordingTime(0);
      accumulatedTimeRef.current = 0;
      
      // Start new recording
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      
      setRecording(newRecording);
      setIsRecording(true);
      setIsPaused(false);
      startTimer();
    } catch (error) {
      console.error('Error starting recording:', error);
      Alert.alert('Recording Error', 'Failed to start recording. Please try again.');
    }
  };

  // Stop recording and save
  const stopRecording = async () => {
    if (!recording) return null;
    
    try {
      stopTimer();
      await recording.stopAndUnloadAsync();
      
      const uri = recording.getURI();
      if (!uri) throw new Error('Recording URI is null');
      
      // Get file info
      const fileInfo = await FileSystem.getInfoAsync(uri);
      const recordingId = uuidv4();
      
      const newRecording: Recording = {
        id: recordingId,
        uri,
        duration: recordingTime,
        date: new Date(),
        size: fileInfo.size,
      };

      // Save to local storage
      await saveRecordingMetadata(newRecording);
      
      // Update state
      setSavedRecordings(prev => [...prev, newRecording]);
      setRecording(null);
      setIsRecording(false);
      setIsPaused(false);

      return newRecording;
    } catch (error) {
      console.error('Error stopping recording:', error);
      Alert.alert('Recording Error', 'Failed to save recording. Please try again.');
      return null;
    }
  };

  // Pause recording
  const pauseRecording = async () => {
    if (!recording || !isRecording || isPaused) return;

    try {
      await recording.pauseAsync();
      setIsPaused(true);
      pauseTimer();
    } catch (error) {
      console.error('Error pausing recording:', error);
    }
  };

  // Resume recording
  const resumeRecording = async () => {
    if (!recording || !isRecording || !isPaused) return;

    try {
      await recording.startAsync();
      setIsPaused(false);
      startTimer();
    } catch (error) {
      console.error('Error resuming recording:', error);
    }
  };

  // Save recording metadata to AsyncStorage
  const saveRecordingMetadata = async (recording: Recording) => {
    try {
      const existingRecordingsJSON = await AsyncStorage.getItem('recordings');
      let recordings: Recording[] = [];
      
      if (existingRecordingsJSON) {
        recordings = JSON.parse(existingRecordingsJSON);
      }
      
      recordings.push(recording);
      await AsyncStorage.setItem('recordings', JSON.stringify(recordings));
    } catch (error) {
      console.error('Error saving recording metadata:', error);
    }
  };

  // Load saved recordings from storage
  const loadRecordings = async () => {
    try {
      const recordings = await AsyncStorage.getItem('recordings');
      if (recordings) {
        setSavedRecordings(JSON.parse(recordings));
      }
    } catch (error) {
      console.error('Error loading recordings:', error);
    }
  };

  // Load recordings on component mount
  useEffect(() => {
    loadRecordings();
  }, []);

  return {
    recording,
    isRecording,
    isPaused,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    savedRecordings,
    loadRecordings,
  };
}