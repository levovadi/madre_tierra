import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCompletedTasks } from '../../app/hooks/useCompletedTasks';

export default function ProfileScreen() {
  const {
    filteredTasks,
    searchName,
    setSearchName,
    date,
    setDate,
    loading,
  } = useCompletedTasks();

  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
    <View style={{ flex: 1 }}>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.input}
          placeholder="Buscar por nombre"
          value={searchName}
          onChangeText={setSearchName}
        />
        <Button
          title={`Filtrar por fecha: ${date.toLocaleDateString()}`}
          onPress={() => setShowPicker(true)}
          color="#007AFF"
        />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => `${item.task_id}-${item.completed_at}`}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.row}>
              <FontAwesome name="check-circle" size={24} color="green" />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.details}>ID: {item.task_id}</Text>
                <Text style={styles.details}>
                  Completado el: {new Date(item.completed_at).toLocaleString()}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
