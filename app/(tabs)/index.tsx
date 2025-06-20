// screens/HomeScreen.tsx
import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFilteredTasks } from '../../app/hooks/useFilteredTasks';
import TaskCard from '../../components/TaskCard';


const seasons = ['Todas', 'Primavera', 'Verano', 'Otoño', 'Invierno'];

const HomeScreen = () => {
  const router = useRouter();
  const {
    filteredTasks,
    seasonFilter,
    setSeasonFilter,
    search,
    setSearch,
  } = useFilteredTasks();

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const renderFilters = () => (
    <View style={styles.filtersContainer}>
      <TextInput
        placeholder="Buscar tarea..."
        style={styles.searchInput}
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.filters}>
        {seasons.map((season) => (
          <Pressable
            key={season}
            style={[
              styles.filterButton,
              seasonFilter === season && styles.selectedButton,
            ]}
            onPress={() => setSeasonFilter(season)}
          >
            <Text
              style={[
                styles.filterText,
                seasonFilter === season && styles.selectedText,
              ]}
            >
              {season}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderTaskList = () => (
    <FlatList
      data={filteredTasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskCard task={item} />}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['left', 'right']}>
      <View style={[styles.container, isLandscape && styles.containerLandscape]}>
        {isLandscape ? (
          <>
            <View style={styles.leftPanel}>{renderFilters()}</View>
            <View style={styles.rightPanel}>{renderTaskList()}</View>
          </>
        ) : (
          <>
            {renderFilters()}
            {renderTaskList()}
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  containerLandscape: {
    flexDirection: 'row',
    padding: 0,
  },
  leftPanel: {
    width: '35%',
    padding: 16,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    backgroundColor: '#fafafa',
  },
  rightPanel: {
    width: '65%',
    padding: 16,
  },
  filtersContainer: {
    flexDirection: 'column',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    backgroundColor: '#eef0f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedButton: {
    backgroundColor: '#007bff',
  },
  filterText: {
    color: '#333',
  },
  selectedText: {
    color: '#fff',
  },
});

export default HomeScreen;
