import { InventoryItem } from './inventoryData';

export interface ShopItem {
  id: number;
  name: string;
  category: 'Hat' | 'Eyewear' | 'Shirt' | 'Footwear';
  price: number;
  imageUrl: string;
}

export interface ShopScreenProps {
  shopItems: ShopItem[]; // An array of items that follow the ShopItem blueprint
  userAvatarLayers: string[];
  userInventory: InventoryItem[];
  userCurrency: number;
}

