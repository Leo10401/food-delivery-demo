export type Dish = {
  name: string
  hindi: string
  description: string
  price: number
  rating: number
  time: string
  veg: boolean
  image: string
}

export const popularDishes: Dish[] = [
  {
    name: 'Butter Chicken',
    hindi: 'मक्खन चिकन',
    description: 'Tandoor-charred chicken folded into a silky tomato-makhani gravy.',
    price: 329,
    rating: 4.8,
    time: '25 min',
    veg: false,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=640&h=480&fit=crop',
  },
  {
    name: 'Paneer Tikka Masala',
    hindi: 'पनीर टिक्का',
    description: 'Smoky paneer cubes in a spiced onion-tomato masala.',
    price: 289,
    rating: 4.7,
    time: '20 min',
    veg: true,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=640&h=480&fit=crop',
  },
  {
    name: 'Hyderabadi Biryani',
    hindi: 'बिरयानी',
    description: 'Dum-cooked basmati layered with saffron, mint, and slow-braised meat.',
    price: 349,
    rating: 4.9,
    time: '30 min',
    veg: false,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=640&h=480&fit=crop',
  },
  {
    name: 'Masala Dosa',
    hindi: 'मसाला डोसा',
    description: 'Crisp fermented crepe with spiced potato, sambar, and two chutneys.',
    price: 179,
    rating: 4.8,
    time: '15 min',
    veg: true,
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=640&h=480&fit=crop',
  },
  {
    name: 'Chole Bhature',
    hindi: 'छोले भटूरे',
    description: 'Amritsari chole with pillowy fried bhature and pickled onions.',
    price: 199,
    rating: 4.6,
    time: '20 min',
    veg: true,
    image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=640&h=480&fit=crop',
  },
  {
    name: 'Rogan Josh',
    hindi: 'रोगन जोश',
    description: 'Kashmiri lamb curry perfumed with fennel, ginger, and ratan jot.',
    price: 379,
    rating: 4.7,
    time: '30 min',
    veg: false,
    image: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=640&h=480&fit=crop',
  },
]

export type Region = {
  id: string
  label: string
  tagline: string
  description: string
  dishes: string[]
  image: string
}

export const regions: Region[] = [
  {
    id: 'north',
    label: 'North',
    tagline: 'Tandoor smoke and slow gravies',
    description:
      'Punjab, Delhi, and Kashmir on one plate — charcoal tandoors, dairy-rich gravies, and breads made for tearing and scooping.',
    dishes: ['Dal Makhani', 'Amritsari Kulcha', 'Rogan Josh', 'Butter Naan'],
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=720&h=520&fit=crop',
  },
  {
    id: 'south',
    label: 'South',
    tagline: 'Ferment, crisp, and coconut',
    description:
      'From Chennai tiffin rooms to Kerala toddy shops — fermented batters, curry leaves crackled in coconut oil, and fiery chettinad masalas.',
    dishes: ['Masala Dosa', 'Chettinad Chicken', 'Appam & Stew', 'Filter Coffee'],
    image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=720&h=520&fit=crop',
  },
  {
    id: 'east',
    label: 'East',
    tagline: 'Mustard, rivers, and sweets',
    description:
      'Bengal and beyond — freshwater fish in mustard gravy, panch phoron tempering, and the softest sweets in the country.',
    dishes: ['Kosha Mangsho', 'Machher Jhol', 'Momos', 'Rasgulla'],
    image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=720&h=520&fit=crop',
  },
  {
    id: 'west',
    label: 'West',
    tagline: 'Street heat and coastal spice',
    description:
      'Mumbai streets to Goan shores — pav slathered in butter, kokum-soured curries, and vindaloo that means business.',
    dishes: ['Pav Bhaji', 'Goan Fish Curry', 'Vada Pav', 'Laal Maas'],
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=720&h=520&fit=crop',
  },
]

export const thaliItems = [
  { name: 'Biryani', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=160&h=160&fit=crop' },
  { name: 'Dosa', image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=160&h=160&fit=crop' },
  { name: 'Samosa', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=160&h=160&fit=crop' },
  { name: 'Naan', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=160&h=160&fit=crop' },
  { name: 'Paneer Tikka', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=160&h=160&fit=crop' },
  { name: 'Gulab Jamun', image: 'https://images.unsplash.com/photo-1666190094762-79e0be58c4ad?w=160&h=160&fit=crop' },
  { name: 'Chai', image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=160&h=160&fit=crop' },
  { name: 'Chole', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=160&h=160&fit=crop' },
]
