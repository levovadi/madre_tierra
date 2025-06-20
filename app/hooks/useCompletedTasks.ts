import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { getLastCompletedTasks } from '../src/services/DatabaseService';

export const useCompletedTasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<any[]>([]);
  const [searchName, setSearchName] = useState('');
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const data = await getLastCompletedTasks(100);
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      let filtered = [...tasks];

      if (searchName.trim() !== '') {
        filtered = filtered.filter((task) =>
          task.name.toLowerCase().includes(searchName.toLowerCase())
        );
      }

      filtered = filtered.filter((task) => {
        const taskDate = new Date(task.completed_at);
        return (
          taskDate.getDate() === date.getDate() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getFullYear() === date.getFullYear()
        );
      });

      setFilteredTasks(filtered.slice(0, 10));
    }, [tasks, searchName, date])
  );

  return {
    tasks,
    filteredTasks,
    searchName,
    setSearchName,
    date,
    setDate,
    loading,
    reload: fetchData,
  };
};
