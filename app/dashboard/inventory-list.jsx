

// import React, { useEffect, useMemo, useState } from "react";
// import {
//   ActivityIndicator,
//   Alert,
//   Pressable,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   View,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import api from "../../services/api";

// export default function ViewInventory() {
//   const [inventory, setInventory] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [search, setSearch] = useState("");
//   const [selectedDate, setSelectedDate] = useState("ALL");
//   const [selectedCrop, setSelectedCrop] = useState("ALL");
//   const [selectedRackShelf, setSelectedRackShelf] = useState("ALL");

//   // Expanded card
//   const [expandedId, setExpandedId] = useState(null);

//   // Edit mode
//   const [editingId, setEditingId] = useState(null);
//   const [editData, setEditData] = useState({});

//   // =========================================================
//   // FETCH INVENTORY
//   // =========================================================

//   useEffect(() => {
//     fetchInventory();
//   }, []);

//   const fetchInventory = async () => {
//     try {
//       setLoading(true);

//       const response = await api.get("/storage");

//       console.log("VIEW INVENTORY RESPONSE:", response.data);

//       const data = response.data;

//       if (data.success) {
//         const records =
//           data.data ||
//           data.storage ||
//           data.storageDetails ||
//           data.results ||
//           [];

//         setInventory(Array.isArray(records) ? records : []);
//       } else {
//         setInventory([]);

//         Alert.alert(
//           "Error",
//           data.message || "Unable to fetch inventory"
//         );
//       }
//     } catch (error) {
//       console.error("FETCH INVENTORY ERROR:", error);

//       Alert.alert(
//         "Connection Error",
//         "Unable to connect to the VineSafe server."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =========================================================
//   // HELPERS
//   // =========================================================

//   const getValue = (item, ...keys) => {
//     for (const key of keys) {
//       if (
//         item?.[key] !== undefined &&
//         item?.[key] !== null &&
//         item?.[key] !== ""
//       ) {
//         return item[key];
//       }
//     }

//     return "";
//   };

//   const getId = (item) =>
//     getValue(
//       item,
//       "storage_id",
//       "storageId",
//       "id"
//     );

//   const getCropName = (item) =>
//     getValue(item, "crop_name", "cropName", "crop");

//   const getCropVariety = (item) =>
//     getValue(
//       item,
//       "crop_variety",
//       "cropVariety",
//       "variety"
//     );

//   const getQuantity = (item) =>
//     getValue(item, "quantity", "qty");

//   const getRoom = (item) =>
//     getValue(
//       item,
//       "storage_room",
//       "storageRoom",
//       "room_number",
//       "roomNumber",
//       "room_no",
//       "roomNo"
//     );

//   const getSection = (item) =>
//     getValue(
//       item,
//       "storage_section",
//       "storageSection",
//       "section",
//       "area"
//     );

//   const getStorageType = (item) =>
//     getValue(
//       item,
//       "storage_type",
//       "storageType"
//     );

//   const getRack = (item) =>
//     getValue(
//       item,
//       "rack_cabinet_number",
//       "rackCabinetNumber",
//       "rack_number",
//       "rackNumber",
//       "rack_no",
//       "rackNo"
//     );

//   const getShelf = (item) =>
//     getValue(
//       item,
//       "shelf_number",
//       "shelfNumber",
//       "shelf_no",
//       "shelfNo"
//     );

//   const getStorageDate = (item) =>
//     getValue(
//       item,
//       "storage_date",
//       "storageDate",
//       "created_at",
//       "createdAt"
//     );

//   const getExpectedExportDate = (item) =>
//     getValue(
//       item,
//       "expected_export_date",
//       "expectedExportDate",
//       "export_date",
//       "exportDate"
//     );

//   const getMarketName = (item) =>
//     getValue(
//       item,
//       "market_name",
//       "marketName"
//     );

//   const getDestination = (item) =>
//     getValue(
//       item,
//       "destination",
//       "destination_place",
//       "destinationPlace"
//     );

//   const getMarketAddress = (item) =>
//     getValue(
//       item,
//       "market_address",
//       "marketAddress"
//     );

//   const getOwnerName = (item) =>
//     getValue(
//       item,
//       "owner_name",
//       "ownerName",
//       "market_owner_name"
//     );

//   const getOwnerPhone = (item) =>
//     getValue(
//       item,
//       "owner_phone",
//       "ownerPhone",
//       "market_owner_phone"
//     );

//   const getNotes = (item) =>
//     getValue(
//       item,
//       "notes",
//       "additional_notes"
//     );

//   // =========================================================
//   // DATE HELPERS
//   // =========================================================

//   const normalizeDate = (dateValue) => {
//     if (!dateValue) return "";

//     try {
//       const stringValue = String(dateValue);

//       // Handles YYYY-MM-DD directly
//       if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
//         return stringValue;
//       }

//       const date = new Date(dateValue);

//       if (isNaN(date.getTime())) {
//         return stringValue.substring(0, 10);
//       }

//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");

//       return `${year}-${month}-${day}`;
//     } catch {
//       return "";
//     }
//   };

//   const formatDate = (dateValue) => {
//     if (!dateValue) return "Not available";

//     const normalized = normalizeDate(dateValue);

//     if (!normalized) return "Not available";

//     const [year, month, day] = normalized.split("-");

//     const months = [
//       "Jan",
//       "Feb",
//       "Mar",
//       "Apr",
//       "May",
//       "Jun",
//       "Jul",
//       "Aug",
//       "Sep",
//       "Oct",
//       "Nov",
//       "Dec",
//     ];

//     return `${day} ${months[Number(month) - 1]} ${year}`;
//   };

//   // =========================================================
//   // AVAILABLE DATES
//   // =========================================================

//   const availableDates = useMemo(() => {
//     const dateMap = {};

//     inventory.forEach((item) => {
//       const date = normalizeDate(getStorageDate(item));

//       if (date) {
//         dateMap[date] = true;
//       }
//     });

//     return Object.keys(dateMap).sort(
//       (a, b) => new Date(b) - new Date(a)
//     );
//   }, [inventory]);

//   // =========================================================
//   // AVAILABLE CROPS
//   // =========================================================

//   const availableCrops = useMemo(() => {
//     const crops = inventory
//       .map((item) => getCropName(item))
//       .filter(Boolean);

//     return [...new Set(crops)].sort();
//   }, [inventory]);

//   // =========================================================
//   // AVAILABLE RACK / SHELF
//   // =========================================================

//   const availableRackShelves = useMemo(() => {
//     const values = inventory
//       .map((item) => {
//         const rack = getRack(item);
//         const shelf = getShelf(item);

//         if (rack && shelf) {
//           return `${rack} / ${shelf}`;
//         }

//         return rack || shelf || "";
//       })
//       .filter(Boolean);

//     return [...new Set(values)].sort();
//   }, [inventory]);

//   // =========================================================
//   // FILTER
//   // =========================================================

//   const filteredInventory = useMemo(() => {
//     return inventory.filter((item) => {
//       const crop = String(getCropName(item)).toLowerCase();
//       const variety = String(
//         getCropVariety(item)
//       ).toLowerCase();

//       const room = String(getRoom(item)).toLowerCase();
//       const rack = String(getRack(item)).toLowerCase();
//       const shelf = String(getShelf(item)).toLowerCase();
//       const quantity = String(
//         getQuantity(item)
//       ).toLowerCase();

//       const searchText = search.toLowerCase().trim();

//       const matchesSearch =
//         !searchText ||
//         crop.includes(searchText) ||
//         variety.includes(searchText) ||
//         room.includes(searchText) ||
//         rack.includes(searchText) ||
//         shelf.includes(searchText) ||
//         quantity.includes(searchText);

//       const itemDate = normalizeDate(
//         getStorageDate(item)
//       );

//       const matchesDate =
//         selectedDate === "ALL" ||
//         itemDate === selectedDate;

//       const matchesCrop =
//         selectedCrop === "ALL" ||
//         crop === selectedCrop.toLowerCase();

//       const currentRack = getRack(item);
//       const currentShelf = getShelf(item);

//       const rackShelf =
//         currentRack && currentShelf
//           ? `${currentRack} / ${currentShelf}`
//           : currentRack || currentShelf || "";

//       const matchesRackShelf =
//         selectedRackShelf === "ALL" ||
//         rackShelf === selectedRackShelf;

//       return (
//         matchesSearch &&
//         matchesDate &&
//         matchesCrop &&
//         matchesRackShelf
//       );
//     });
//   }, [
//     inventory,
//     search,
//     selectedDate,
//     selectedCrop,
//     selectedRackShelf,
//   ]);

//   // =========================================================
//   // COUNTS
//   // =========================================================

//   const totalEntries = filteredInventory.length;

//   const totalCrops = useMemo(() => {
//     const cropSet = new Set();

//     filteredInventory.forEach((item) => {
//       const crop = getCropName(item);

//       if (crop) {
//         cropSet.add(
//           String(crop).toLowerCase()
//         );
//       }
//     });

//     return cropSet.size;
//   }, [filteredInventory]);

//   // =========================================================
//   // CLEAR FILTERS
//   // =========================================================

//   const clearFilters = () => {
//     setSearch("");
//     setSelectedDate("ALL");
//     setSelectedCrop("ALL");
//     setSelectedRackShelf("ALL");
//   };

//   const hasFilters =
//     search ||
//     selectedDate !== "ALL" ||
//     selectedCrop !== "ALL" ||
//     selectedRackShelf !== "ALL";

//   // =========================================================
//   // EXPAND DETAILS
//   // =========================================================

//   const toggleDetails = (item) => {
//     const id = getId(item);

//     if (expandedId === id) {
//       setExpandedId(null);
//       setEditingId(null);
//     } else {
//       setExpandedId(id);
//       setEditingId(null);
//     }
//   };

//   // =========================================================
//   // START EDIT
//   // =========================================================

//   const startEdit = (item) => {
//     setEditingId(getId(item));

//     setEditData({
//       crop_name: getCropName(item),
//       crop_variety: getCropVariety(item),
//       quantity: String(getQuantity(item)),
//       storage_room: getRoom(item),
//       storage_section: getSection(item),
//       storage_type: getStorageType(item) || "Rack",
//       rack_cabinet_number: getRack(item),
//       shelf_number: getShelf(item),
//       storage_date: normalizeDate(
//         getStorageDate(item)
//       ),
//       expected_export_date:
//         normalizeDate(
//           getExpectedExportDate(item)
//         ),
//       market_name: getMarketName(item),
//       destination: getDestination(item),
//       market_address: getMarketAddress(item),
//       owner_name: getOwnerName(item),
//       owner_phone: getOwnerPhone(item),
//       notes: getNotes(item),
//     });
//   };

//   // =========================================================
//   // UPDATE FIELD
//   // =========================================================

//   const updateEditField = (field, value) => {
//     setEditData((previous) => ({
//       ...previous,
//       [field]: value,
//     }));
//   };

//   // =========================================================
//   // SAVE EDIT
//   // =========================================================

//   const saveEdit = async (item) => {
//     const id = getId(item);

//     if (!id) {
//       Alert.alert(
//         "Error",
//         "Storage ID not found."
//       );
//       return;
//     }

//     if (!editData.crop_name?.trim()) {
//       Alert.alert(
//         "Required",
//         "Please enter crop name."
//       );
//       return;
//     }

//     if (!editData.quantity?.trim()) {
//       Alert.alert(
//         "Required",
//         "Please enter quantity."
//       );
//       return;
//     }

//     try {
//       const response = await api.put(
//         `/storage/update/${id}`,
//         editData
//       );

//       console.log(
//         "UPDATE STORAGE RESPONSE:",
//         response.data
//       );

//       if (response.data?.success) {
//         Alert.alert(
//           "Updated",
//           "Storage details updated successfully."
//         );

//         setEditingId(null);
//         await fetchInventory();
//       } else {
//         Alert.alert(
//           "Error",
//           response.data?.message ||
//             "Unable to update storage details."
//         );
//       }
//     } catch (error) {
//       console.error(
//         "UPDATE STORAGE ERROR:",
//         error?.response?.data ||
//           error?.message ||
//           error
//       );

//       Alert.alert(
//         "Update Error",
//         "Unable to update storage details."
//       );
//     }
//   };

//   // =========================================================
//   // DELETE
//   // =========================================================

//   const deleteStorage = (item) => {
//     const id = getId(item);

//     if (!id) {
//       Alert.alert(
//         "Error",
//         "Storage ID not found."
//       );
//       return;
//     }

//     Alert.alert(
//       "Delete Storage",
//       "Are you sure you want to delete this storage record?",
//       [
//         {
//           text: "Cancel",
//           style: "cancel",
//         },
//         {
//           text: "Delete",
//           style: "destructive",
//           onPress: async () => {
//             try {
//               console.log(
//                 "🗑️ Deleting storage:",
//                 id
//               );

//               const response = await api.delete(
//                 `/storage/${id}`
//               );

//               console.log(
//                 "DELETE RESPONSE:",
//                 response.data
//               );

//               if (response.data?.success) {
//                 Alert.alert(
//                   "Deleted",
//                   "Storage record deleted successfully."
//                 );

//                 setExpandedId(null);
//                 setEditingId(null);

//                 await fetchInventory();
//               } else {
//                 Alert.alert(
//                   "Error",
//                   response.data?.message ||
//                     "Unable to delete storage record."
//                 );
//               }
//             } catch (error) {
//               console.error(
//                 "DELETE STORAGE ERROR:",
//                 error?.response?.data ||
//                   error?.message ||
//                   error
//               );

//               Alert.alert(
//                 "Delete Error",
//                 "Unable to delete this storage record."
//               );
//             }
//           },
//         },
//       ]
//     );
//   };

//   // =========================================================
//   // LOADING
//   // =========================================================

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <View style={styles.loadingIcon}>
//           <Ionicons
//             name="cube-outline"
//             size={32}
//             color="#2E7D32"
//           />
//         </View>

//         <ActivityIndicator
//           size="large"
//           color="#2E7D32"
//           style={{ marginTop: 18 }}
//         />

//         <Text style={styles.loadingText}>
//           Loading inventory...
//         </Text>
//       </View>
//     );
//   }

//   // =========================================================
//   // UI
//   // =========================================================

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={
//           styles.scrollContent
//         }
//       >
//         {/* HEADER */}

//         <View style={styles.header}>
//           <View style={{ flex: 1 }}>
//             <Text style={styles.heading}>
//               View Inventory
//             </Text>

//             <Text style={styles.subtitle}>
//               Track and manage stored crops
//             </Text>
//           </View>

//           <Pressable
//             style={styles.refreshButton}
//             onPress={fetchInventory}
//           >
//             <Ionicons
//               name="refresh-outline"
//               size={23}
//               color="#2E7D32"
//             />
//           </Pressable>
//         </View>

//         {/* SEARCH */}

//         <View style={styles.searchBox}>
//           <Ionicons
//             name="search-outline"
//             size={21}
//             color="#777"
//           />

//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search crop, room, rack, shelf..."
//             placeholderTextColor="#999"
//             value={search}
//             onChangeText={setSearch}
//           />

//           {search.length > 0 && (
//             <Pressable
//               onPress={() => setSearch("")}
//             >
//               <Ionicons
//                 name="close-circle"
//                 size={20}
//                 color="#999"
//               />
//             </Pressable>
//           )}
//         </View>

//         {/* SUMMARY */}

//         <View style={styles.summaryRow}>
//           <View style={styles.summaryCard}>
//             <View style={styles.summaryIcon}>
//               <Ionicons
//                 name="layers-outline"
//                 size={22}
//                 color="#2E7D32"
//               />
//             </View>

//             <Text style={styles.summaryNumber}>
//               {totalEntries}
//             </Text>

//             <Text style={styles.summaryLabel}>
//               Total Entries
//             </Text>
//           </View>

//           <View style={styles.summaryCard}>
//             <View style={styles.summaryIcon}>
//               <Ionicons
//                 name="leaf-outline"
//                 size={22}
//                 color="#2E7D32"
//               />
//             </View>

//             <Text style={styles.summaryNumber}>
//               {totalCrops}
//             </Text>

//             <Text style={styles.summaryLabel}>
//               Total Crops
//             </Text>
//           </View>
//         </View>

//         {/* DATE */}

//         <View style={styles.filterSection}>
//           <View style={styles.filterTitleRow}>
//             <View style={styles.filterTitleLeft}>
//               <Ionicons
//                 name="calendar-outline"
//                 size={20}
//                 color="#2E7D32"
//               />

//               <Text style={styles.filterTitle}>
//                 Storage Date
//               </Text>
//             </View>

//             {selectedDate !== "ALL" && (
//               <Pressable
//                 onPress={() =>
//                   setSelectedDate("ALL")
//                 }
//               >
//                 <Text style={styles.clearSmall}>
//                   Clear
//                 </Text>
//               </Pressable>
//             )}
//           </View>

//           <Text style={styles.filterSubtitle}>
//             Select a date to see the crops entered
//             on that day
//           </Text>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={
//               styles.horizontalList
//             }
//           >
//             <Pressable
//               style={[
//                 styles.dateChip,
//                 selectedDate === "ALL" &&
//                   styles.dateChipActive,
//               ]}
//               onPress={() =>
//                 setSelectedDate("ALL")
//               }
//             >
//               <Text
//                 style={[
//                   styles.dateDay,
//                   selectedDate === "ALL" &&
//                     styles.activeWhiteText,
//                 ]}
//               >
//                 ALL
//               </Text>

//               <Text
//                 style={[
//                   styles.dateMonth,
//                   selectedDate === "ALL" &&
//                     styles.activeWhiteText,
//                 ]}
//               >
//                 Dates
//               </Text>
//             </Pressable>

//             {availableDates.map((date) => {
//               const active =
//                 selectedDate === date;

//               return (
//                 <Pressable
//                   key={date}
//                   style={[
//                     styles.dateChip,
//                     active &&
//                       styles.dateChipActive,
//                   ]}
//                   onPress={() =>
//                     setSelectedDate(date)
//                   }
//                 >
//                   <View
//                     style={[
//                       styles.dateDot,
//                       active &&
//                         styles.dateDotActive,
//                     ]}
//                   />

//                   <Text
//                     style={[
//                       styles.dateDay,
//                       active &&
//                         styles.activeWhiteText,
//                     ]}
//                   >
//                     {date.substring(8, 10)}
//                   </Text>

//                   <Text
//                     style={[
//                       styles.dateMonth,
//                       active &&
//                         styles.activeWhiteText,
//                     ]}
//                   >
//                     {formatMonth(date)}
//                   </Text>
//                 </Pressable>
//               );
//             })}
//           </ScrollView>
//         </View>

//         {/* CROP FILTER */}

//         <View style={styles.filterSection}>
//           <View style={styles.filterTitleRow}>
//             <View style={styles.filterTitleLeft}>
//               <Ionicons
//                 name="leaf-outline"
//                 size={20}
//                 color="#2E7D32"
//               />

//               <Text style={styles.filterTitle}>
//                 Crop Type
//               </Text>
//             </View>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={
//               styles.horizontalList
//             }
//           >
//             <FilterChip
//               title="All Crops"
//               active={selectedCrop === "ALL"}
//               onPress={() =>
//                 setSelectedCrop("ALL")
//               }
//             />

//             {availableCrops.map((crop) => (
//               <FilterChip
//                 key={crop}
//                 title={crop}
//                 active={selectedCrop === crop}
//                 onPress={() =>
//                   setSelectedCrop(crop)
//                 }
//               />
//             ))}
//           </ScrollView>
//         </View>

//         {/* RACK / SHELF */}

//         <View style={styles.filterSection}>
//           <View style={styles.filterTitleRow}>
//             <View style={styles.filterTitleLeft}>
//               <Ionicons
//                 name="grid-outline"
//                 size={20}
//                 color="#2E7D32"
//               />

//               <Text style={styles.filterTitle}>
//                 Rack / Shelf
//               </Text>
//             </View>
//           </View>

//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={
//               styles.horizontalList
//             }
//           >
//             <FilterChip
//               title="All"
//               active={
//                 selectedRackShelf === "ALL"
//               }
//               onPress={() =>
//                 setSelectedRackShelf("ALL")
//               }
//             />

//             {availableRackShelves.map((value) => (
//               <FilterChip
//                 key={value}
//                 title={value}
//                 active={
//                   selectedRackShelf === value
//                 }
//                 onPress={() =>
//                   setSelectedRackShelf(value)
//                 }
//               />
//             ))}
//           </ScrollView>
//         </View>

//         {/* CLEAR */}

//         {hasFilters && (
//           <Pressable
//             style={styles.clearFilters}
//             onPress={clearFilters}
//           >
//             <Ionicons
//               name="close-circle-outline"
//               size={18}
//               color="#2E7D32"
//             />

//             <Text
//               style={styles.clearFiltersText}
//             >
//               Clear all filters
//             </Text>
//           </Pressable>
//         )}

//         {/* RESULT */}

//         <View style={styles.resultHeader}>
//           <View>
//             <Text style={styles.resultTitle}>
//               Stored Crops
//             </Text>

//             <Text style={styles.resultSubtitle}>
//               {filteredInventory.length}{" "}
//               {filteredInventory.length === 1
//                 ? "entry"
//                 : "entries"}{" "}
//               found
//             </Text>
//           </View>

//           <View style={styles.resultBadge}>
//             <Ionicons
//               name="cube-outline"
//               size={17}
//               color="#2E7D32"
//             />

//             <Text
//               style={styles.resultBadgeText}
//             >
//               {filteredInventory.length}
//             </Text>
//           </View>
//         </View>

//         {/* EMPTY */}

//         {filteredInventory.length === 0 && (
//           <View style={styles.emptyCard}>
//             <View style={styles.emptyIcon}>
//               <Ionicons
//                 name="file-tray-outline"
//                 size={38}
//                 color="#2E7D32"
//               />
//             </View>

//             <Text style={styles.emptyTitle}>
//               No inventory found
//             </Text>

//             <Text style={styles.emptyText}>
//               No storage records match your
//               selected search or filters.
//             </Text>

//             {hasFilters && (
//               <Pressable
//                 style={styles.emptyClear}
//                 onPress={clearFilters}
//               >
//                 <Text
//                   style={styles.emptyClearText}
//                 >
//                   Clear Filters
//                 </Text>
//               </Pressable>
//             )}
//           </View>
//         )}

//         {/* =================================================
//             INVENTORY
//         ================================================= */}

//         {filteredInventory.map(
//           (item, index) => {
//             const id = getId(item);

//             const crop = getCropName(item);
//             const variety =
//               getCropVariety(item);
//             const quantity =
//               getQuantity(item);

//             const room = getRoom(item);
//             const rack = getRack(item);
//             const shelf = getShelf(item);
//             const date =
//               getStorageDate(item);

//             const expanded =
//               expandedId === id;

//             const editing =
//               editingId === id;

//             return (
//               <View
//                 key={id || index}
//                 style={[
//                   styles.inventoryCard,
//                   expanded &&
//                     styles.inventoryCardExpanded,
//                 ]}
//               >
//                 {/* CARD TOP */}

//                 <View style={styles.cardTop}>
//                   <View style={styles.cropIcon}>
//                     <Ionicons
//                       name="leaf-outline"
//                       size={24}
//                       color="#2E7D32"
//                     />
//                   </View>

//                   <View style={styles.cropInfo}>
//                     <Text style={styles.cropName}>
//                       {crop || "Unknown Crop"}
//                     </Text>

//                     {variety ? (
//                       <Text
//                         style={styles.variety}
//                       >
//                         {variety}
//                       </Text>
//                     ) : null}
//                   </View>

//                   <View
//                     style={styles.quantityBox}
//                   >
//                     <Text
//                       style={
//                         styles.quantityNumber
//                       }
//                     >
//                       {quantity || "0"}
//                     </Text>

//                     <Text
//                       style={styles.quantityUnit}
//                     >
//                       kg
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={styles.divider} />

//                 {/* BASIC DATE */}

//                 <View style={styles.infoRow}>
//                   <View style={styles.infoItem}>
//                     <Ionicons
//                       name="calendar-outline"
//                       size={17}
//                       color="#2E7D32"
//                     />

//                     <View>
//                       <Text
//                         style={
//                           styles.infoLabel
//                         }
//                       >
//                         Storage Date
//                       </Text>

//                       <Text
//                         style={
//                           styles.infoValue
//                         }
//                       >
//                         {formatDate(date)}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>

//                 {/* ROOM / RACK / SHELF */}

//                 <View style={styles.locationGrid}>
//                   <InfoBox
//                     icon="business-outline"
//                     label="Room"
//                     value={room || "N/A"}
//                   />

//                   <InfoBox
//                     icon="layers-outline"
//                     label="Rack"
//                     value={rack || "N/A"}
//                   />

//                   <InfoBox
//                     icon="grid-outline"
//                     label="Shelf"
//                     value={shelf || "N/A"}
//                   />
//                 </View>

//                 {/* =================================================
//                     FULL DETAILS LINK
//                 ================================================= */}

//                 <Pressable
//                   style={styles.detailsLink}
//                   onPress={() =>
//                     toggleDetails(item)
//                   }
//                 >
//                   <Text
//                     style={
//                       styles.detailsLinkText
//                     }
//                   >
//                     {expanded
//                       ? "Hide Full Details"
//                       : "View Full Details"}
//                   </Text>

//                   <Ionicons
//                     name={
//                       expanded
//                         ? "chevron-up-outline"
//                         : "arrow-forward-outline"
//                     }
//                     size={18}
//                     color="#2E7D32"
//                   />
//                 </Pressable>

//                 {/* =================================================
//                     EXPANDED DETAILS
//                 ================================================= */}

//                 {expanded && (
//                   <View
//                     style={
//                       styles.fullDetailsContainer
//                     }
//                   >
//                     <View
//                       style={
//                         styles.detailsHeader
//                       }
//                     >
//                       <View>
//                         <Text
//                           style={
//                             styles.detailsTitle
//                           }
//                         >
//                           Complete Storage Details
//                         </Text>

//                         <Text
//                           style={
//                             styles.detailsSubtitle
//                           }
//                         >
//                           All information entered
//                           for this storage record
//                         </Text>
//                       </View>

//                       {!editing && (
//                         <Pressable
//                           style={
//                             styles.mainEditButton
//                           }
//                           onPress={() =>
//                             startEdit(item)
//                           }
//                         >
//                           <Ionicons
//                             name="create-outline"
//                             size={18}
//                             color="#2E7D32"
//                           />

//                           <Text
//                             style={
//                               styles.mainEditText
//                             }
//                           >
//                             Edit
//                           </Text>
//                         </Pressable>
//                       )}
//                     </View>

//                     {/* =========================
//                         CROP DETAILS
//                     ========================= */}

//                     <DetailSection
//                       icon="leaf-outline"
//                       title="Crop Details"
//                     >
//                       {editing ? (
//                         <>
//                           <EditField
//                             label="Crop Name"
//                             value={
//                               editData.crop_name
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "crop_name",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Crop Variety"
//                             value={
//                               editData.crop_variety
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "crop_variety",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Quantity (kg)"
//                             value={
//                               editData.quantity
//                             }
//                             keyboardType="numeric"
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "quantity",
//                                 v
//                               )
//                             }
//                           />
//                         </>
//                       ) : (
//                         <>
//                           <DetailRow
//                             label="Crop Name"
//                             value={
//                               getCropName(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Crop Variety"
//                             value={
//                               getCropVariety(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Quantity"
//                             value={`${getQuantity(
//                               item
//                             ) || "N/A"} kg`}
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />
//                         </>
//                       )}
//                     </DetailSection>

//                     {/* =========================
//                         STORAGE LOCATION
//                     ========================= */}

//                     <DetailSection
//                       icon="business-outline"
//                       title="Storage Location"
//                     >
//                       {editing ? (
//                         <>
//                           <EditField
//                             label="Storage Room"
//                             value={
//                               editData.storage_room
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "storage_room",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Storage Section / Area"
//                             value={
//                               editData.storage_section
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "storage_section",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Storage Type"
//                             value={
//                               editData.storage_type
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "storage_type",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Rack / Cabinet Number"
//                             value={
//                               editData.rack_cabinet_number
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "rack_cabinet_number",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Shelf Number"
//                             value={
//                               editData.shelf_number
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "shelf_number",
//                                 v
//                               )
//                             }
//                           />
//                         </>
//                       ) : (
//                         <>
//                           <DetailRow
//                             label="Storage Room"
//                             value={
//                               getRoom(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Storage Section / Area"
//                             value={
//                               getSection(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Storage Type"
//                             value={
//                               getStorageType(
//                                 item
//                               )
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Rack / Cabinet Number"
//                             value={
//                               getRack(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Shelf Number"
//                             value={
//                               getShelf(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />
//                         </>
//                       )}
//                     </DetailSection>

//                     {/* =========================
//                         STORAGE PERIOD
//                     ========================= */}

//                     <DetailSection
//                       icon="calendar-outline"
//                       title="Storage Period"
//                     >
//                       {editing ? (
//                         <>
//                           <EditField
//                             label="Storage Date"
//                             value={
//                               editData.storage_date
//                             }
//                             placeholder="YYYY-MM-DD"
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "storage_date",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Expected Market / Export Date"
//                             value={
//                               editData.expected_export_date
//                             }
//                             placeholder="YYYY-MM-DD"
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "expected_export_date",
//                                 v
//                               )
//                             }
//                           />
//                         </>
//                       ) : (
//                         <>
//                           <DetailRow
//                             label="Storage Date"
//                             value={formatDate(
//                               getStorageDate(
//                                 item
//                               )
//                             )}
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Expected Market / Export Date"
//                             value={formatDate(
//                               getExpectedExportDate(
//                                 item
//                               )
//                             )}
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />
//                         </>
//                       )}
//                     </DetailSection>

//                     {/* =========================
//                         MARKET DETAILS
//                     ========================= */}

//                     <DetailSection
//                       icon="location-outline"
//                       title="Market / Export Details"
//                     >
//                       {editing ? (
//                         <>
//                           <EditField
//                             label="Market Name"
//                             value={
//                               editData.market_name
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "market_name",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Destination / Place"
//                             value={
//                               editData.destination
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "destination",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Market Address"
//                             value={
//                               editData.market_address
//                             }
//                             multiline
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "market_address",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Market Owner Name"
//                             value={
//                               editData.owner_name
//                             }
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "owner_name",
//                                 v
//                               )
//                             }
//                           />

//                           <EditField
//                             label="Market Owner Phone"
//                             value={
//                               editData.owner_phone
//                             }
//                             keyboardType="phone-pad"
//                             onChangeText={(v) =>
//                               updateEditField(
//                                 "owner_phone",
//                                 v
//                               )
//                             }
//                           />
//                         </>
//                       ) : (
//                         <>
//                           <DetailRow
//                             label="Market Name"
//                             value={
//                               getMarketName(
//                                 item
//                               )
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Destination / Place"
//                             value={
//                               getDestination(
//                                 item
//                               )
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Market Address"
//                             value={
//                               getMarketAddress(
//                                 item
//                               )
//                             }
//                             multiline
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Market Owner Name"
//                             value={
//                               getOwnerName(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />

//                           <DetailRow
//                             label="Market Owner Phone"
//                             value={
//                               getOwnerPhone(item)
//                             }
//                             onEdit={() =>
//                               startEdit(item)
//                             }
//                           />
//                         </>
//                       )}
//                     </DetailSection>

//                     {/* =========================
//                         NOTES
//                     ========================= */}

//                     <DetailSection
//                       icon="document-text-outline"
//                       title="Additional Notes"
//                     >
//                       {editing ? (
//                         <EditField
//                           label="Notes"
//                           value={
//                             editData.notes
//                           }
//                           multiline
//                           onChangeText={(v) =>
//                             updateEditField(
//                               "notes",
//                               v
//                             )
//                           }
//                         />
//                       ) : (
//                         <DetailRow
//                           label="Notes"
//                           value={
//                             getNotes(item) ||
//                             "No additional notes"
//                           }
//                           multiline
//                           onEdit={() =>
//                             startEdit(item)
//                           }
//                         />
//                       )}
//                     </DetailSection>

//                     {/* =========================
//                         EDIT ACTIONS
//                     ========================= */}

//                     {editing && (
//                       <View
//                         style={
//                           styles.editActions
//                         }
//                       >
//                         <Pressable
//                           style={
//                             styles.cancelEditButton
//                           }
//                           onPress={() =>
//                             setEditingId(null)
//                           }
//                         >
//                           <Ionicons
//                             name="close-outline"
//                             size={19}
//                             color="#555"
//                           />

//                           <Text
//                             style={
//                               styles.cancelEditText
//                             }
//                           >
//                             Cancel
//                           </Text>
//                         </Pressable>

//                         <Pressable
//                           style={
//                             styles.saveEditButton
//                           }
//                           onPress={() =>
//                             saveEdit(item)
//                           }
//                         >
//                           <Ionicons
//                             name="checkmark-outline"
//                             size={19}
//                             color="#FFFFFF"
//                           />

//                           <Text
//                             style={
//                               styles.saveEditText
//                             }
//                           >
//                             Save Changes
//                           </Text>
//                         </Pressable>
//                       </View>
//                     )}

//                     {/* =========================
//                         DELETE
//                     ========================= */}

//                     {!editing && (
//                       <Pressable
//                         style={
//                           styles.deleteLink
//                         }
//                         onPress={() =>
//                           deleteStorage(item)
//                         }
//                       >
//                         <Ionicons
//                           name="trash-outline"
//                           size={18}
//                           color="#D32F2F"
//                         />

//                         <Text
//                           style={
//                             styles.deleteLinkText
//                           }
//                         >
//                           Delete Storage Record
//                         </Text>
//                       </Pressable>
//                     )}
//                   </View>
//                 )}
//               </View>
//             );
//           }
//         )}

//         <View style={styles.bottomSpace} />
//       </ScrollView>
//     </View>
//   );
// }

// // =========================================================
// // MONTH FORMAT
// // =========================================================

// function formatMonth(date) {
//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   const monthNumber =
//     Number(date.substring(5, 7));

//   return `${months[monthNumber - 1]} ${date.substring(
//     0,
//     4
//   )}`;
// }

// // =========================================================
// // FILTER CHIP
// // =========================================================

// function FilterChip({
//   title,
//   active,
//   onPress,
// }) {
//   return (
//     <Pressable
//       style={[
//         styles.filterChip,
//         active &&
//           styles.filterChipActive,
//       ]}
//       onPress={onPress}
//     >
//       {active && (
//         <Ionicons
//           name="checkmark-circle"
//           size={16}
//           color="#FFFFFF"
//         />
//       )}

//       <Text
//         style={[
//           styles.filterChipText,
//           active &&
//             styles.filterChipTextActive,
//         ]}
//       >
//         {title}
//       </Text>
//     </Pressable>
//   );
// }

// // =========================================================
// // INFO BOX
// // =========================================================

// function InfoBox({
//   icon,
//   label,
//   value,
// }) {
//   return (
//     <View style={styles.infoBox}>
//       <Ionicons
//         name={icon}
//         size={17}
//         color="#2E7D32"
//       />

//       <View style={{ flex: 1 }}>
//         <Text
//           style={styles.infoBoxLabel}
//         >
//           {label}
//         </Text>

//         <Text
//           style={styles.infoBoxValue}
//           numberOfLines={1}
//         >
//           {value}
//         </Text>
//       </View>
//     </View>
//   );
// }

// // =========================================================
// // DETAIL SECTION
// // =========================================================

// function DetailSection({
//   icon,
//   title,
//   children,
// }) {
//   return (
//     <View style={styles.detailSection}>
//       <View style={styles.detailSectionHeader}>
//         <View style={styles.detailIcon}>
//           <Ionicons
//             name={icon}
//             size={18}
//             color="#2E7D32"
//           />
//         </View>

//         <Text
//           style={styles.detailSectionTitle}
//         >
//           {title}
//         </Text>
//       </View>

//       <View>
//         {children}
//       </View>
//     </View>
//   );
// }

// // =========================================================
// // DETAIL ROW
// // =========================================================

// function DetailRow({
//   label,
//   value,
//   onEdit,
//   multiline,
// }) {
//   return (
//     <View style={styles.detailRow}>
//       <View style={{ flex: 1 }}>
//         <Text
//           style={styles.detailLabel}
//         >
//           {label}
//         </Text>

//         <Text
//           style={[
//             styles.detailValue,
//             multiline &&
//               styles.detailMultiline,
//           ]}
//         >
//           {value || "Not available"}
//         </Text>
//       </View>

//       <Pressable
//         style={styles.rowEditButton}
//         onPress={onEdit}
//       >
//         <Ionicons
//           name="create-outline"
//           size={18}
//           color="#2E7D32"
//         />
//       </Pressable>
//     </View>
//   );
// }

// // =========================================================
// // EDIT FIELD
// // =========================================================

// function EditField({
//   label,
//   value,
//   onChangeText,
//   placeholder,
//   keyboardType,
//   multiline,
// }) {
//   return (
//     <View style={styles.editField}>
//       <Text style={styles.editLabel}>
//         {label}
//       </Text>

//       <TextInput
//         style={[
//           styles.editInput,
//           multiline &&
//             styles.editMultiline,
//         ]}
//         value={value}
//         onChangeText={onChangeText}
//         placeholder={
//           placeholder || `Enter ${label}`
//         }
//         placeholderTextColor="#999"
//         keyboardType={
//           keyboardType || "default"
//         }
//         multiline={multiline || false}
//         textAlignVertical={
//           multiline ? "top" : "center"
//         }
//       />
//     </View>
//   );
// }

// // =========================================================
// // STYLES
// // =========================================================

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F5F7F5",
//   },

//   scrollContent: {
//     padding: 20,
//     paddingBottom: 40,
//   },

//   // HEADER

//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },

//   heading: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#1B5E20",
//   },

//   subtitle: {
//     fontSize: 14,
//     color: "#777",
//     marginTop: 5,
//   },

//   refreshButton: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   // SEARCH

//   searchBox: {
//     height: 52,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#DCE8DC",
//     flexDirection: "row",
//     alignItems: "center",
//     paddingHorizontal: 15,
//     marginBottom: 18,
//   },

//   searchInput: {
//     flex: 1,
//     fontSize: 15,
//     color: "#333",
//     marginLeft: 10,
//   },

//   // SUMMARY

//   summaryRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginBottom: 22,
//   },

//   summaryCard: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 17,
//     padding: 17,
//     borderWidth: 1,
//     borderColor: "#DCE8DC",
//     minHeight: 130,
//   },

//   summaryIcon: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 10,
//   },

//   summaryNumber: {
//     fontSize: 28,
//     fontWeight: "800",
//     color: "#1B5E20",
//   },

//   summaryLabel: {
//     fontSize: 13,
//     color: "#777",
//     marginTop: 3,
//     fontWeight: "600",
//   },

//   // FILTER

//   filterSection: {
//     marginBottom: 20,
//   },

//   filterTitleRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 5,
//   },

//   filterTitleLeft: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 8,
//   },

//   filterTitle: {
//     fontSize: 16,
//     fontWeight: "800",
//     color: "#333",
//   },

//   filterSubtitle: {
//     fontSize: 12,
//     color: "#888",
//     marginBottom: 12,
//   },

//   clearSmall: {
//     color: "#2E7D32",
//     fontWeight: "700",
//     fontSize: 13,
//   },

//   horizontalList: {
//     gap: 9,
//     paddingVertical: 3,
//   },

//   // DATE

//   dateChip: {
//     minWidth: 76,
//     height: 72,
//     backgroundColor: "#FFFFFF",
//     borderRadius: 14,
//     borderWidth: 1,
//     borderColor: "#DCE8DC",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 9,
//   },

//   dateChipActive: {
//     backgroundColor: "#2E7D32",
//     borderColor: "#2E7D32",
//   },

//   dateDot: {
//     position: "absolute",
//     top: 7,
//     right: 8,
//     width: 7,
//     height: 7,
//     borderRadius: 5,
//     backgroundColor: "#35A853",
//   },

//   dateDotActive: {
//     backgroundColor: "#FFFFFF",
//   },

//   dateDay: {
//     fontSize: 19,
//     fontWeight: "800",
//     color: "#1B5E20",
//   },

//   dateMonth: {
//     fontSize: 11,
//     color: "#777",
//     marginTop: 2,
//     fontWeight: "600",
//   },

//   activeWhiteText: {
//     color: "#FFFFFF",
//   },

//   // FILTER CHIP

//   filterChip: {
//     minHeight: 40,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: "#CFE0CF",
//     backgroundColor: "#FFFFFF",
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   filterChipActive: {
//     backgroundColor: "#2E7D32",
//     borderColor: "#2E7D32",
//   },

//   filterChipText: {
//     fontSize: 13,
//     color: "#2E7D32",
//     fontWeight: "700",
//   },

//   filterChipTextActive: {
//     color: "#FFFFFF",
//   },

//   // CLEAR

//   clearFilters: {
//     height: 42,
//     borderRadius: 11,
//     borderWidth: 1,
//     borderColor: "#B8D1BA",
//     backgroundColor: "#EAF6EC",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 7,
//     marginBottom: 20,
//   },

//   clearFiltersText: {
//     color: "#2E7D32",
//     fontWeight: "700",
//     fontSize: 14,
//   },

//   // RESULT

//   resultHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 12,
//   },

//   resultTitle: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#222",
//   },

//   resultSubtitle: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 3,
//   },

//   resultBadge: {
//     minWidth: 48,
//     height: 34,
//     borderRadius: 17,
//     backgroundColor: "#EAF6EC",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 5,
//     paddingHorizontal: 10,
//   },

//   resultBadgeText: {
//     color: "#2E7D32",
//     fontWeight: "800",
//   },

//   // CARD

//   inventoryCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 17,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#DCE8DC",
//     elevation: 3,
//   },

//   inventoryCardExpanded: {
//     borderColor: "#A8CBAA",
//     elevation: 5,
//   },

//   cardTop: {
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   cropIcon: {
//     width: 48,
//     height: 48,
//     borderRadius: 14,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 12,
//   },

//   cropInfo: {
//     flex: 1,
//   },

//   cropName: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#1B5E20",
//   },

//   variety: {
//     fontSize: 12,
//     color: "#888",
//     marginTop: 3,
//   },

//   quantityBox: {
//     alignItems: "flex-end",
//   },

//   quantityNumber: {
//     fontSize: 20,
//     fontWeight: "800",
//     color: "#222",
//   },

//   quantityUnit: {
//     fontSize: 12,
//     color: "#777",
//     fontWeight: "600",
//   },

//   divider: {
//     height: 1,
//     backgroundColor: "#EDF1ED",
//     marginVertical: 15,
//   },

//   infoRow: {
//     marginBottom: 13,
//   },

//   infoItem: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 9,
//   },

//   infoLabel: {
//     fontSize: 11,
//     color: "#999",
//     marginBottom: 2,
//   },

//   infoValue: {
//     fontSize: 14,
//     fontWeight: "700",
//     color: "#333",
//   },

//   locationGrid: {
//     flexDirection: "row",
//     gap: 8,
//   },

//   infoBox: {
//     flex: 1,
//     minHeight: 62,
//     backgroundColor: "#F7FAF7",
//     borderRadius: 11,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: "#E3ECE3",
//     flexDirection: "column",
//     justifyContent: "center",
//     gap: 4,
//   },

//   infoBoxLabel: {
//     fontSize: 10,
//     color: "#999",
//     fontWeight: "600",
//   },

//   infoBoxValue: {
//     fontSize: 13,
//     color: "#333",
//     fontWeight: "800",
//   },

//   // DETAILS LINK

//   detailsLink: {
//     marginTop: 15,
//     paddingTop: 13,
//     borderTopWidth: 1,
//     borderTopColor: "#EDF1ED",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     gap: 6,
//   },

//   detailsLinkText: {
//     color: "#2E7D32",
//     fontSize: 14,
//     fontWeight: "800",
//   },

//   // FULL DETAILS

//   fullDetailsContainer: {
//     marginTop: 17,
//     paddingTop: 17,
//     borderTopWidth: 1,
//     borderTopColor: "#DCE8DC",
//   },

//   detailsHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 16,
//   },

//   detailsTitle: {
//     fontSize: 17,
//     fontWeight: "800",
//     color: "#1B5E20",
//   },

//   detailsSubtitle: {
//     fontSize: 11,
//     color: "#888",
//     marginTop: 3,
//     maxWidth: 220,
//   },

//   mainEditButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     paddingHorizontal: 11,
//     paddingVertical: 8,
//     borderRadius: 9,
//     backgroundColor: "#EAF6EC",
//   },

//   mainEditText: {
//     color: "#2E7D32",
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   // DETAIL SECTION

//   detailSection: {
//     backgroundColor: "#F8FBF8",
//     borderRadius: 13,
//     borderWidth: 1,
//     borderColor: "#E2ECE2",
//     padding: 13,
//     marginBottom: 12,
//   },

//   detailSectionHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 8,
//   },

//   detailIcon: {
//     width: 34,
//     height: 34,
//     borderRadius: 10,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginRight: 9,
//   },

//   detailSectionTitle: {
//     fontSize: 15,
//     fontWeight: "800",
//     color: "#333",
//   },

//   // DETAIL ROW

//   detailRow: {
//     minHeight: 52,
//     flexDirection: "row",
//     alignItems: "center",
//     borderTopWidth: 1,
//     borderTopColor: "#E8EEE8",
//     paddingVertical: 8,
//   },

//   detailLabel: {
//     fontSize: 11,
//     color: "#888",
//     marginBottom: 3,
//     fontWeight: "600",
//   },

//   detailValue: {
//     fontSize: 14,
//     color: "#333",
//     fontWeight: "700",
//   },

//   detailMultiline: {
//     lineHeight: 20,
//   },

//   rowEditButton: {
//     width: 34,
//     height: 34,
//     borderRadius: 10,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginLeft: 10,
//   },

//   // EDIT

//   editField: {
//     marginBottom: 11,
//   },

//   editLabel: {
//     fontSize: 11,
//     color: "#777",
//     fontWeight: "700",
//     marginBottom: 5,
//   },

//   editInput: {
//     minHeight: 44,
//     borderWidth: 1,
//     borderColor: "#C8DAC9",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 9,
//     paddingHorizontal: 12,
//     fontSize: 14,
//     color: "#333",
//   },

//   editMultiline: {
//     minHeight: 80,
//     paddingTop: 10,
//   },

//   editActions: {
//     flexDirection: "row",
//     gap: 10,
//     marginTop: 4,
//     marginBottom: 12,
//   },

//   cancelEditButton: {
//     flex: 1,
//     minHeight: 46,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#CCCCCC",
//     backgroundColor: "#FFFFFF",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 6,
//   },

//   cancelEditText: {
//     color: "#555",
//     fontWeight: "800",
//   },

//   saveEditButton: {
//     flex: 1.4,
//     minHeight: 46,
//     borderRadius: 10,
//     backgroundColor: "#2E7D32",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 6,
//   },

//   saveEditText: {
//     color: "#FFFFFF",
//     fontWeight: "800",
//   },

//   // DELETE

//   deleteLink: {
//     minHeight: 44,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: "#F1CACA",
//     backgroundColor: "#FFF7F7",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 7,
//   },

//   deleteLinkText: {
//     color: "#D32F2F",
//     fontSize: 13,
//     fontWeight: "800",
//   },

//   // EMPTY

//   emptyCard: {
//     backgroundColor: "#FFFFFF",
//     borderRadius: 18,
//     padding: 30,
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#DCE8DC",
//     marginTop: 5,
//   },

//   emptyIcon: {
//     width: 70,
//     height: 70,
//     borderRadius: 22,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//     marginBottom: 15,
//   },

//   emptyTitle: {
//     fontSize: 18,
//     fontWeight: "800",
//     color: "#333",
//   },

//   emptyText: {
//     textAlign: "center",
//     color: "#888",
//     fontSize: 13,
//     lineHeight: 20,
//     marginTop: 7,
//   },

//   emptyClear: {
//     marginTop: 17,
//     backgroundColor: "#2E7D32",
//     paddingHorizontal: 18,
//     paddingVertical: 10,
//     borderRadius: 10,
//   },

//   emptyClearText: {
//     color: "#FFFFFF",
//     fontWeight: "700",
//   },

//   // LOADING

//   loadingContainer: {
//     flex: 1,
//     backgroundColor: "#F5F7F5",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   loadingIcon: {
//     width: 65,
//     height: 65,
//     borderRadius: 20,
//     backgroundColor: "#EAF6EC",
//     alignItems: "center",
//     justifyContent: "center",
//   },

//   loadingText: {
//     marginTop: 12,
//     color: "#777",
//     fontSize: 14,
//   },

//   bottomSpace: {
//     height: 30,
//   },
// });








import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../../services/api";

export default function ViewInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search + filters
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("ALL");
  const [selectedCrop, setSelectedCrop] = useState("ALL");
  const [selectedRackShelf, setSelectedRackShelf] = useState("ALL");

  // Expanded card
  const [expandedId, setExpandedId] = useState(null);

  // Edit modal
  const [editVisible, setEditVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  // =========================================================
  // FETCH INVENTORY
  // =========================================================

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const response = await api.get("/storage");

      console.log("VIEW INVENTORY RESPONSE:", response.data);

      const data = response.data;

      if (data.success) {
        const records =
          data.data ||
          data.storage ||
          data.storageDetails ||
          data.results ||
          [];

        setInventory(Array.isArray(records) ? records : []);
      } else {
        setInventory([]);

        Alert.alert(
          "Error",
          data.message || "Unable to fetch inventory"
        );
      }
    } catch (error) {
      console.error("FETCH INVENTORY ERROR:", error);

      Alert.alert(
        "Connection Error",
        "Unable to connect to the VineSafe server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // HELPERS
  // =========================================================

  const getValue = (item, ...keys) => {
    for (const key of keys) {
      if (
        item?.[key] !== undefined &&
        item?.[key] !== null &&
        item?.[key] !== ""
      ) {
        return item[key];
      }
    }

    return "";
  };

  const getId = (item) =>
    getValue(item, "storage_id", "storageId", "id");

  const getCropName = (item) =>
    getValue(item, "crop_name", "cropName", "crop");

  const getCropVariety = (item) =>
    getValue(
      item,
      "crop_variety",
      "cropVariety",
      "variety"
    );

  const getQuantity = (item) =>
    getValue(item, "quantity", "qty");

  const getRoom = (item) =>
    getValue(
      item,
      "storage_room",
      "storageRoom",
      "room_number",
      "roomNumber",
      "room_no",
      "roomNo"
    );

  const getSection = (item) =>
    getValue(
      item,
      "storage_section",
      "storageSection",
      "section",
      "area"
    );

  const getStorageType = (item) =>
    getValue(
      item,
      "storage_type",
      "storageType"
    );

  const getRack = (item) =>
    getValue(
      item,
      "rack_cabinet_number",
      "rackCabinetNumber",
      "rack_number",
      "rackNumber",
      "rack_no",
      "rackNo"
    );

  const getShelf = (item) =>
    getValue(
      item,
      "shelf_number",
      "shelfNumber",
      "shelf_no",
      "shelfNo"
    );

  const getStorageDate = (item) =>
    getValue(
      item,
      "storage_date",
      "storageDate",
      "created_at",
      "createdAt"
    );

  const getExpectedExportDate = (item) =>
    getValue(
      item,
      "expected_export_date",
      "expectedExportDate",
      "export_date",
      "exportDate"
    );

  const getMarketName = (item) =>
    getValue(
      item,
      "market_name",
      "marketName"
    );

  const getDestination = (item) =>
    getValue(
      item,
      "destination",
      "destination_place",
      "destinationPlace"
    );

  const getMarketAddress = (item) =>
    getValue(
      item,
      "market_address",
      "marketAddress"
    );

  const getOwnerName = (item) =>
    getValue(
      item,
      "owner_name",
      "ownerName",
      "market_owner_name"
    );

  const getOwnerPhone = (item) =>
    getValue(
      item,
      "owner_phone",
      "ownerPhone",
      "market_owner_phone"
    );

  const getNotes = (item) =>
    getValue(
      item,
      "notes",
      "additional_notes"
    );

  // =========================================================
  // DATE HELPERS
  // =========================================================

  const normalizeDate = (dateValue) => {
    if (!dateValue) return "";

    try {
      const stringValue = String(dateValue);

      if (/^\d{4}-\d{2}-\d{2}$/.test(stringValue)) {
        return stringValue;
      }

      const date = new Date(dateValue);

      if (isNaN(date.getTime())) {
        return stringValue.substring(0, 10);
      }

      const year = date.getFullYear();
      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        date.getDate()
      ).padStart(2, "0");

      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return "Not available";

    const normalized = normalizeDate(dateValue);

    if (!normalized) return "Not available";

    const [year, month, day] =
      normalized.split("-");

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return `${day} ${months[Number(month) - 1]} ${year}`;
  };

  // =========================================================
  // AVAILABLE DATES
  // =========================================================

  const availableDates = useMemo(() => {
    const dateMap = {};

    inventory.forEach((item) => {
      const date = normalizeDate(
        getStorageDate(item)
      );

      if (date) {
        dateMap[date] = true;
      }
    });

    return Object.keys(dateMap).sort(
      (a, b) =>
        new Date(b) - new Date(a)
    );
  }, [inventory]);

  // =========================================================
  // AVAILABLE CROPS
  // =========================================================

  const availableCrops = useMemo(() => {
    const crops = inventory
      .map((item) => getCropName(item))
      .filter(Boolean);

    return [...new Set(crops)].sort();
  }, [inventory]);

  // =========================================================
  // AVAILABLE RACK / SHELF
  // =========================================================

  const availableRackShelves = useMemo(() => {
    const values = inventory
      .map((item) => {
        const rack = getRack(item);
        const shelf = getShelf(item);

        if (rack && shelf) {
          return `${rack} / ${shelf}`;
        }

        return rack || shelf || "";
      })
      .filter(Boolean);

    return [...new Set(values)].sort();
  }, [inventory]);

  // =========================================================
  // FILTER
  // =========================================================

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const crop = String(
        getCropName(item)
      ).toLowerCase();

      const variety = String(
        getCropVariety(item)
      ).toLowerCase();

      const room = String(
        getRoom(item)
      ).toLowerCase();

      const rack = String(
        getRack(item)
      ).toLowerCase();

      const shelf = String(
        getShelf(item)
      ).toLowerCase();

      const quantity = String(
        getQuantity(item)
      ).toLowerCase();

      const searchText =
        search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        crop.includes(searchText) ||
        variety.includes(searchText) ||
        room.includes(searchText) ||
        rack.includes(searchText) ||
        shelf.includes(searchText) ||
        quantity.includes(searchText);

      const itemDate = normalizeDate(
        getStorageDate(item)
      );

      const matchesDate =
        selectedDate === "ALL" ||
        itemDate === selectedDate;

      const matchesCrop =
        selectedCrop === "ALL" ||
        crop === selectedCrop.toLowerCase();

      const currentRack = getRack(item);
      const currentShelf = getShelf(item);

      const rackShelf =
        currentRack && currentShelf
          ? `${currentRack} / ${currentShelf}`
          : currentRack || currentShelf || "";

      const matchesRackShelf =
        selectedRackShelf === "ALL" ||
        rackShelf === selectedRackShelf;

      return (
        matchesSearch &&
        matchesDate &&
        matchesCrop &&
        matchesRackShelf
      );
    });
  }, [
    inventory,
    search,
    selectedDate,
    selectedCrop,
    selectedRackShelf,
  ]);

  // =========================================================
  // COUNTS
  // =========================================================

  const totalEntries =
    filteredInventory.length;

  const totalCrops = useMemo(() => {
    const cropSet = new Set();

    filteredInventory.forEach((item) => {
      const crop = getCropName(item);

      if (crop) {
        cropSet.add(
          String(crop).toLowerCase()
        );
      }
    });

    return cropSet.size;
  }, [filteredInventory]);

  // =========================================================
  // CLEAR FILTERS
  // =========================================================

  const clearFilters = () => {
    setSearch("");
    setSelectedDate("ALL");
    setSelectedCrop("ALL");
    setSelectedRackShelf("ALL");
  };

  const hasFilters =
    search ||
    selectedDate !== "ALL" ||
    selectedCrop !== "ALL" ||
    selectedRackShelf !== "ALL";

  // =========================================================
  // EXPAND DETAILS
  // =========================================================

  const toggleDetails = (item) => {
    const id = getId(item);

    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const openEditForm = (item) => {
    const id = getId(item);

    if (!id) {
      Alert.alert(
        "Error",
        "Storage ID not found."
      );
      return;
    }

    setEditingId(id);

    setEditData({
      crop_name: String(
        getCropName(item) || ""
      ),

      crop_variety: String(
        getCropVariety(item) || ""
      ),

      quantity: String(
        getQuantity(item) || ""
      ),

      storage_room: String(
        getRoom(item) || ""
      ),

      storage_section: String(
        getSection(item) || ""
      ),

      storage_type: String(
        getStorageType(item) || "Rack"
      ),

      rack_cabinet_number: String(
        getRack(item) || ""
      ),

      shelf_number: String(
        getShelf(item) || ""
      ),

      storage_date: normalizeDate(
        getStorageDate(item)
      ),

      expected_export_date:
        normalizeDate(
          getExpectedExportDate(item)
        ),

      market_name: String(
        getMarketName(item) || ""
      ),

      destination: String(
        getDestination(item) || ""
      ),

      market_address: String(
        getMarketAddress(item) || ""
      ),

      owner_name: String(
        getOwnerName(item) || ""
      ),

      owner_phone: String(
        getOwnerPhone(item) || ""
      ),

      notes: String(
        getNotes(item) || ""
      ),
    });

    setEditVisible(true);
  };

  // =========================================================
  // CLOSE EDIT FORM
  // =========================================================

  const closeEditForm = () => {
    if (saving) return;

    setEditVisible(false);
    setEditingId(null);
    setEditData({});
  };

  // =========================================================
  // UPDATE FIELD
  // =========================================================

  const updateEditField = (
    field,
    value
  ) => {
    setEditData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // =========================================================
  // SAVE EDIT
  // =========================================================

  const saveEdit = async () => {
    if (!editingId) {
      Alert.alert(
        "Error",
        "Storage ID not found."
      );
      return;
    }

    if (!editData.crop_name?.trim()) {
      Alert.alert(
        "Required",
        "Please enter crop name."
      );
      return;
    }

    if (!editData.quantity?.trim()) {
      Alert.alert(
        "Required",
        "Please enter quantity."
      );
      return;
    }

    try {
      setSaving(true);

      console.log(
        "UPDATING STORAGE:",
        editingId
      );

      console.log(
        "UPDATE DATA:",
        editData
      );

      const response = await api.put(
        `/storage/update/${editingId}`,
        editData
      );

      console.log(
        "UPDATE RESPONSE:",
        response.data
      );

      if (response.data?.success) {
        setEditVisible(false);
        setEditingId(null);
        setEditData({});

        await fetchInventory();

        Alert.alert(
          "Updated",
          "Storage details updated successfully."
        );
      } else {
        Alert.alert(
          "Update Failed",
          response.data?.message ||
            "Unable to update storage details."
        );
      }
    } catch (error) {
      console.error(
        "UPDATE STORAGE ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );

      Alert.alert(
        "Update Error",
        error?.response?.data?.message ||
          "Unable to update storage details."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DELETE
  // =========================================================

  const deleteStorage = (item) => {
    const id = getId(item);

    if (!id) {
      Alert.alert(
        "Error",
        "Storage ID not found."
      );
      return;
    }

    Alert.alert(
      "Delete Storage",
      "Are you sure you want to delete this storage record?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            try {
              console.log(
                "Deleting storage:",
                id
              );

              const response =
                await api.delete(
                  `/storage/${id}`
                );

              console.log(
                "DELETE RESPONSE:",
                response.data
              );

              if (
                response.data?.success
              ) {
                setExpandedId(null);

                await fetchInventory();

                Alert.alert(
                  "Deleted",
                  "Storage record deleted successfully."
                );
              } else {
                Alert.alert(
                  "Error",
                  response.data?.message ||
                    "Unable to delete storage record."
                );
              }
            } catch (error) {
              console.error(
                "DELETE STORAGE ERROR:",
                error?.response?.data ||
                  error?.message ||
                  error
              );

              Alert.alert(
                "Delete Error",
                "Unable to delete this storage record."
              );
            }
          },
        },
      ]
    );
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <View style={styles.loadingIcon}>
          <Ionicons
            name="cube-outline"
            size={32}
            color="#2E7D32"
          />
        </View>

        <ActivityIndicator
          size="large"
          color="#2E7D32"
          style={{
            marginTop: 18,
          }}
        />

        <Text style={styles.loadingText}>
          Loading inventory...
        </Text>
      </View>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.scrollContent
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <View style={{ flex: 1 }}>
            <Text style={styles.heading}>
              View Inventory
            </Text>

            <Text style={styles.subtitle}>
              Track and manage stored crops
            </Text>
          </View>

          <Pressable
            style={styles.refreshButton}
            onPress={fetchInventory}
          >
            <Ionicons
              name="refresh-outline"
              size={23}
              color="#2E7D32"
            />
          </Pressable>
        </View>

        {/* SEARCH */}

        <View style={styles.searchBox}>
          <Ionicons
            name="search-outline"
            size={21}
            color="#777"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search crop, room, rack, shelf..."
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <Pressable
              onPress={() => setSearch("")}
            >
              <Ionicons
                name="close-circle"
                size={20}
                color="#999"
              />
            </Pressable>
          )}
        </View>

        {/* SUMMARY */}

        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="layers-outline"
                size={22}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.summaryNumber}>
              {totalEntries}
            </Text>

            <Text style={styles.summaryLabel}>
              Total Entries
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="leaf-outline"
                size={22}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.summaryNumber}>
              {totalCrops}
            </Text>

            <Text style={styles.summaryLabel}>
              Total Crops
            </Text>
          </View>
        </View>

        {/* DATE FILTER */}

        <View style={styles.filterSection}>
          <View style={styles.filterTitleRow}>
            <View style={styles.filterTitleLeft}>
              <Ionicons
                name="calendar-outline"
                size={20}
                color="#2E7D32"
              />

              <Text style={styles.filterTitle}>
                Storage Date
              </Text>
            </View>

            {selectedDate !== "ALL" && (
              <Pressable
                onPress={() =>
                  setSelectedDate("ALL")
                }
              >
                <Text style={styles.clearSmall}>
                  Clear
                </Text>
              </Pressable>
            )}
          </View>

          <Text style={styles.filterSubtitle}>
            Select a date to see the crops entered
            on that day
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.horizontalList
            }
          >
            <Pressable
              style={[
                styles.dateChip,
                selectedDate === "ALL" &&
                  styles.dateChipActive,
              ]}
              onPress={() =>
                setSelectedDate("ALL")
              }
            >
              <Text
                style={[
                  styles.dateDay,
                  selectedDate === "ALL" &&
                    styles.activeWhiteText,
                ]}
              >
                ALL
              </Text>

              <Text
                style={[
                  styles.dateMonth,
                  selectedDate === "ALL" &&
                    styles.activeWhiteText,
                ]}
              >
                Dates
              </Text>
            </Pressable>

            {availableDates.map((date) => {
              const active =
                selectedDate === date;

              return (
                <Pressable
                  key={date}
                  style={[
                    styles.dateChip,
                    active &&
                      styles.dateChipActive,
                  ]}
                  onPress={() =>
                    setSelectedDate(date)
                  }
                >
                  <View
                    style={[
                      styles.dateDot,
                      active &&
                        styles.dateDotActive,
                    ]}
                  />

                  <Text
                    style={[
                      styles.dateDay,
                      active &&
                        styles.activeWhiteText,
                    ]}
                  >
                    {date.substring(8, 10)}
                  </Text>

                  <Text
                    style={[
                      styles.dateMonth,
                      active &&
                        styles.activeWhiteText,
                    ]}
                  >
                    {formatMonth(date)}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        {/* CROP FILTER */}

        <View style={styles.filterSection}>
          <View style={styles.filterTitleRow}>
            <View style={styles.filterTitleLeft}>
              <Ionicons
                name="leaf-outline"
                size={20}
                color="#2E7D32"
              />

              <Text style={styles.filterTitle}>
                Crop Type
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.horizontalList
            }
          >
            <FilterChip
              title="All Crops"
              active={
                selectedCrop === "ALL"
              }
              onPress={() =>
                setSelectedCrop("ALL")
              }
            />

            {availableCrops.map((crop) => (
              <FilterChip
                key={crop}
                title={crop}
                active={
                  selectedCrop === crop
                }
                onPress={() =>
                  setSelectedCrop(crop)
                }
              />
            ))}
          </ScrollView>
        </View>

        {/* RACK / SHELF FILTER */}

        <View style={styles.filterSection}>
          <View style={styles.filterTitleRow}>
            <View style={styles.filterTitleLeft}>
              <Ionicons
                name="grid-outline"
                size={20}
                color="#2E7D32"
              />

              <Text style={styles.filterTitle}>
                Rack / Shelf
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={
              styles.horizontalList
            }
          >
            <FilterChip
              title="All"
              active={
                selectedRackShelf === "ALL"
              }
              onPress={() =>
                setSelectedRackShelf("ALL")
              }
            />

            {availableRackShelves.map(
              (value) => (
                <FilterChip
                  key={value}
                  title={value}
                  active={
                    selectedRackShelf ===
                    value
                  }
                  onPress={() =>
                    setSelectedRackShelf(
                      value
                    )
                  }
                />
              )
            )}
          </ScrollView>
        </View>

        {/* CLEAR FILTERS */}

        {hasFilters && (
          <Pressable
            style={styles.clearFilters}
            onPress={clearFilters}
          >
            <Ionicons
              name="close-circle-outline"
              size={18}
              color="#2E7D32"
            />

            <Text
              style={
                styles.clearFiltersText
              }
            >
              Clear all filters
            </Text>
          </Pressable>
        )}

        {/* RESULT HEADER */}

        <View style={styles.resultHeader}>
          <View>
            <Text style={styles.resultTitle}>
              Stored Crops
            </Text>

            <Text
              style={styles.resultSubtitle}
            >
              {filteredInventory.length}{" "}
              {filteredInventory.length === 1
                ? "entry"
                : "entries"}{" "}
              found
            </Text>
          </View>

          <View style={styles.resultBadge}>
            <Ionicons
              name="cube-outline"
              size={17}
              color="#2E7D32"
            />

            <Text
              style={
                styles.resultBadgeText
              }
            >
              {filteredInventory.length}
            </Text>
          </View>
        </View>

        {/* EMPTY */}

        {filteredInventory.length === 0 && (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIcon}>
              <Ionicons
                name="file-tray-outline"
                size={38}
                color="#2E7D32"
              />
            </View>

            <Text style={styles.emptyTitle}>
              No inventory found
            </Text>

            <Text style={styles.emptyText}>
              No storage records match your
              selected search or filters.
            </Text>

            {hasFilters && (
              <Pressable
                style={styles.emptyClear}
                onPress={clearFilters}
              >
                <Text
                  style={
                    styles.emptyClearText
                  }
                >
                  Clear Filters
                </Text>
              </Pressable>
            )}
          </View>
        )}

        {/* INVENTORY CARDS */}

        {filteredInventory.map(
          (item, index) => {
            const id = getId(item);

            const crop =
              getCropName(item);

            const variety =
              getCropVariety(item);

            const quantity =
              getQuantity(item);

            const room =
              getRoom(item);

            const rack =
              getRack(item);

            const shelf =
              getShelf(item);

            const date =
              getStorageDate(item);

            const expanded =
              expandedId === id;

            return (
              <View
                key={id || index}
                style={[
                  styles.inventoryCard,
                  expanded &&
                    styles.inventoryCardExpanded,
                ]}
              >
                {/* CARD TOP */}

                <View style={styles.cardTop}>
                  <View style={styles.cropIcon}>
                    <Ionicons
                      name="leaf-outline"
                      size={24}
                      color="#2E7D32"
                    />
                  </View>

                  <View
                    style={styles.cropInfo}
                  >
                    <Text
                      style={
                        styles.cropName
                      }
                    >
                      {crop ||
                        "Unknown Crop"}
                    </Text>

                    {variety ? (
                      <Text
                        style={
                          styles.variety
                        }
                      >
                        {variety}
                      </Text>
                    ) : null}
                  </View>

                  <View
                    style={
                      styles.quantityBox
                    }
                  >
                    <Text
                      style={
                        styles.quantityNumber
                      }
                    >
                      {quantity || "0"}
                    </Text>

                    <Text
                      style={
                        styles.quantityUnit
                      }
                    >
                      kg
                    </Text>
                  </View>
                </View>

                <View
                  style={styles.divider}
                />

                {/* STORAGE DATE */}

                <View
                  style={styles.infoRow}
                >
                  <View
                    style={
                      styles.infoItem
                    }
                  >
                    <Ionicons
                      name="calendar-outline"
                      size={17}
                      color="#2E7D32"
                    />

                    <View>
                      <Text
                        style={
                          styles.infoLabel
                        }
                      >
                        Storage Date
                      </Text>

                      <Text
                        style={
                          styles.infoValue
                        }
                      >
                        {formatDate(
                          date
                        )}
                      </Text>
                    </View>
                  </View>
                </View>

                {/* ROOM / RACK / SHELF */}

                <View
                  style={
                    styles.locationGrid
                  }
                >
                  <InfoBox
                    icon="business-outline"
                    label="Room"
                    value={
                      room || "N/A"
                    }
                  />

                  <InfoBox
                    icon="layers-outline"
                    label="Rack"
                    value={
                      rack || "N/A"
                    }
                  />

                  <InfoBox
                    icon="grid-outline"
                    label="Shelf"
                    value={
                      shelf || "N/A"
                    }
                  />
                </View>

                {/* DETAILS */}

                <Pressable
                  style={
                    styles.detailsLink
                  }
                  onPress={() =>
                    toggleDetails(item)
                  }
                >
                  <Text
                    style={
                      styles.detailsLinkText
                    }
                  >
                    {expanded
                      ? "Hide Full Details"
                      : "View Full Details"}
                  </Text>

                  <Ionicons
                    name={
                      expanded
                        ? "chevron-up-outline"
                        : "arrow-forward-outline"
                    }
                    size={18}
                    color="#2E7D32"
                  />
                </Pressable>

                {/* EXPANDED DETAILS */}

                {expanded && (
                  <View
                    style={
                      styles.fullDetailsContainer
                    }
                  >
                    {/* DETAILS HEADER */}

                    <View
                      style={
                        styles.detailsHeader
                      }
                    >
                      <View
                        style={{
                          flex: 1,
                        }}
                      >
                        <Text
                          style={
                            styles.detailsTitle
                          }
                        >
                          Storage Details
                        </Text>

                        <Text
                          style={
                            styles.detailsSubtitle
                          }
                        >
                          Complete information
                          about this storage
                          record
                        </Text>
                      </View>

                      {/* ONLY ONE EDIT BUTTON */}

                      <Pressable
                        style={
                          styles.mainEditButton
                        }
                        onPress={() =>
                          openEditForm(
                            item
                          )
                        }
                      >
                        <Ionicons
                          name="create-outline"
                          size={18}
                          color="#2E7D32"
                        />

                        <Text
                          style={
                            styles.mainEditText
                          }
                        >
                          Edit
                        </Text>
                      </Pressable>
                    </View>

                    {/* CROP DETAILS */}

                    <DetailSection
                      icon="leaf-outline"
                      title="Crop Details"
                    >
                      <DetailRow
                        label="Crop Name"
                        value={
                          getCropName(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Crop Variety"
                        value={
                          getCropVariety(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Quantity"
                        value={`${
                          getQuantity(
                            item
                          ) || "N/A"
                        } kg`}
                      />
                    </DetailSection>

                    {/* STORAGE LOCATION */}

                    <DetailSection
                      icon="business-outline"
                      title="Storage Location"
                    >
                      <DetailRow
                        label="Storage Room"
                        value={
                          getRoom(item)
                        }
                      />

                      <DetailRow
                        label="Storage Section / Area"
                        value={
                          getSection(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Storage Type"
                        value={
                          getStorageType(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Rack / Cabinet Number"
                        value={
                          getRack(item)
                        }
                      />

                      <DetailRow
                        label="Shelf Number"
                        value={
                          getShelf(item)
                        }
                      />
                    </DetailSection>

                    {/* STORAGE PERIOD */}

                    <DetailSection
                      icon="calendar-outline"
                      title="Storage Period"
                    >
                      <DetailRow
                        label="Storage Date"
                        value={formatDate(
                          getStorageDate(
                            item
                          )
                        )}
                      />

                      <DetailRow
                        label="Expected Market / Export Date"
                        value={formatDate(
                          getExpectedExportDate(
                            item
                          )
                        )}
                      />
                    </DetailSection>

                    {/* MARKET */}

                    <DetailSection
                      icon="location-outline"
                      title="Market / Export Details"
                    >
                      <DetailRow
                        label="Market Name"
                        value={
                          getMarketName(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Destination / Place"
                        value={
                          getDestination(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Market Address"
                        value={
                          getMarketAddress(
                            item
                          )
                        }
                        multiline
                      />

                      <DetailRow
                        label="Market Owner Name"
                        value={
                          getOwnerName(
                            item
                          )
                        }
                      />

                      <DetailRow
                        label="Market Owner Phone"
                        value={
                          getOwnerPhone(
                            item
                          )
                        }
                      />
                    </DetailSection>

                    {/* NOTES */}

                    <DetailSection
                      icon="document-text-outline"
                      title="Additional Notes"
                    >
                      <DetailRow
                        label="Notes"
                        value={
                          getNotes(item) ||
                          "No additional notes"
                        }
                        multiline
                      />
                    </DetailSection>

                    {/* DELETE */}

                    <Pressable
                      style={
                        styles.deleteLink
                      }
                      onPress={() =>
                        deleteStorage(
                          item
                        )
                      }
                    >
                      <Ionicons
                        name="trash-outline"
                        size={18}
                        color="#D32F2F"
                      />

                      <Text
                        style={
                          styles.deleteLinkText
                        }
                      >
                        Delete Storage Record
                      </Text>
                    </Pressable>
                  </View>
                )}
              </View>
            );
          }
        )}

        <View
          style={styles.bottomSpace}
        />
      </ScrollView>

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      <Modal
        visible={editVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={
          closeEditForm
        }
      >
        <View
          style={styles.modalOverlay}
        >
          <View
            style={styles.modalContainer}
          >
            {/* MODAL HEADER */}

            <View
              style={styles.modalHeader}
            >
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={
                    styles.modalTitle
                  }
                >
                  Edit Inventory
                </Text>

                <Text
                  style={
                    styles.modalSubtitle
                  }
                >
                  Update the storage details
                  below
                </Text>
              </View>

              <Pressable
                style={
                  styles.modalCloseButton
                }
                onPress={
                  closeEditForm
                }
                disabled={saving}
              >
                <Ionicons
                  name="close"
                  size={23}
                  color="#555"
                />
              </Pressable>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={
                false
              }
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={
                styles.modalContent
              }
            >
              {/* CROP */}

              <FormSection
                icon="leaf-outline"
                title="Crop Details"
              >
                <EditField
                  label="Crop Name"
                  value={
                    editData.crop_name
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "crop_name",
                      value
                    )
                  }
                  required
                />

                <EditField
                  label="Crop Variety"
                  value={
                    editData.crop_variety
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "crop_variety",
                      value
                    )
                  }
                />

                <EditField
                  label="Quantity (kg)"
                  value={
                    editData.quantity
                  }
                  keyboardType="numeric"
                  onChangeText={(value) =>
                    updateEditField(
                      "quantity",
                      value
                    )
                  }
                  required
                />
              </FormSection>

              {/* LOCATION */}

              <FormSection
                icon="business-outline"
                title="Storage Location"
              >
                <EditField
                  label="Storage Room"
                  value={
                    editData.storage_room
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "storage_room",
                      value
                    )
                  }
                />

                <EditField
                  label="Storage Section / Area"
                  value={
                    editData.storage_section
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "storage_section",
                      value
                    )
                  }
                />

                <EditField
                  label="Storage Type"
                  value={
                    editData.storage_type
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "storage_type",
                      value
                    )
                  }
                />

                <EditField
                  label="Rack / Cabinet Number"
                  value={
                    editData.rack_cabinet_number
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "rack_cabinet_number",
                      value
                    )
                  }
                />

                <EditField
                  label="Shelf Number"
                  value={
                    editData.shelf_number
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "shelf_number",
                      value
                    )
                  }
                />
              </FormSection>

              {/* DATES */}

              <FormSection
                icon="calendar-outline"
                title="Storage Period"
              >
                <EditField
                  label="Storage Date"
                  value={
                    editData.storage_date
                  }
                  placeholder="YYYY-MM-DD"
                  onChangeText={(value) =>
                    updateEditField(
                      "storage_date",
                      value
                    )
                  }
                />

                <EditField
                  label="Expected Market / Export Date"
                  value={
                    editData.expected_export_date
                  }
                  placeholder="YYYY-MM-DD"
                  onChangeText={(value) =>
                    updateEditField(
                      "expected_export_date",
                      value
                    )
                  }
                />
              </FormSection>

              {/* MARKET */}

              <FormSection
                icon="location-outline"
                title="Market / Export Details"
              >
                <EditField
                  label="Market Name"
                  value={
                    editData.market_name
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "market_name",
                      value
                    )
                  }
                />

                <EditField
                  label="Destination / Place"
                  value={
                    editData.destination
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "destination",
                      value
                    )
                  }
                />

                <EditField
                  label="Market Address"
                  value={
                    editData.market_address
                  }
                  multiline
                  onChangeText={(value) =>
                    updateEditField(
                      "market_address",
                      value
                    )
                  }
                />

                <EditField
                  label="Market Owner Name"
                  value={
                    editData.owner_name
                  }
                  onChangeText={(value) =>
                    updateEditField(
                      "owner_name",
                      value
                    )
                  }
                />

                <EditField
                  label="Market Owner Phone"
                  value={
                    editData.owner_phone
                  }
                  keyboardType="phone-pad"
                  onChangeText={(value) =>
                    updateEditField(
                      "owner_phone",
                      value
                    )
                  }
                />
              </FormSection>

              {/* NOTES */}

              <FormSection
                icon="document-text-outline"
                title="Additional Notes"
              >
                <EditField
                  label="Notes"
                  value={
                    editData.notes
                  }
                  multiline
                  onChangeText={(value) =>
                    updateEditField(
                      "notes",
                      value
                    )
                  }
                />
              </FormSection>

              {/* BUTTONS */}

              <View
                style={
                  styles.modalActions
                }
              >
                <Pressable
                  style={
                    styles.modalCancelButton
                  }
                  onPress={
                    closeEditForm
                  }
                  disabled={saving}
                >
                  <Text
                    style={
                      styles.modalCancelText
                    }
                  >
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.modalSaveButton,
                    saving &&
                      styles.disabledButton,
                  ]}
                  onPress={saveEdit}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator
                      size="small"
                      color="#FFFFFF"
                    />
                  ) : (
                    <>
                      <Ionicons
                        name="checkmark-outline"
                        size={19}
                        color="#FFFFFF"
                      />

                      <Text
                        style={
                          styles.modalSaveText
                        }
                      >
                        Save Changes
                      </Text>
                    </>
                  )}
                </Pressable>
              </View>

              <View
                style={{
                  height: 25,
                }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// =========================================================
// MONTH FORMAT
// =========================================================

function formatMonth(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthNumber =
    Number(date.substring(5, 7));

  return `${months[monthNumber - 1]} ${date.substring(
    0,
    4
  )}`;
}

// =========================================================
// FILTER CHIP
// =========================================================

function FilterChip({
  title,
  active,
  onPress,
}) {
  return (
    <Pressable
      style={[
        styles.filterChip,
        active &&
          styles.filterChipActive,
      ]}
      onPress={onPress}
    >
      {active && (
        <Ionicons
          name="checkmark-circle"
          size={16}
          color="#FFFFFF"
        />
      )}

      <Text
        style={[
          styles.filterChipText,
          active &&
            styles.filterChipTextActive,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

// =========================================================
// INFO BOX
// =========================================================

function InfoBox({
  icon,
  label,
  value,
}) {
  return (
    <View style={styles.infoBox}>
      <Ionicons
        name={icon}
        size={17}
        color="#2E7D32"
      />

      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={
            styles.infoBoxLabel
          }
        >
          {label}
        </Text>

        <Text
          style={
            styles.infoBoxValue
          }
          numberOfLines={1}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

// =========================================================
// DETAIL SECTION
// =========================================================

function DetailSection({
  icon,
  title,
  children,
}) {
  return (
    <View
      style={
        styles.detailSection
      }
    >
      <View
        style={
          styles.detailSectionHeader
        }
      >
        <View
          style={styles.detailIcon}
        >
          <Ionicons
            name={icon}
            size={18}
            color="#2E7D32"
          />
        </View>

        <Text
          style={
            styles.detailSectionTitle
          }
        >
          {title}
        </Text>
      </View>

      <View>{children}</View>
    </View>
  );
}

// =========================================================
// DETAIL ROW
// =========================================================

function DetailRow({
  label,
  value,
  multiline,
}) {
  return (
    <View
      style={styles.detailRow}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={styles.detailLabel}
        >
          {label}
        </Text>

        <Text
          style={[
            styles.detailValue,
            multiline &&
              styles.detailMultiline,
          ]}
        >
          {value || "Not available"}
        </Text>
      </View>
    </View>
  );
}

// =========================================================
// FORM SECTION
// =========================================================

function FormSection({
  icon,
  title,
  children,
}) {
  return (
    <View
      style={styles.formSection}
    >
      <View
        style={
          styles.formSectionHeader
        }
      >
        <View
          style={styles.formIcon}
        >
          <Ionicons
            name={icon}
            size={18}
            color="#2E7D32"
          />
        </View>

        <Text
          style={
            styles.formSectionTitle
          }
        >
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
}

// =========================================================
// EDIT FIELD
// =========================================================

function EditField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  multiline,
  required,
}) {
  return (
    <View
      style={styles.editField}
    >
      <View
        style={
          styles.editLabelRow
        }
      >
        <Text
          style={styles.editLabel}
        >
          {label}
        </Text>

        {required && (
          <Text
            style={
              styles.requiredText
            }
          >
            *
          </Text>
        )}
      </View>

      <TextInput
        style={[
          styles.editInput,
          multiline &&
            styles.editMultiline,
        ]}
        value={value ?? ""}
        onChangeText={
          onChangeText
        }
        placeholder={
          placeholder ||
          `Enter ${label}`
        }
        placeholderTextColor="#A0A0A0"
        keyboardType={
          keyboardType ||
          "default"
        }
        multiline={
          multiline || false
        }
        textAlignVertical={
          multiline
            ? "top"
            : "center"
        }
      />
    </View>
  );
}

// =========================================================
// STYLES
// =========================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F5",
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },

  // HEADER

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B5E20",
  },

  subtitle: {
    fontSize: 14,
    color: "#777",
    marginTop: 5,
  },

  refreshButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
  },

  // SEARCH

  searchBox: {
    height: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCE8DC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 18,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    marginLeft: 10,
  },

  // SUMMARY

  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 22,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 17,
    borderWidth: 1,
    borderColor: "#DCE8DC",
    minHeight: 130,
  },

  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  summaryNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1B5E20",
  },

  summaryLabel: {
    fontSize: 13,
    color: "#777",
    marginTop: 3,
    fontWeight: "600",
  },

  // FILTER

  filterSection: {
    marginBottom: 20,
  },

  filterTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },

  filterTitleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
  },

  filterSubtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 12,
  },

  clearSmall: {
    color: "#2E7D32",
    fontWeight: "700",
    fontSize: 13,
  },

  horizontalList: {
    gap: 9,
    paddingVertical: 3,
  },

  // DATE

  dateChip: {
    minWidth: 76,
    height: 72,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DCE8DC",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 9,
  },

  dateChipActive: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  dateDot: {
    position: "absolute",
    top: 7,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: "#35A853",
  },

  dateDotActive: {
    backgroundColor: "#FFFFFF",
  },

  dateDay: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1B5E20",
  },

  dateMonth: {
    fontSize: 11,
    color: "#777",
    marginTop: 2,
    fontWeight: "600",
  },

  activeWhiteText: {
    color: "#FFFFFF",
  },

  // FILTER CHIP

  filterChip: {
    minHeight: 40,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#CFE0CF",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  filterChipActive: {
    backgroundColor: "#2E7D32",
    borderColor: "#2E7D32",
  },

  filterChipText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "700",
  },

  filterChipTextActive: {
    color: "#FFFFFF",
  },

  // CLEAR

  clearFilters: {
    height: 42,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#B8D1BA",
    backgroundColor: "#EAF6EC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginBottom: 20,
  },

  clearFiltersText: {
    color: "#2E7D32",
    fontWeight: "700",
    fontSize: 14,
  },

  // RESULT

  resultHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  resultTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
  },

  resultSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  resultBadge: {
    minWidth: 48,
    height: 34,
    borderRadius: 17,
    backgroundColor: "#EAF6EC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    paddingHorizontal: 10,
  },

  resultBadgeText: {
    color: "#2E7D32",
    fontWeight: "800",
  },

  // CARD

  inventoryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 17,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DCE8DC",
    elevation: 3,
  },

  inventoryCardExpanded: {
    borderColor: "#A8CBAA",
    elevation: 5,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  cropIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  cropInfo: {
    flex: 1,
  },

  cropName: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1B5E20",
  },

  variety: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },

  quantityBox: {
    alignItems: "flex-end",
  },

  quantityNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#222",
  },

  quantityUnit: {
    fontSize: 12,
    color: "#777",
    fontWeight: "600",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF1ED",
    marginVertical: 15,
  },

  infoRow: {
    marginBottom: 13,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  infoLabel: {
    fontSize: 11,
    color: "#999",
    marginBottom: 2,
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#333",
  },

  locationGrid: {
    flexDirection: "row",
    gap: 8,
  },

  infoBox: {
    flex: 1,
    minHeight: 62,
    backgroundColor: "#F7FAF7",
    borderRadius: 11,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E3ECE3",
    flexDirection: "column",
    justifyContent: "center",
    gap: 4,
  },

  infoBoxLabel: {
    fontSize: 10,
    color: "#999",
    fontWeight: "600",
  },

  infoBoxValue: {
    fontSize: 13,
    color: "#333",
    fontWeight: "800",
  },

  // DETAILS LINK

  detailsLink: {
    marginTop: 15,
    paddingTop: 13,
    borderTopWidth: 1,
    borderTopColor: "#EDF1ED",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 6,
  },

  detailsLinkText: {
    color: "#2E7D32",
    fontSize: 14,
    fontWeight: "800",
  },

  // FULL DETAILS

  fullDetailsContainer: {
    marginTop: 17,
    paddingTop: 17,
    borderTopWidth: 1,
    borderTopColor: "#DCE8DC",
  },

  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  detailsTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1B5E20",
  },

  detailsSubtitle: {
    fontSize: 11,
    color: "#888",
    marginTop: 3,
    maxWidth: 220,
  },

  mainEditButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 9,
    backgroundColor: "#EAF6EC",
  },

  mainEditText: {
    color: "#2E7D32",
    fontSize: 13,
    fontWeight: "800",
  },

  // DETAIL SECTION

  detailSection: {
    backgroundColor: "#F8FBF8",
    borderRadius: 13,
    borderWidth: 1,
    borderColor: "#E2ECE2",
    padding: 13,
    marginBottom: 12,
  },

  detailSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  detailIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  detailSectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#333",
  },

  // DETAIL ROW

  detailRow: {
    minHeight: 52,
    borderTopWidth: 1,
    borderTopColor: "#E8EEE8",
    paddingVertical: 9,
    justifyContent: "center",
  },

  detailLabel: {
    fontSize: 11,
    color: "#888",
    marginBottom: 3,
    fontWeight: "600",
  },

  detailValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "700",
  },

  detailMultiline: {
    lineHeight: 20,
  },

  // DELETE

  deleteLink: {
    minHeight: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#F1CACA",
    backgroundColor: "#FFF7F7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    marginTop: 4,
  },

  deleteLinkText: {
    color: "#D32F2F",
    fontSize: 13,
    fontWeight: "800",
  },

  // =========================================================
  // EDIT MODAL
  // =========================================================

  modalOverlay: {
    flex: 1,
    backgroundColor:
      "rgba(0,0,0,0.45)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#F5F7F5",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: "94%",
    minHeight: "70%",
  },

  modalHeader: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E8E3",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1B5E20",
  },

  modalSubtitle: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },

  modalCloseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F4F2",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  modalContent: {
    padding: 18,
    paddingBottom: 30,
  },

  // FORM SECTION

  formSection: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#DCE8DC",
  },

  formSectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  formIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  formSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#333",
  },

  // FORM FIELD

  editField: {
    marginBottom: 13,
  },

  editLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  editLabel: {
    fontSize: 12,
    color: "#555",
    fontWeight: "700",
  },

  requiredText: {
    color: "#D32F2F",
    fontSize: 14,
    marginLeft: 3,
  },

  editInput: {
    minHeight: 46,
    borderWidth: 1,
    borderColor: "#CDD9CE",
    backgroundColor: "#FAFCFA",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#333",
  },

  editMultiline: {
    minHeight: 85,
    paddingTop: 11,
  },

  // MODAL BUTTONS

  modalActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 3,
  },

  modalCancelButton: {
    flex: 1,
    height: 50,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#CCCCCC",
    alignItems: "center",
    justifyContent: "center",
  },

  modalCancelText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#555",
  },

  modalSaveButton: {
    flex: 1.5,
    height: 50,
    borderRadius: 11,
    backgroundColor: "#2E7D32",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  modalSaveText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  disabledButton: {
    opacity: 0.7,
  },

  // EMPTY

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DCE8DC",
    marginTop: 5,
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#333",
  },

  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },

  emptyClear: {
    marginTop: 17,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  emptyClearText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },

  // LOADING

  loadingContainer: {
    flex: 1,
    backgroundColor: "#F5F7F5",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingIcon: {
    width: 65,
    height: 65,
    borderRadius: 20,
    backgroundColor: "#EAF6EC",
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    color: "#777",
    fontSize: 14,
  },

  bottomSpace: {
    height: 30,
  },
});