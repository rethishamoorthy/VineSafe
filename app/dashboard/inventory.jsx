
import { router } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

/* ------------------------------------------------------------------ */
/*  THEME                                                              */
/* ------------------------------------------------------------------ */
const GREEN_DARK = '#1B5E20';
const GREEN = '#2E7D32';
const GREEN_MID = '#43A047';
const GREEN_LIGHT = '#66BB6A';
const BG_WHITE = '#FFFFFF';
const BG_SOFT = '#F4FAF5';
const TEXT_DARK = '#173418';
const TEXT_MUTED = '#5B7A61';
const CARD_BORDER = '#E4F2E5';
 
/* ------------------------------------------------------------------ */
/*  MENU DATA                                                          */
/* ------------------------------------------------------------------ */


const MENU_ITEMS = [
  {
    key: 'rooms',
    label: 'Room Details',
    subtitle: 'Manage Storage Rooms',
    icon: 'business-outline',
    colors: [GREEN_MID, GREEN],
  },
  {
    key: 'farmers',
    label: 'Farmer Details',
    subtitle: 'View Farmer Information',
    icon: 'people-outline',
    colors: [GREEN_LIGHT, GREEN_MID],
  },
  {
    key: 'storage',
    label: 'Storage Details',
    subtitle: 'Add Crop Information',
    icon: 'cube-outline',
    colors: [GREEN, GREEN_DARK],
  },
  {
    key: 'inventory',
    label: 'View Inventory',
    subtitle: 'View • Edit • Delete',
    icon: 'list-outline',
    colors: [GREEN_DARK, GREEN],
  },
];
 
/* ------------------------------------------------------------------ */
/*  MENU CARD                                                          */
/* ------------------------------------------------------------------ */
const MenuCard = ({ item, onPress }) => {
  const pressScale = useSharedValue(1);
 
  const pressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressScale.value }],
  }));
 
  return (
    <Animated.View style={pressStyle}>
      <Pressable
        onPress={() => onPress && onPress(item)}
        onPressIn={() => (pressScale.value = withSpring(0.97, { damping: 12, stiffness: 220 }))}
        onPressOut={() => (pressScale.value = withSpring(1, { damping: 10, stiffness: 200 }))}
        style={styles.card}
      >
        <LinearGradient
          colors={item.colors}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.9, y: 1 }}
          style={styles.cardIconWrap}
        >
          <Ionicons name={item.icon} size={24} color="#FFFFFF" />
        </LinearGradient>
 
        <View style={styles.cardTextWrap}>
          <Text style={styles.cardTitle}>{item.label}</Text>
          <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        </View>
 
        <Ionicons name="chevron-forward" size={20} color={GREEN_MID} />
      </Pressable>
    </Animated.View>
  );
};
 
/* ------------------------------------------------------------------ */
/*  MAIN SCREEN                                                        */
/* ------------------------------------------------------------------ */
export default function InventoryScreen({ navigation }) {
  const [activeItem, setActiveItem] = useState(null);
 
  const handleCardPress = (item) => {
  setActiveItem(item.key);

  switch (item.key) {
    case 'rooms':
      router.push('/dashboard/room-allocation');
      break;

    case 'farmers':
      router.push('/dashboard/farmer-details');
      break;

    case 'storage':
      router.push('/dashboard/storage-details');
      break;

    case 'inventory':
      router.push('/dashboard/inventory-list');
      break;

    default:
      break;
  }
};
 
  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={BG_WHITE} />
 
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Inventory</Text>
          <Text style={styles.headerSubtitle}>Cold Storage Management</Text>
        </View>
 
        {/* Menu cards */}
        <View style={styles.cardList}>
          {MENU_ITEMS.map((item) => (
            <MenuCard key={item.key} item={item} onPress={handleCardPress} />
          ))}
        </View>
 
        <View style={{ height: 32 }} />
      </ScrollView>
    </View>
  );
}
 
/* ------------------------------------------------------------------ */
/*  STYLES                                                             */
/* ------------------------------------------------------------------ */
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: BG_WHITE,
  },
  scrollContent: {
    paddingBottom: 24,
  },
 
  header: {
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'ios' ? 56 : 40,
    paddingBottom: 20,
  },
  headerTitle: {
    color: TEXT_DARK,
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    color: TEXT_MUTED,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 4,
  },
 
  cardList: {
    paddingHorizontal: 20,
    gap: 14,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: BG_WHITE,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: GREEN,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  cardIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    shadowColor: GREEN,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  cardTextWrap: {
    flex: 1,
  },
  cardTitle: {
    color: TEXT_DARK,
    fontSize: 15,
    fontWeight: '800',
  },
  cardSubtitle: {
    color: TEXT_MUTED,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 2,
  },
});
 

