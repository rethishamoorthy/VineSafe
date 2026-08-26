
import { useCallback, useState } from "react";
import { router, useFocusEffect } from "expo-router";


import {
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";

import api from "../../services/api";

export default function ViewRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRooms = async () => {
    try {
      const response = await api.get("/room/all");

      console.log("ROOMS:", response.data);

      if (response.data.success) {
  console.log("ROOM STATUS FROM API:", response.data.rooms);

  setRooms(response.data.rooms || []);
} else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to fetch rooms"
        );
      }
    } catch (error) {
      console.log("FETCH ROOMS ERROR:", error);

      Alert.alert("Error", "Failed to fetch rooms");
    } finally {
      setLoading(false);
    }
  };
const deleteRoom = async (roomId) => {
  try {
    const response = await api.delete(`/room/delete/${roomId}`);

    if (response.data.success) {
      Alert.alert("Success", "Room deleted successfully");

      fetchRooms();
    } else {
      Alert.alert(
        "Error",
        response.data.message || "Failed to delete room"
      );
    }
  } catch (error) {
    console.log("DELETE ROOM ERROR:", error);

    Alert.alert(
      "Error",
      "Failed to delete room"
    );
  }
};
  useFocusEffect(
  useCallback(() => {
    fetchRooms();
  }, [])
);
  // Loading screen
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2E7D32" />

        <Text style={styles.loadingText}>
          Loading rooms...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Storage Rooms
      </Text>

      {rooms.length === 0 ? (
        <View style={styles.center}>
          <Text style={styles.noRooms}>
            No storage rooms found.
          </Text>
        </View>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={(item) =>
            String(item.room_id)
          }
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable
  style={styles.card}
  onPress={() =>
    router.push(
      `/dashboard/room-details?id=${item.room_id}`
    )
  }
>
  <Pressable
    style={styles.menuButton}
    onPress={() => {
      Alert.alert(
        "Room Options",
        "Choose an action",
        [
          {
            text: "Edit Room",
            onPress: () =>
              router.push(
                `/dashboard/add-room?id=${item.room_id}`
              ),
          },
          {
  text: "Delete Room",
  style: "destructive",
  onPress: () => {
    Alert.alert(
      "Delete Room",
      `Are you sure you want to delete Room ${item.room_number}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteRoom(item.room_id),
        },
      ]
    );
  },
},
          
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    }}
  >
    <Text style={styles.menuDots}>⋮</Text>
  </Pressable>

  <Text style={styles.title}>
    Room : {item.room_number}
  </Text>

  <Text style={styles.detail}>
    Branch : {item.branch_name}
  </Text>

  <Text style={styles.detail}>
    City : {item.city}
  </Text>

  <Text style={styles.detail}>
    Size : {item.length} m × {item.height} m
  </Text>

  <View
    style={[
      styles.statusBox,
      item.status === "Occupied"
        ? styles.occupied
        : styles.empty,
    ]}
  >
    <Text
      style={[
        styles.statusText,
        item.status === "Occupied"
          ? styles.occupiedText
          : styles.emptyText,
      ]}
    >
      {item.status}
    </Text>
  </View>

  <Text style={styles.viewDetails}>
    View Room Details →
  </Text>
</Pressable>
          )}
        />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
    paddingHorizontal: 15,
    paddingTop: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 20,
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D9E5D8",
    elevation: 4,
  },

  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 12,
  },

  detail: {
    fontSize: 15,
    color: "#444",
    marginBottom: 7,
  },

  statusBox: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 5,
  },

  empty: {
    backgroundColor: "#E8F5E9",
  },

  occupied: {
    backgroundColor: "#FFEBEE",
  },

  statusText: {
    fontWeight: "bold",
  },

  emptyText: {
    color: "#2E7D32",
  },

  occupiedText: {
    color: "#D32F2F",
  },

  viewDetails: {
    color: "#2E7D32",
    fontWeight: "bold",
    marginTop: 15,
    textAlign: "right",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  noRooms: {
    fontSize: 17,
    color: "#666",
  },
menuButton: {
  position: "absolute",
  right: 12,
  top: 10,
  width: 35,
  height: 35,
  justifyContent: "center",
  alignItems: "center",
  zIndex: 10,
},

menuDots: {
  fontSize: 26,
  fontWeight: "bold",
  color: "#555",
},
});

