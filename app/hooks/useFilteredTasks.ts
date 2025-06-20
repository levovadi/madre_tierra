import { useEffect, useState } from 'react';
import tasksData from '../data/tasks.json';

type Task = {
  id: number;
  name: string;
  description: string;
  frequency: string;
  season: string;
  image?: string;
};

export const useFilteredTasks = () => {
  const [seasonFilter, setSeasonFilter] = useState('Todas');
  const [search, setSearch] = useState('');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    let tasks = tasksData as Task[];

    if (seasonFilter !== 'Todas') {
      tasks = tasks.filter((task) => task.season === seasonFilter);
    }

    if (search.trim() !== '') {
      tasks = tasks.filter((task) =>
        task.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredTasks(tasks);
  }, [seasonFilter, search]);

  return {
    filteredTasks,
    seasonFilter,
    setSeasonFilter,
    search,
    setSearch,
  };
};
