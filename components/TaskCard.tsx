// components/TaskCard.tsx
import { router } from 'expo-router';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

interface TaskCardProps {
  id: Number;
  name: string;
  description: string;
  frequency: string;
  image: string;
}

type Props = {
  task: TaskCardProps;
};

export default function TaskCard({ task }: Props) {
  const handlePress = () => {
    router.navigate({
      pathname: '/tasks/[id]' as any,
      params: { id: String(task.id) }, // 👈 esto es clave
    });
  };

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <View>
        <Image source={{ uri: task.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{task.name}</Text>
        <Text style={styles.desc}>{task.description}</Text>
        <Text style={styles.freq}>Frecuencia: {task.frequency}</Text>
      </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    padding: 12,
    marginVertical: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  desc: {
    color: '#555',
    marginVertical: 4,
  },
  freq: {
    color: '#888',
    fontSize: 12,
  },
});
