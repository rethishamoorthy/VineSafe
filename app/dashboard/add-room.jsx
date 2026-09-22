
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function AddRoom() {
  const { id } = useLocalSearchParams();

const isEditMode = !!id;
  const [branchName, setBranchName] = useState("");
  const [city, setCity] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");
const handleSave = async () => {
  // ==============================
  // VALIDATION
  // ==============================

  if (!branchName.trim()) {
    Alert.alert("Validation Error", "Please enter branch name");
    return;
  }

  if (!city.trim()) {
    Alert.alert("Validation Error", "Please enter city");
    return;
  }

  if (!roomNumber.trim()) {
    Alert.alert("Validation Error", "Please enter room number");
    return;
  }

  if (!length.trim()) {
    Alert.alert("Validation Error", "Please enter room length");
    return;
  }

  if (Number(length) <= 0) {
    Alert.alert(
      "Validation Error",
      "Room length must be greater than 0"
    );
    return;
  }

  if (!height.trim()) {
    Alert.alert("Validation Error", "Please enter room height");
    return;
  }

  if (Number(height) <= 0) {
    Alert.alert(
      "Validation Error",
      "Room height must be greater than 0"
    );
    return;
  }

  // ==============================
  // ADD / UPDATE ROOM
  // ==============================

  try {
    const url = isEditMode
      ? `http://10.147.4.54:5000/api/room/update/${id}`
      : "http://10.147.4.54:5000/api/room/add";

    const method = isEditMode ? "PUT" : "POST";

    console.log(
      "ROOM MODE:",
      isEditMode ? "EDIT" : "ADD"
    );

    console.log("ROOM URL:", url);
    console.log("ROOM METHOD:", method);

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        branch_name: branchName.trim(),
        city: city.trim(),
        room_number: roomNumber.trim(),
        length: Number(length),
        height: Number(height),

        // Keep existing status while editing
        status: "Empty",
      }),
    });

    console.log("HTTP STATUS:", response.status);

    const result = await response.json();

    console.log("RESULT:", result);

    // ==============================
    // SUCCESS
    // ==============================

    if (response.ok) {
      Alert.alert(
        "Success",
        isEditMode
          ? "Room Updated Successfully"
          : "Room Added Successfully"
      );

      router.replace("/dashboard/view-rooms");

      return;
    }

    // ==============================
    // BACKEND ERROR
    // ==============================

    Alert.alert(
      isEditMode
        ? "Unable to Update Room"
        : "Unable to Add Room",
      result.message || "Something went wrong"
    );

  } catch (error) {
    console.log("FETCH ERROR:", error);

    Alert.alert(
      "Network Error",
      error.message
    );
  }
};
  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Add Storage Room
      </Text>

      <TextInput
        placeholder="Branch Name"
        value={branchName}
        onChangeText={setBranchName}
        style={styles.input}
      />

      <TextInput
        placeholder="City"
        value={city}
        onChangeText={setCity}
        style={styles.input}
      />

      <TextInput
        placeholder="Room Number"
        value={roomNumber}
        onChangeText={setRoomNumber}
        style={styles.input}
      />

      <TextInput
        placeholder="Room Length (m)"
        value={length}
        onChangeText={setLength}
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        placeholder="Room Height (m)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={handleSave}
      >
        <Text style={styles.buttonText}>
          Save Room
        </Text>
      </Pressable>

      <Pressable
        style={styles.viewButton}
        onPress={() =>router.push("/dashboard/view-rooms")}
      >
        <Text style={styles.viewButtonText}>
          View Rooms
        </Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    textAlign: "center",
    marginBottom: 30,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D9E5D8",
    fontSize: 15,
  },

  button: {
    backgroundColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  viewButton: {
    marginTop: 15,
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderColor: "#2E7D32",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  viewButtonText: {
    color: "#2E7D32",
    fontSize: 16,
    fontWeight: "bold",
  },
});