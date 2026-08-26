
import React, { useCallback, useState } from "react";

import {
  router,
  useFocusEffect,
  useLocalSearchParams,
} from "expo-router";

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import api from "../../services/api";

export default function FarmerDetails() {
  // ==================================================
  // SELECTED ROOM
  // ==================================================

  const { id } = useLocalSearchParams();

  console.log("SELECTED ROOM ID:", id);

  // ==================================================
  // STATES
  // ==================================================

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ==================================================
  // FARMER DETAILS
  // ==================================================

  const [farmerName, setFarmerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");

  // ==================================================
  // RENT DETAILS
  // ==================================================

  const [rentAmount, setRentAmount] = useState("");
  const [securityDeposit, setSecurityDeposit] = useState("");
  const [paymentDueDate, setPaymentDueDate] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [rentalStartDate, setRentalStartDate] = useState("");
  const [rentalEndDate, setRentalEndDate] = useState("");

  // ==================================================
  // GET ROOMS
  // ==================================================

  const fetchRooms = async () => {
    try {
      const response = await api.get("/room/all");

      console.log("ROOM API RESPONSE:", response.data);

      if (response.data.success) {
        setRooms(response.data.rooms || []);
      } else {
        Alert.alert(
          "Error",
          response.data.message || "Failed to fetch rooms"
        );
      }
    } catch (error) {
      console.log("FETCH ROOMS ERROR:", error);

      Alert.alert(
        "Error",
        "Failed to fetch rooms"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // REFRESH
  // ==================================================

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchRooms();
    }, [])
  );

  // ==================================================
  // SAVE FARMER
  // ==================================================

  const handleSave = async () => {
    if (saving) {
      return;
    }

    // ==================================================
    // VALIDATION
    // ==================================================

    if (!farmerName.trim()) {
      Alert.alert("Error", "Please enter farmer name");
      return;
    }

    if (!phone.trim()) {
      Alert.alert("Error", "Please enter phone number");
      return;
    }

    if (!address.trim()) {
      Alert.alert("Error", "Please enter address");
      return;
    }

    if (!village.trim()) {
      Alert.alert("Error", "Please enter village");
      return;
    }

    if (!district.trim()) {
      Alert.alert("Error", "Please enter district");
      return;
    }

    if (!state.trim()) {
      Alert.alert("Error", "Please enter state");
      return;
    }

    if (!rentalStartDate.trim()) {
      Alert.alert(
        "Error",
        "Please enter rental start date"
      );
      return;
    }

    if (!rentalEndDate.trim()) {
      Alert.alert(
        "Error",
        "Please enter rental end date"
      );
      return;
    }

    if (!id) {
      Alert.alert(
        "Error",
        "No room selected"
      );
      return;
    }

    // ==================================================
    // SAVE
    // ==================================================

    try {
      setSaving(true);

      // ==================================================
      // FARMER CODE
      // ==================================================

      const farmerCode =
        `F${Date.now().toString().slice(-6)}`;

      // ==================================================
      // FARMER DATA
      // ==================================================

      const farmerData = {
        farmer_code: farmerCode,
        name: farmerName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        village: village.trim(),
        district: district.trim(),
        state: state.trim(),
      };

      console.log("CREATING FARMER:");
      console.log(farmerData);

      // ==================================================
      // CREATE FARMER
      // ==================================================

      const farmerResponse = await api.post(
        "/farmer/add",
        farmerData
      );

      console.log(
        "FARMER RESPONSE:",
        farmerResponse.data
      );

      if (!farmerResponse.data.success) {
        Alert.alert(
          "Farmer Error",
          farmerResponse.data.message ||
            "Failed to create farmer"
        );

        return;
      }

      // ==================================================
      // FARMER ID
      // ==================================================

      const farmerId =
        farmerResponse.data.farmerId;

      console.log(
        "NEW FARMER ID:",
        farmerId
      );

      if (!farmerId) {
        Alert.alert(
          "Error",
          "Farmer created but ID was not returned."
        );

        return;
      }

      // ==================================================
      // ALLOCATION DATA
      // ==================================================

      const allocationData = {
        room_id: Number(id),
        farmer_id: Number(farmerId),

        start_date:
          rentalStartDate.trim(),

        end_date:
          rentalEndDate.trim(),

        status: "Active",

        notes: null,

        rent_amount:
          Number(rentAmount) || 0,

        security_deposit:
          Number(securityDeposit) || 0,

        payment_due_date:
          paymentDueDate.trim() || null,

        payment_status:
          paymentStatus || "Pending",
      };

      console.log(
        "CREATING ALLOCATION:"
      );

      console.log(
        allocationData
      );

      // ==================================================
      // CREATE ALLOCATION
      // ==================================================

      const allocationResponse =
        await api.post(
          "/allocation",
          allocationData
        );

      console.log(
        "ALLOCATION RESPONSE:",
        allocationResponse.data
      );

      if (!allocationResponse.data.success) {
        Alert.alert(
          "Allocation Error",
          allocationResponse.data.message ||
            "Allocation failed"
        );

        return;
      }

      // ==================================================
      // SUCCESS
      // ==================================================

      Alert.alert(
        "Success",
        "Farmer and room allocation saved successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              router.back();
            },
          },
        ]
      );

    } catch (error) {
      console.log(
        "SAVE ERROR:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        error?.response?.data?.message ||
          "Failed to save farmer and allocation"
      );
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // LOADING
  // ==================================================

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading rooms...
        </Text>
      </View>
    );
  }

  // ==================================================
  // FARMER FORM
  // ==================================================

  if (id) {
    return (
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <View style={styles.container}>

          <ScrollView
            style={styles.formContainer}
            contentContainerStyle={
              styles.formContent
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >

            {/* TITLE */}

            <Text style={styles.formTitle}>
              Enter Farmer Details
            </Text>

            <Text style={styles.selectedRoom}>
              Selected Room ID: {id}
            </Text>

            {/* FARMER NAME */}

            <TextInput
              style={styles.input}
              placeholder="Enter Farmer Name"
              value={farmerName}
              onChangeText={setFarmerName}
            />

            {/* PHONE */}

            <TextInput
              style={styles.input}
              placeholder="Enter Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={15}
            />

            {/* ADDRESS */}

            <TextInput
              style={[
                styles.input,
                styles.addressInput,
              ]}
              placeholder="Enter Full Address"
              value={address}
              onChangeText={setAddress}
              multiline
            />

            {/* VILLAGE */}

            <TextInput
              style={styles.input}
              placeholder="Enter Village"
              value={village}
              onChangeText={setVillage}
            />

            {/* DISTRICT */}

            <TextInput
              style={styles.input}
              placeholder="Enter District"
              value={district}
              onChangeText={setDistrict}
            />

            {/* STATE */}

            <TextInput
              style={styles.input}
              placeholder="Enter State"
              value={state}
              onChangeText={setState}
            />

            {/* RENT DETAILS */}

            <View style={styles.rentContainer}>

              <Text style={styles.rentTitle}>
                Rent Details
              </Text>

              {/* RENT */}

              <TextInput
                style={styles.input}
                placeholder="Rent Amount (₹ per month)"
                value={rentAmount}
                onChangeText={setRentAmount}
                keyboardType="numeric"
              />

              {/* SECURITY */}

              <TextInput
                style={styles.input}
                placeholder="Security Deposit (₹)"
                value={securityDeposit}
                onChangeText={
                  setSecurityDeposit
                }
                keyboardType="numeric"
              />

              {/* PAYMENT DATE */}

              <TextInput
                style={styles.input}
                placeholder="Payment Due Date (e.g. 5th)"
                value={paymentDueDate}
                onChangeText={
                  setPaymentDueDate
                }
              />

              {/* PAYMENT STATUS */}

              <View
                style={
                  styles.paymentContainer
                }
              >

                <Text style={styles.label}>
                  Payment Status
                </Text>

                <View
                  style={
                    styles.paymentSwitchRow
                  }
                >

                  <Text
                    style={[
                      styles.paymentStatusText,
                      paymentStatus ===
                        "Pending"
                        ? styles.pendingText
                        : styles.inactiveText,
                    ]}
                  >
                    Pending
                  </Text>

                  <Pressable
                    style={[
                      styles.switch,
                      paymentStatus ===
                        "Paid"
                        ? styles.switchPaid
                        : styles.switchPending,
                    ]}
                    onPress={() => {
                      setPaymentStatus(
                        paymentStatus ===
                          "Paid"
                          ? "Pending"
                          : "Paid"
                      );
                    }}
                  >
                    <View
                      style={[
                        styles.switchCircle,
                        paymentStatus ===
                          "Paid"
                          ? styles.circleRight
                          : styles.circleLeft,
                      ]}
                    />
                  </Pressable>

                  <Text
                    style={[
                      styles.paymentStatusText,
                      paymentStatus ===
                        "Paid"
                        ? styles.paidText
                        : styles.inactiveText,
                    ]}
                  >
                    Paid
                  </Text>

                </View>

              </View>

              {/* START DATE */}

              <TextInput
                style={styles.input}
                placeholder="Rental Start Date (YYYY-MM-DD)"
                value={rentalStartDate}
                onChangeText={
                  setRentalStartDate
                }
              />

              {/* END DATE */}

              <TextInput
                style={styles.input}
                placeholder="Rental End Date (YYYY-MM-DD)"
                value={rentalEndDate}
                onChangeText={
                  setRentalEndDate
                }
              />

            </View>

            {/* SAVE */}

            <Pressable
              style={[
                styles.saveButton,
                saving &&
                  styles.saveButtonDisabled,
              ]}
              disabled={saving}
              onPress={handleSave}
            >
              {saving ? (
                <ActivityIndicator
                  color="#FFFFFF"
                />
              ) : (
                <Text
                  style={
                    styles.saveButtonText
                  }
                >
                  Save Farmer Details
                </Text>
              )}
            </Pressable>

          </ScrollView>

        </View>
      </KeyboardAvoidingView>
    );
  }

  // ==================================================
  // ROOM LIST
  // ==================================================

  return (
    <View style={styles.container}>

      <Text style={styles.heading}>
        Farmer Details
      </Text>

      <Text style={styles.subHeading}>
        Select a storage room
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
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.list
          }

          renderItem={({ item }) => {

            // IMPORTANT:
            // DO NOT DISABLE THE BUTTON
            // EVERY ROOM CAN BE CLICKED
            // FOR YOUR POC.

            return (
              <Pressable
                style={styles.roomRow}

                onPress={() => {

                  console.log(
                    "================================"
                  );

                  console.log(
                    "ROOM CLICKED"
                  );

                  console.log(
                    "ROOM ID:",
                    item.room_id
                  );

                  console.log(
                    "ROOM STATUS:",
                    item.status
                  );

                  console.log(
                    "================================"
                  );

                  router.push({
                    pathname:
                      "/dashboard/farmer-details",
                    params: {
                      id: String(
                        item.room_id
                      ),
                    },
                  });

                }}
              >

                {/* ROOM */}

                <View style={styles.roomInfo}>

                  <Text
                    style={
                      styles.roomNumber
                    }
                  >
                    Room {item.room_number}
                  </Text>

                  <Text
                    style={styles.detail}
                  >
                    {item.branch_name ||
                      "Storage Branch"}
                  </Text>

                  <Text
                    style={styles.detail}
                  >
                    {item.city ||
                      "City"}
                  </Text>

                  <Text
                    style={styles.detail}
                  >
                    {item.length ||
                      0}{" "}
                    m ×{" "}
                    {item.height ||
                      0}{" "}
                    m
                  </Text>

                </View>

                {/* STATUS */}

                <View
                  style={[
                    styles.statusBadge,
                    String(
                      item.status
                    ).toLowerCase() ===
                      "occupied"
                      ? styles.statusOccupied
                      : styles.statusEmpty,
                  ]}
                >

                  <Text
                    style={[
                      styles.statusText,
                      String(
                        item.status
                      ).toLowerCase() ===
                        "occupied"
                        ? styles.statusOccupiedText
                        : styles.statusEmptyText,
                    ]}
                  >
                    {item.status ||
                      "Empty"}
                  </Text>

                </View>

              </Pressable>
            );
          }}
        />

      )}

    </View>
  );
}

// ==================================================
// STYLES
// ==================================================

const styles = StyleSheet.create({

  keyboardContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
    paddingHorizontal: 15,
    paddingTop: 50,
  },

  // ==================================================
  // ROOM LIST
  // ==================================================

  heading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 5,
  },

  subHeading: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },

  list: {
    paddingBottom: 30,
  },

  roomRow: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E5D8",
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",

    // Make it clearly clickable
    minHeight: 90,

    elevation: 2,
  },

  roomInfo: {
    flex: 1,
  },

  roomNumber: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 5,
  },

  detail: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },

  // ==================================================
  // STATUS
  // ==================================================

  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusEmpty: {
    backgroundColor: "#E8F5E9",
  },

  statusOccupied: {
    backgroundColor: "#FFEBEE",
  },

  statusText: {
    fontSize: 12,
    fontWeight: "bold",
  },

  statusEmptyText: {
    color: "#2E7D32",
  },

  statusOccupiedText: {
    color: "#D32F2F",
  },

  // ==================================================
  // FORM
  // ==================================================

  formContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#D9E5D8",
  },

  formContent: {
    padding: 18,
    paddingBottom: 100,
  },

  formTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 8,
  },

  selectedRoom: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#F9FAF9",
    borderWidth: 1,
    borderColor: "#D9E5D8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    fontSize: 15,
  },

  addressInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },

  // ==================================================
  // RENT
  // ==================================================

  rentContainer: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D9E5D8",
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    marginBottom: 15,
  },

  rentTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 15,
  },

  // ==================================================
  // PAYMENT
  // ==================================================

  paymentContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 10,
  },

  paymentSwitchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  paymentStatusText: {
    fontSize: 13,
    fontWeight: "bold",
  },

  paidText: {
    color: "#2E7D32",
  },

  pendingText: {
    color: "#D32F2F",
  },

  inactiveText: {
    color: "#999",
  },

  switch: {
    width: 52,
    height: 28,
    borderRadius: 20,
    padding: 3,
    justifyContent: "center",
  },

  switchPaid: {
    backgroundColor: "#2E7D32",
  },

  switchPending: {
    backgroundColor: "#BDBDBD",
  },

  switchCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },

  circleLeft: {
    alignSelf: "flex-start",
  },

  circleRight: {
    alignSelf: "flex-end",
  },

  // ==================================================
  // SAVE BUTTON
  // ==================================================

  saveButton: {
    backgroundColor: "#2E7D32",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  saveButtonDisabled: {
    opacity: 0.6,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  // ==================================================
  // LOADING
  // ==================================================

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    marginTop: 8,
    color: "#666",
  },

  noRooms: {
    fontSize: 17,
    color: "#666",
  },

});