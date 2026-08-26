import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RoomAllocation() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>Room Allocation</Text>

      {/* Add Room */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/dashboard/add-room')}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="add-circle-outline"
            size={42}
            color="#2E7D32"
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Add Room</Text>
          <Text style={styles.cardDescription}>
            Add a new storage room
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#777"
        />
      </TouchableOpacity>

      {/* View Rooms */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push('/dashboard/view-rooms')}
      >
        <View style={styles.iconBox}>
          <Ionicons
            name="eye-outline"
            size={42}
            color="#2E7D32"
          />
        </View>

        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>View Rooms</Text>
          <Text style={styles.cardDescription}>
            View all available storage rooms
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={24}
          color="#777"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7F5',
    padding: 20,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
    marginTop: 30,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    marginBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',

    elevation: 4,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardContent: {
    flex: 1,
    marginLeft: 16,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: '#222',
    marginBottom: 5,
  },

  cardDescription: {
    fontSize: 14,
    color: '#777',
  },
});