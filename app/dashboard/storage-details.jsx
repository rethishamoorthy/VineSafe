import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import api from "../../services/api";

export default function StorageDetails() {
  const initialForm = {
    cropName: "",
    cropVariety: "",
    quantity: "",
    storageRoom: "",
    storageSection: "",
    storageType: "Rack",
    rackCabinetNumber: "",
    shelfNumber: "",
    storageDate: "",
    expectedExportDate: "",
    marketName: "",
    destination: "",
    marketAddress: "",
    ownerName: "",
    ownerPhone: "",
    notes: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // =====================================================
  // SAVE STORAGE DETAILS
  // =====================================================

  const saveStorageDetails = async () => {
    if (!formData.cropName.trim()) {
      Alert.alert("Required", "Please enter crop name.");
      return;
    }

    if (!formData.quantity.trim()) {
      Alert.alert("Required", "Please enter quantity.");
      return;
    }

    if (!formData.storageRoom.trim()) {
      Alert.alert("Required", "Please enter storage room.");
      return;
    }

    if (!formData.storageDate.trim()) {
      Alert.alert("Required", "Please enter storage date.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        crop_name: formData.cropName.trim(),
        crop_variety: formData.cropVariety.trim(),
        quantity: formData.quantity.trim(),
        storage_room: formData.storageRoom.trim(),
        storage_section: formData.storageSection.trim(),
        storage_type: formData.storageType,
        rack_cabinet_number: formData.rackCabinetNumber.trim(),
        shelf_number: formData.shelfNumber.trim(),
        storage_date: formData.storageDate.trim(),
        expected_export_date: formData.expectedExportDate.trim(),
        market_name: formData.marketName.trim(),
        destination: formData.destination.trim(),
        market_address: formData.marketAddress.trim(),
        owner_name: formData.ownerName.trim(),
        owner_phone: formData.ownerPhone.trim(),
        notes: formData.notes.trim(),
      };

      console.log("📦 Sending storage data:", payload);

      const response = await api.post("/storage", payload);

      console.log("✅ Storage API response:", response.data);

      if (response.data?.success) {
        Alert.alert(
          "Success",
          "Storage details saved successfully!",
          [
            {
              text: "OK",
              onPress: () => {
                setFormData(initialForm);
              },
            },
          ]
        );
      } else {
        Alert.alert(
          "Error",
          response.data?.message || "Failed to save storage details."
        );
      }
    } catch (error) {
      console.error(
        "❌ Storage API error:",
        error.response?.data || error.message
      );

      Alert.alert(
        "Connection Error",
        error.response?.data?.message ||
          "Unable to connect to the VineSafe server."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* =====================================================
            HEADER
        ===================================================== */}

        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.heading}>Storage Details</Text>

            <Text style={styles.subtitle}>
              Add and manage your crop storage information
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="cube-outline"
              size={29}
              color="#2E7D32"
            />
          </View>
        </View>

        {/* =====================================================
            CROP DETAILS
        ===================================================== */}

        <View style={styles.card}>
          <SectionHeader
            icon="leaf-outline"
            title="Crop Details"
            subtitle="Enter the crop stored in the cold storage"
          />

          <Input
            label="Crop Name"
            placeholder="Example: Grapes"
            value={formData.cropName}
            onChangeText={(text) =>
              updateField("cropName", text)
            }
          />

          <Input
            label="Crop Variety"
            placeholder="Example: Thompson Seedless"
            value={formData.cropVariety}
            onChangeText={(text) =>
              updateField("cropVariety", text)
            }
          />

          <Input
            label="Quantity (kg)"
            placeholder="Example: 500"
            keyboardType="numeric"
            value={formData.quantity}
            onChangeText={(text) =>
              updateField("quantity", text)
            }
          />
        </View>

        {/* =====================================================
            STORAGE LOCATION
        ===================================================== */}

        <View style={styles.card}>
          <SectionHeader
            icon="business-outline"
            title="Storage Location"
            subtitle="Specify exactly where the crop is stored"
          />

          <Input
            label="Storage Room"
            placeholder="Example: Room R001"
            value={formData.storageRoom}
            onChangeText={(text) =>
              updateField("storageRoom", text)
            }
          />

          <Input
            label="Storage Section / Area"
            placeholder="Example: Section A"
            value={formData.storageSection}
            onChangeText={(text) =>
              updateField("storageSection", text)
            }
          />

          {/* STORAGE TYPE */}

          <Text style={styles.label}>Storage Type</Text>

          <View style={styles.typeRow}>
            <Pressable
              style={[
                styles.typeButton,
                formData.storageType === "Rack" &&
                  styles.typeButtonActive,
              ]}
              onPress={() =>
                updateField("storageType", "Rack")
              }
            >
              <Ionicons
                name="layers-outline"
                size={20}
                color={
                  formData.storageType === "Rack"
                    ? "#FFFFFF"
                    : "#2E7D32"
                }
              />

              <Text
                style={[
                  styles.typeText,
                  formData.storageType === "Rack" &&
                    styles.typeTextActive,
                ]}
              >
                Rack
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.typeButton,
                formData.storageType === "Cabinet" &&
                  styles.typeButtonActive,
              ]}
              onPress={() =>
                updateField("storageType", "Cabinet")
              }
            >
              <Ionicons
                name="file-tray-full-outline"
                size={20}
                color={
                  formData.storageType === "Cabinet"
                    ? "#FFFFFF"
                    : "#2E7D32"
                }
              />

              <Text
                style={[
                  styles.typeText,
                  formData.storageType === "Cabinet" &&
                    styles.typeTextActive,
                ]}
              >
                Cabinet
              </Text>
            </Pressable>
          </View>

          <Input
            label={
              formData.storageType === "Rack"
                ? "Rack Number"
                : "Cabinet Number"
            }
            placeholder={
              formData.storageType === "Rack"
                ? "Example: R-03"
                : "Example: C-05"
            }
            value={formData.rackCabinetNumber}
            onChangeText={(text) =>
              updateField(
                "rackCabinetNumber",
                text
              )
            }
          />

          <Input
            label="Shelf Number"
            placeholder="Example: Shelf 2"
            value={formData.shelfNumber}
            onChangeText={(text) =>
              updateField("shelfNumber", text)
            }
          />
        </View>

        {/* =====================================================
            STORAGE PERIOD
        ===================================================== */}

        <View style={styles.card}>
          <SectionHeader
            icon="calendar-outline"
            title="Storage Period"
            subtitle="Enter storage and expected export dates"
          />

          <Input
            label="Storage Date"
            placeholder="YYYY-MM-DD"
            value={formData.storageDate}
            onChangeText={(text) =>
              updateField("storageDate", text)
            }
          />

          <Input
            label="Expected Market / Export Date"
            placeholder="YYYY-MM-DD"
            value={formData.expectedExportDate}
            onChangeText={(text) =>
              updateField(
                "expectedExportDate",
                text
              )
            }
          />

          <View style={styles.dateHint}>
            <Ionicons
              name="information-circle-outline"
              size={17}
              color="#2E7D32"
            />

            <Text style={styles.dateHintText}>
              Use the format YYYY-MM-DD
            </Text>
          </View>
        </View>

        {/* =====================================================
            MARKET / EXPORT DETAILS
        ===================================================== */}

        <View style={styles.card}>
          <SectionHeader
            icon="location-outline"
            title="Market / Export Details"
            subtitle="Enter where the crop will be sent"
          />

          <Input
            label="Market Name"
            placeholder="Example: Chennai Wholesale Market"
            value={formData.marketName}
            onChangeText={(text) =>
              updateField("marketName", text)
            }
          />

          <Input
            label="Destination / Place"
            placeholder="Example: Chennai"
            value={formData.destination}
            onChangeText={(text) =>
              updateField("destination", text)
            }
          />

          <Input
            label="Market Address"
            placeholder="Enter complete market address"
            multiline
            value={formData.marketAddress}
            onChangeText={(text) =>
              updateField(
                "marketAddress",
                text
              )
            }
          />

          <Input
            label="Market Owner Name"
            placeholder="Example: Kumar"
            value={formData.ownerName}
            onChangeText={(text) =>
              updateField("ownerName", text)
            }
          />

          <Input
            label="Market Owner Phone"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={formData.ownerPhone}
            onChangeText={(text) =>
              updateField("ownerPhone", text)
            }
          />
        </View>

        {/* =====================================================
            NOTES
        ===================================================== */}

        <View style={styles.card}>
          <SectionHeader
            icon="document-text-outline"
            title="Additional Notes"
            subtitle="Add any important storage information"
          />

          <Input
            label="Notes"
            placeholder="Enter additional information..."
            multiline
            value={formData.notes}
            onChangeText={(text) =>
              updateField("notes", text)
            }
          />
        </View>

        {/* =====================================================
            SAVE BUTTON
        ===================================================== */}

        <Pressable
          style={[
            styles.saveButton,
            loading && styles.saveButtonDisabled,
          ]}
          onPress={saveStorageDetails}
          disabled={loading}
        >
          <Ionicons
            name={
              loading
                ? "hourglass-outline"
                : "checkmark-circle-outline"
            }
            size={22}
            color="#FFFFFF"
          />

          <Text style={styles.saveButtonText}>
            {loading
              ? "Saving..."
              : "Save Storage Details"}
          </Text>
        </Pressable>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

/* =========================================================
   SECTION HEADER
========================================================= */

function SectionHeader({
  icon,
  title,
  subtitle,
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.iconBox}>
        <Ionicons
          name={icon}
          size={21}
          color="#2E7D32"
        />
      </View>

      <View style={styles.sectionHeaderText}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <Text style={styles.sectionSubtitle}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   INPUT COMPONENT
========================================================= */

function Input({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  multiline = false,
}) {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
        placeholder={placeholder}
        placeholderTextColor="#9A9A9A"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={
          multiline ? "top" : "center"
        }
        autoCapitalize="sentences"
      />
    </View>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 45,
  },

  /* HEADER */

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  headerTextContainer: {
    flex: 1,
    paddingRight: 15,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B5E20",
  },

  subtitle: {
    fontSize: 14,
    color: "#777777",
    marginTop: 6,
    lineHeight: 20,
  },

  headerIcon: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
  },

  /* CARD */

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#DCE8DC",

    elevation: 3,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },

  /* SECTION */

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  sectionHeaderText: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1B5E20",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 3,
    lineHeight: 17,
  },

  /* INPUT */

  inputContainer: {
    marginBottom: 15,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#444444",
    marginBottom: 7,
  },

  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#D5E1D5",
    borderRadius: 10,
    paddingHorizontal: 14,
    fontSize: 15,
    color: "#333333",
    backgroundColor: "#FAFCFA",
  },

  multilineInput: {
    height: 95,
    paddingTop: 13,
  },

  /* STORAGE TYPE */

  typeRow: {
    flexDirection: "row",
    marginBottom: 16,
  },

  typeButton: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#B8D1BA",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    backgroundColor: "#FFFFFF",
  },

  typeButtonActive: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  typeText: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#2E7D32",
  },

  typeTextActive: {
    color: "#FFFFFF",
  },

  /* DATE HINT */

  dateHint: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0F8F1",
    borderRadius: 9,
    paddingVertical: 9,
    paddingHorizontal: 11,
    marginTop: -2,
  },

  dateHintText: {
    fontSize: 12,
    color: "#2E7D32",
    marginLeft: 7,
  },

  /* SAVE */

  saveButton: {
    height: 55,
    borderRadius: 13,
    backgroundColor: "#2E7D32",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    elevation: 3,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },

  saveButtonDisabled: {
    opacity: 0.65,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#FFFFFF",
    marginLeft: 9,
  },

  bottomSpace: {
    height: 20,
  },
});