

import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
  ScrollView,
  Pressable,
  TextInput,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function RoomDetails() {
  const { id } = useLocalSearchParams();

  const [room, setRoom] = useState(null);
  const [allocation, setAllocation] = useState(null);

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    return String(date).split("T")[0];
  };

  const [loading, setLoading] = useState(true);
  const [isOccupied, setIsOccupied] = useState(false);

  // =====================================================
  // EDIT MODAL
  // =====================================================

  const [editVisible, setEditVisible] = useState(false);
  const [editType, setEditType] = useState("");

  // =====================================================
  // EDIT VALUES
  // =====================================================

  const [editData, setEditData] = useState({});

  // =====================================================
  // FETCH ROOM + FARMER DETAILS
  // =====================================================

  const fetchRoomDetails = async () => {
    try {
      setLoading(true);

      const roomResponse = await api.get("/room/all");

      console.log("ALL ROOMS:", roomResponse.data);

      if (roomResponse.data.success) {
        const selectedRoom = roomResponse.data.rooms.find(
          (item) => String(item.room_id) === String(id)
        );

        if (selectedRoom) {
          setRoom(selectedRoom);

          setIsOccupied(
            selectedRoom.status === "Occupied"
          );
        } else {
          Alert.alert("Error", "Room not found");
          return;
        }
      } else {
        Alert.alert(
          "Error",
          roomResponse.data.message ||
            "Failed to fetch room"
        );

        return;
      }

      // =================================================
      // GET ALLOCATION
      // =================================================

      try {
        const allocationResponse =
          await api.get(`/allocations/room/${id}`);

        console.log(
          "ALLOCATION DATA:",
          allocationResponse.data
        );

        if (allocationResponse.data.success) {
          setAllocation(
            allocationResponse.data.allocation
          );
        } else if (
          allocationResponse.data.allocation_id
        ) {
          setAllocation(
            allocationResponse.data
          );
        } else {
          setAllocation(null);
        }
      } catch (allocationError) {
        console.log(
          "NO FARMER ALLOCATION:",
          allocationError?.response?.data ||
            allocationError
        );

        setAllocation(null);
      }
    } catch (error) {
      console.log(
        "ROOM DETAILS ERROR:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        "Failed to fetch room details"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD
  // =====================================================

  useEffect(() => {
    fetchRoomDetails();
  }, [id]);

  // =====================================================
  // OPEN EDIT
  // =====================================================

  const openEdit = (type) => {
    setEditType(type);

    // ---------------- ROOM ----------------

    if (type === "room") {
      setEditData({
        room_number: room?.room_number || "",
        branch_name: room?.branch_name || "",
        city: room?.city || "",
        length: String(room?.length || ""),
        height: String(room?.height || ""),
      });
    }

    // ---------------- FARMER ----------------

    if (type === "farmer") {
      setEditData({
        farmer_code:
          allocation?.farmer_code || "",

        farmer_name:
          allocation?.farmer_name || "",

        phone:
          allocation?.phone || "",

        address:
          allocation?.address || "",

        village:
          allocation?.village || "",

        district:
          allocation?.district || "",

        state:
          allocation?.state || "",
      });
    }

    // ---------------- RENT ----------------

    if (type === "rent") {
      setEditData({
        rent_amount:
          String(allocation?.rent_amount || ""),

        security_deposit:
          String(
            allocation?.security_deposit || ""
          ),

        payment_due_date:
          allocation?.payment_due_date || "",

        payment_status:
          allocation?.payment_status ||
          "Pending",
      });
    }

    // ---------------- PERIOD ----------------

    if (type === "period") {
      setEditData({
        start_date: formatDate(
          allocation?.start_date
        ),

        end_date: formatDate(
          allocation?.end_date
        ),

        status:
          allocation?.status || "Active",
      });
    }

    setEditVisible(true);
  };

  // =====================================================
  // SAVE EDIT
  // STATIC FOR POC
  // =====================================================

  const saveEdit = () => {
    // ---------------- ROOM ----------------

    if (editType === "room") {
      setRoom({
        ...room,

        room_number:
          editData.room_number,

        branch_name:
          editData.branch_name,

        city:
          editData.city,

        length:
          editData.length,

        height:
          editData.height,
      });
    }

    // ---------------- FARMER ----------------

    if (editType === "farmer") {
      setAllocation({
        ...allocation,

        farmer_code:
          editData.farmer_code,

        farmer_name:
          editData.farmer_name,

        phone:
          editData.phone,

        address:
          editData.address,

        village:
          editData.village,

        district:
          editData.district,

        state:
          editData.state,
      });
    }

    // ---------------- RENT ----------------

    if (editType === "rent") {
      setAllocation({
        ...allocation,

        rent_amount:
          editData.rent_amount,

        security_deposit:
          editData.security_deposit,

        payment_due_date:
          editData.payment_due_date,

        payment_status:
          editData.payment_status,
      });
    }

    // ---------------- PERIOD ----------------

    if (editType === "period") {
      setAllocation({
        ...allocation,

        start_date:
          editData.start_date,

        end_date:
          editData.end_date,

        status:
          editData.status,
      });
    }

    setEditVisible(false);

    Alert.alert(
      "Updated",
      "Details updated successfully"
    );
  };

  // =====================================================
  // UPDATE ROOM STATUS
  // =====================================================

  const updateRoomStatus = async (value) => {
    try {
      const newStatus = value
        ? "Occupied"
        : "Empty";

      const response = await api.put(
        `/room/update/${room.room_id}`,
        {
          branch_name: room.branch_name,
          city: room.city,
          room_number: room.room_number,
          length: room.length,
          height: room.height,
          status: newStatus,
        }
      );

      if (response.data.success) {
        setIsOccupied(value);

        setRoom({
          ...room,
          status: newStatus,
        });

        Alert.alert(
          "Success",
          `Room is now ${newStatus}`
        );
      } else {
        Alert.alert(
          "Error",
          response.data.message ||
            "Failed to update room status"
        );
      }
    } catch (error) {
      console.log(
        "UPDATE ROOM STATUS ERROR:",
        error?.response?.data || error
      );

      Alert.alert(
        "Error",
        "Failed to update room status"
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#2E7D32"
        />

        <Text style={styles.loadingText}>
          Loading room details...
        </Text>
      </View>
    );
  }

  // =====================================================
  // ROOM NOT FOUND
  // =====================================================

  if (!room) {
    return (
      <View style={styles.center}>
        <Text style={styles.noRoom}>
          Room not found
        </Text>
      </View>
    );
  }

  // =====================================================
  // MAIN
  // =====================================================

  return (
    <View style={styles.container}>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >

        <Text style={styles.heading}>
          Room Details
        </Text>

        {/* =================================================
            ROOM INFORMATION
        ================================================= */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Text style={styles.title}>
              Room Information
            </Text>

            <Pressable
              style={styles.editButton}
              onPress={() =>
                openEdit("room")
              }
            >
              <Ionicons
                name="create-outline"
                size={20}
                color="#2E7D32"
              />
            </Pressable>

          </View>

          <Text style={styles.detail}>
            Room Number : {room.room_number}
          </Text>

          <Text style={styles.detail}>
            Branch : {room.branch_name}
          </Text>

          <Text style={styles.detail}>
            City : {room.city}
          </Text>

          <Text style={styles.detail}>
            Size : {room.length} m ×{" "}
            {room.height} m
          </Text>

          <View style={styles.statusRow}>

            <View>

              <Text style={styles.statusLabel}>
                Room Status
              </Text>

              <Text
                style={[
                  styles.statusValue,
                  isOccupied
                    ? styles.occupiedText
                    : styles.emptyText,
                ]}
              >
                {isOccupied
                  ? "Occupied"
                  : "Empty"}
              </Text>

            </View>

            <Switch
              value={isOccupied}
              onValueChange={
                updateRoomStatus
              }
              trackColor={{
                false: "#BDBDBD",
                true: "#81C784",
              }}
              thumbColor={
                isOccupied
                  ? "#2E7D32"
                  : "#F4F3F4"
              }
            />

          </View>

        </View>

        {/* =================================================
            FARMER DETAILS
        ================================================= */}

        <View style={styles.card}>

          <View style={styles.cardHeader}>

            <Text style={styles.title}>
              Farmer Details
            </Text>

            {allocation && (
              <Pressable
                style={styles.editButton}
                onPress={() =>
                  openEdit("farmer")
                }
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#2E7D32"
                />
              </Pressable>
            )}

          </View>

          {allocation ? (
            <>

              <Text style={styles.detail}>
                Farmer Code :{" "}
                {allocation.farmer_code || "-"}
              </Text>

              <Text style={styles.detail}>
                Farmer Name :{" "}
                {allocation.farmer_name || "-"}
              </Text>

              <Text style={styles.detail}>
                Phone :{" "}
                {allocation.phone || "-"}
              </Text>

              <Text style={styles.detail}>
                Address :{" "}
                {allocation.address || "-"}
              </Text>

              <Text style={styles.detail}>
                Village :{" "}
                {allocation.village || "-"}
              </Text>

              <Text style={styles.detail}>
                District :{" "}
                {allocation.district || "-"}
              </Text>

              <Text style={styles.detail}>
                State :{" "}
                {allocation.state || "-"}
              </Text>

            </>
          ) : (

            <Text style={styles.noFarmer}>
              No farmer is currently allocated
              to this room.
            </Text>

          )}

        </View>

        {/* =================================================
            RENT DETAILS
        ================================================= */}

        {allocation && (
          <View style={styles.card}>

            <View style={styles.cardHeader}>

              <Text style={styles.title}>
                Rent Details
              </Text>

              <Pressable
                style={styles.editButton}
                onPress={() =>
                  openEdit("rent")
                }
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#2E7D32"
                />
              </Pressable>

            </View>

            <InfoRow
              label="Rent Amount"
              value={`₹ ${
                allocation.rent_amount || 0
              }`}
            />

            <InfoRow
              label="Security Deposit"
              value={`₹ ${
                allocation.security_deposit || 0
              }`}
            />

            {/* FIXED DATE */}

            <InfoRow
              label="Payment Due Date"
              value={formatDate(
                allocation.payment_due_date
              )}
            />

            <InfoRow
              label="Payment Status"
              value={
                allocation.payment_status ||
                "Pending"
              }
              valueStyle={
                allocation.payment_status ===
                "Paid"
                  ? styles.paidText
                  : styles.pendingText
              }
            />

          </View>
        )}

        {/* =================================================
            RENTAL PERIOD
        ================================================= */}

        {allocation && (
          <View style={styles.card}>

            <View style={styles.cardHeader}>

              <Text style={styles.title}>
                Rental Period
              </Text>

              <Pressable
                style={styles.editButton}
                onPress={() =>
                  openEdit("period")
                }
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#2E7D32"
                />
              </Pressable>

            </View>

            {/* FIXED DATE */}

            <InfoRow
              label="Start Date"
              value={formatDate(
                allocation.start_date
              )}
            />

            {/* FIXED DATE */}

            <InfoRow
              label="End Date"
              value={formatDate(
                allocation.end_date
              )}
            />

            <InfoRow
              label="Allocation Status"
              value={
                allocation.status || "-"
              }
              valueStyle={
                styles.activeText
              }
            />

          </View>
        )}

        {/* =================================================
            NOTES
        ================================================= */}

        {allocation?.notes && (
          <View style={styles.card}>

            <View style={styles.cardHeader}>

              <Text style={styles.title}>
                Notes
              </Text>

              <Pressable
                style={styles.editButton}
                onPress={() =>
                  openEdit("notes")
                }
              >
                <Ionicons
                  name="create-outline"
                  size={20}
                  color="#2E7D32"
                />
              </Pressable>

            </View>

            <Text style={styles.notes}>
              {allocation.notes}
            </Text>

          </View>
        )}

      </ScrollView>

      {/* =================================================
          EDIT MODAL
      ================================================= */}

      <Modal
        visible={editVisible}
        transparent
        animationType="slide"
        onRequestClose={() =>
          setEditVisible(false)
        }
      >

        <View style={styles.modalBackground}>

          <View style={styles.modalContainer}>

            {/* MODAL HEADER */}

            <View style={styles.modalHeader}>

              <Text style={styles.modalTitle}>
                Edit{" "}
                {editType === "room"
                  ? "Room Information"
                  : editType === "farmer"
                  ? "Farmer Details"
                  : editType === "rent"
                  ? "Rent Details"
                  : editType === "period"
                  ? "Rental Period"
                  : "Notes"}
              </Text>

              <Pressable
                onPress={() =>
                  setEditVisible(false)
                }
              >
                <Ionicons
                  name="close"
                  size={26}
                  color="#555"
                />
              </Pressable>

            </View>

            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
            >

              {/* =================================================
                  ROOM EDIT
              ================================================= */}

              {editType === "room" && (
                <>

                  <EditInput
                    label="Room Number"
                    value={
                      editData.room_number
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        room_number: text,
                      })
                    }
                  />

                  <EditInput
                    label="Branch"
                    value={
                      editData.branch_name
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        branch_name: text,
                      })
                    }
                  />

                  <EditInput
                    label="City"
                    value={editData.city}
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        city: text,
                      })
                    }
                  />

                  <EditInput
                    label="Length"
                    value={editData.length}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        length: text,
                      })
                    }
                  />

                  <EditInput
                    label="Height"
                    value={editData.height}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        height: text,
                      })
                    }
                  />

                </>
              )}

              {/* =================================================
                  FARMER EDIT
              ================================================= */}

              {editType === "farmer" && (
                <>

                  <EditInput
                    label="Farmer Code"
                    value={
                      editData.farmer_code
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        farmer_code: text,
                      })
                    }
                  />

                  <EditInput
                    label="Farmer Name"
                    value={
                      editData.farmer_name
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        farmer_name: text,
                      })
                    }
                  />

                  <EditInput
                    label="Phone"
                    value={editData.phone}
                    keyboardType="phone-pad"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        phone: text,
                      })
                    }
                  />

                  <EditInput
                    label="Address"
                    value={
                      editData.address
                    }
                    multiline
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        address: text,
                      })
                    }
                  />

                  <EditInput
                    label="Village"
                    value={
                      editData.village
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        village: text,
                      })
                    }
                  />

                  <EditInput
                    label="District"
                    value={
                      editData.district
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        district: text,
                      })
                    }
                  />

                  <EditInput
                    label="State"
                    value={editData.state}
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        state: text,
                      })
                    }
                  />

                </>
              )}

              {/* =================================================
                  RENT EDIT
              ================================================= */}

              {editType === "rent" && (
                <>

                  <EditInput
                    label="Rent Amount"
                    value={
                      editData.rent_amount
                    }
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        rent_amount: text,
                      })
                    }
                  />

                  <EditInput
                    label="Security Deposit"
                    value={
                      editData.security_deposit
                    }
                    keyboardType="numeric"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        security_deposit: text,
                      })
                    }
                  />

                  <EditInput
                    label="Payment Due Date"
                    value={
                      editData.payment_due_date
                    }
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        payment_due_date: text,
                      })
                    }
                  />

                  <Text style={styles.modalLabel}>
                    Payment Status
                  </Text>

                  <View style={styles.statusButtons}>

                    <Pressable
                      style={[
                        styles.statusButton,
                        editData.payment_status ===
                          "Pending" &&
                          styles.statusButtonActive,
                      ]}
                      onPress={() =>
                        setEditData({
                          ...editData,
                          payment_status:
                            "Pending",
                        })
                      }
                    >
                      <Text
                        style={
                          styles.statusButtonText
                        }
                      >
                        Pending
                      </Text>
                    </Pressable>

                    <Pressable
                      style={[
                        styles.statusButton,
                        editData.payment_status ===
                          "Paid" &&
                          styles.statusButtonPaid,
                      ]}
                      onPress={() =>
                        setEditData({
                          ...editData,
                          payment_status:
                            "Paid",
                        })
                      }
                    >
                      <Text
                        style={
                          styles.statusButtonText
                        }
                      >
                        Paid
                      </Text>
                    </Pressable>

                  </View>

                </>
              )}

              {/* =================================================
                  PERIOD EDIT
              ================================================= */}

              {editType === "period" && (
                <>

                  <EditInput
                    label="Start Date"
                    value={
                      editData.start_date
                    }
                    placeholder="YYYY-MM-DD"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        start_date: text,
                      })
                    }
                  />

                  <EditInput
                    label="End Date"
                    value={
                      editData.end_date
                    }
                    placeholder="YYYY-MM-DD"
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        end_date: text,
                      })
                    }
                  />

                  <EditInput
                    label="Allocation Status"
                    value={editData.status}
                    onChangeText={(text) =>
                      setEditData({
                        ...editData,
                        status: text,
                      })
                    }
                  />

                </>
              )}

              {/* =================================================
                  NOTES EDIT
              ================================================= */}

              {editType === "notes" && (
                <EditInput
                  label="Notes"
                  value={editData.notes || ""}
                  multiline
                  onChangeText={(text) =>
                    setEditData({
                      ...editData,
                      notes: text,
                    })
                  }
                />
              )}

            </ScrollView>

            {/* =================================================
                BUTTONS
            ================================================= */}

            <View style={styles.modalButtons}>

              <Pressable
                style={styles.cancelButton}
                onPress={() =>
                  setEditVisible(false)
                }
              >
                <Text
                  style={styles.cancelText}
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                style={styles.saveButton}
                onPress={saveEdit}
              >

                <Ionicons
                  name="checkmark"
                  size={19}
                  color="#FFFFFF"
                />

                <Text
                  style={styles.saveText}
                >
                  Save
                </Text>

              </Pressable>

            </View>

          </View>

        </View>

      </Modal>

    </View>
  );
}

// =====================================================
// INFO ROW
// =====================================================

function InfoRow({
  label,
  value,
  valueStyle,
}) {
  return (
    <View style={styles.infoRow}>

      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text
        style={[
          styles.infoValue,
          valueStyle,
        ]}
      >
        {value}
      </Text>

    </View>
  );
}

// =====================================================
// EDIT INPUT
// =====================================================

function EditInput({
  label,
  value,
  onChangeText,
  keyboardType,
  multiline,
  placeholder,
}) {
  return (
    <View style={styles.inputContainer}>

      <Text style={styles.modalLabel}>
        {label}
      </Text>

      <TextInput
        style={[
          styles.editInput,
          multiline &&
            styles.multilineInput,
        ]}
        value={value}
        onChangeText={onChangeText}
        keyboardType={
          keyboardType || "default"
        }
        multiline={multiline || false}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />

    </View>
  );
}

// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },

  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B5E20",
    marginBottom: 20,
  },

  // ===================================================
  // CARD
  // ===================================================

  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#D9E5D8",
    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  title: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
    flex: 1,
  },

  editButton: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#EAF6EC",
    justifyContent: "center",
    alignItems: "center",
  },

  detail: {
    fontSize: 16,
    color: "#444",
    marginBottom: 10,
    lineHeight: 22,
  },

  // ===================================================
  // STATUS
  // ===================================================

  statusRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  statusValue: {
    fontSize: 14,
    marginTop: 4,
    fontWeight: "bold",
  },

  occupiedText: {
    color: "#D32F2F",
  },

  emptyText: {
    color: "#2E7D32",
  },

  // ===================================================
  // INFO ROW
  // ===================================================

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },

  infoLabel: {
    fontSize: 15,
    color: "#666",
    flex: 1,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
    flex: 1,
  },

  paidText: {
    color: "#2E7D32",
  },

  pendingText: {
    color: "#D32F2F",
  },

  activeText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#2E7D32",
    textAlign: "right",
    flex: 1,
  },

  noFarmer: {
    fontSize: 15,
    color: "#777",
    lineHeight: 22,
  },

  notes: {
    fontSize: 15,
    color: "#444",
    lineHeight: 23,
  },

  // ===================================================
  // MODAL
  // ===================================================

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: "88%",
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#1B5E20",
    flex: 1,
  },

  inputContainer: {
    marginBottom: 14,
  },

  modalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 7,
  },

  editInput: {
    backgroundColor: "#F7F9F7",
    borderWidth: 1,
    borderColor: "#D9E5D8",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },

  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  // ===================================================
  // PAYMENT STATUS
  // ===================================================

  statusButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },

  statusButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  statusButtonActive: {
    backgroundColor: "#FDECEC",
    borderColor: "#D32F2F",
  },

  statusButtonPaid: {
    backgroundColor: "#EAF6EC",
    borderColor: "#2E7D32",
  },

  statusButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },

  // ===================================================
  // MODAL BUTTONS
  // ===================================================

  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 15,
  },

  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center",
  },

  cancelText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#555",
  },

  saveButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  saveText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // ===================================================
  // LOADING
  // ===================================================

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7F5",
  },

  loadingText: {
    marginTop: 10,
    color: "#666",
  },

  noRoom: {
    fontSize: 18,
    color: "#666",
  },

});