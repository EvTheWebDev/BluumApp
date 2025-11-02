// components/ItemCard.tsx
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { ShopItem } from '../dataTypes/shopData'; // Adjust import path'

const BASE_URL = 'https://your-api-domain.com/assets';

type ItemCardProps = {
  item: ShopItem;
  inventoryStatus: 'equipped' | 'owned' | 'unowned';
  onPress: () => void;
};

const ItemCard = ({ item, inventoryStatus, onPress }: ItemCardProps) => {
  return (
    <TouchableOpacity style={styles.shopItem} onPress={onPress}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemIcon} />
      <View style={styles.itemDetails}>
        {inventoryStatus === 'unowned' && (
          <>
            <Image
              source={{ uri: `${BASE_URL}/UI/gem.png` }}
              style={styles.gemIcon}
            />
            <Text style={styles.itemText}>{item.price}</Text>
          </>
        )}
        {inventoryStatus === 'owned' && (
          <Text style={styles.itemText}>Owned</Text>
        )}
        {inventoryStatus === 'equipped' && (
          <Text style={styles.itemText}>Equipped</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

// These styles are now self-contained within the component file
const styles = StyleSheet.create({
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
  gemIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  itemText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default ItemCard;