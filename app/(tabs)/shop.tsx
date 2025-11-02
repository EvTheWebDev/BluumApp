// screens/ShopScreen.tsx
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ItemCard from '../../components/ItemCard'; // Adjust import path
import { ShopItem, ShopScreenProps } from '../../dataTypes/shopData'; // Adjust import path

const BASE_URL = 'https://your-api-domain.com/assets'; // IMPORTANT: Set your asset base URL

const ShopGridItem = ({
  item,
  inventoryStatus,
  onPress,
}: {
  item: ShopItem;
  inventoryStatus: 'equipped' | 'owned' | 'unowned';
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.shopItem} onPress={onPress}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemIcon} />
      <View style={styles.itemDetails}>
        {inventoryStatus === 'unowned' && (
          <>
            <Image source={{ uri: `${BASE_URL}/UI/gem.png` }} style={styles.gemIcon} />
            <Text style={styles.itemText}>{item.price}</Text>
          </>
        )}
        {inventoryStatus === 'owned' && <Text style={styles.itemText}>Owned</Text>}
        {inventoryStatus === 'equipped' && <Text style={styles.itemText}>Equipped</Text>}
      </View>
    </TouchableOpacity>
  );
};

const ShopScreen = ({
  shopItems = [],
  userAvatarLayers = [],
  userInventory = [],
  userCurrency = 10,
}: ShopScreenProps) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Shirt' | 'Eyewear' | 'Footwear' | 'Hat'>('All');

  // Memoize equipped items to prevent recalculating on every render
  const equippedItems = useMemo(
    () => userInventory.filter(item => item.isEquipped),
    [userInventory]
  );

  // Memoize filtered shop items based on the active filter
  const filteredShopItems = useMemo(() => {
    if (activeFilter === 'All') {
      return shopItems;
    }
    return shopItems.filter(item => item.category === activeFilter);
  }, [shopItems, activeFilter]);
  
  // A helper to determine if an item is owned or equipped
  const getInventoryStatus = (itemId: number) => {
    const itemInInventory = userInventory.find(invItem => invItem.id === itemId);
    if (!itemInInventory) return 'unowned';
    return itemInInventory.isEquipped ? 'equipped' : 'owned';
  };

  const handleBuyItem = (item: ShopItem) => {
    console.log('Attempting to buy/equip:', item.name);
    // Add your purchasing or equipping logic here
  };
  
  const FilterButton = ({ category }: { category: typeof activeFilter }) => (
      <TouchableOpacity onPress={() => setActiveFilter(category)}>
          {/* Use local assets for filter icons */}
          <Image source={{ uri: `${BASE_URL}/UI/shop/shop${category}.svg` }} style={[styles.filterIcon, activeFilter === category && styles.filterIconActive]} />
      </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. Avatar Display Area */}
      <View style={styles.playerRoom}>
        {/* Base Avatar Layers */}
        {userAvatarLayers.map((uri, index) => (
          <Image key={`base-${index}`} source={{ uri }} style={styles.avatarPiece} />
        ))}
        {/* Equipped Item Layers */}
        {equippedItems.map(item => (
          <Image key={`equip-${item.id}`} source={{ uri: item.imageUrl }} style={styles.avatarPiece} />
        ))}
      </View>

      {/* 2. Shop Section */}
      <View style={styles.shopArea}>
        <View style={styles.shopHeader}>
          <Text style={styles.shopLabel}>{activeFilter} Items</Text>
          <View style={styles.shopGems}>
            <Image source={{ uri: `${BASE_URL}/UI/gem.png` }} style={styles.gemIcon} />
            <Text style={styles.currencyText}>{userCurrency}</Text>
          </View>
        </View>

        <View style={styles.shopFilters}>
            <FilterButton category="All" />
            <FilterButton category="Shirt" />
            <FilterButton category="Eyewear" />
            <FilterButton category="Footwear" />
            <FilterButton category="Hat" />
        </View>

        <FlatList
          data={filteredShopItems}
          keyExtractor={item => item.id.toString()}
          numColumns={3} // Adjust number of columns as needed
          renderItem={({ item }) => (
  <ItemCard
    item={item}
    inventoryStatus={getInventoryStatus(item.id)}
    onPress={() => handleBuyItem(item)}
  />
)}
          style={styles.shopGrid}
        />
      </View>
    </SafeAreaView>
  );
};


// styles/shopStyles.ts (or at the bottom of ShopScreen.tsx)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8',
  },
  playerRoom: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D6EFFF',
    position: 'relative',
  },
  avatarPiece: {
    width: 200,
    height: 200,
    position: 'absolute', // Stack all images on top of each other
    resizeMode: 'contain',
  },
  shopArea: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Overlap the room slightly for a nice effect
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  shopLabel: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  shopGems: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  gemIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  currencyText: {
    fontSize: 16,
    fontWeight: '600',
  },
  shopFilters: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  filterIcon: {
      width: 40,
      height: 40,
      opacity: 0.5,
  },
  filterIconActive: {
      opacity: 1,
  },
  shopGrid: {
    flex: 1,
  },
  shopItem: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#F0F4F8',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemIcon: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  itemDetails: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

// Add this to the bottom of your ShopScreen.tsx file


export default ShopScreen;