import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Alert,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tasksData from '../data/tasks.json';
import { initDB, saveCompletedTask } from '../src/services/DatabaseService';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();
  const task = tasksData.find(t => t.id === Number(id));

  useEffect(() => {
    initDB();
    navigation.setOptions({ title: 'Task Details' });
  }, []);

  const handleMarkComplete = async () => {
    if (!task) return;
    try {
      await saveCompletedTask(task.id, task.name);
      Alert.alert('✅ Completed', 'Task marked as complete!');
    } catch (error) {
      console.error('Error saving task:', error);
      Alert.alert('❌ Error', 'Could not save task.');
    }
  };

  if (!task) {
    return (
      <View style={styles.centered}>
        <Text>Task not found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.description}>
          {task.description ||
            'No description available for this task at the moment.'}
        </Text>

        <Text style={styles.sectionTitle}>Season</Text>
        <Text style={styles.sectionContent}>{task.season}</Text>

        <Text style={styles.sectionTitle}>Frequency</Text>
        <Text style={styles.sectionContent}>{task.frequency}</Text>

        <Text style={styles.sectionTitle}>Notes</Text>
        <Text style={styles.sectionContent}>
          {Platform.OS === 'ios'
            ? 'This task is critical on iOS. Use iOS-optimized tools when applicable.'
            : 'This task is important across platforms. Be thorough during execution.'}
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.button} onPress={handleMarkComplete}>
          <Text style={styles.buttonText}>Mark as complete</Text>
        </Pressable>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    paddingBottom: 100, // To avoid being hidden behind button
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#444',
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  sectionContent: {
    fontSize: 16,
    color: '#444',
    marginBottom: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    backgroundColor: '#007AFF',
    borderRadius: Platform.OS === 'ios' ? 12 : 6,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
