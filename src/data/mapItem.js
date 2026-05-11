export const mapItem = (Item) => ({
  id: Item.item_id,
  title: Item.item_name,
  campus: Item.campus_location,
  date: Item.created_at.split("T")[0],
  image: Item.imageURL,
  category: Item.item_category,
  location: Item.location,
  color: Item.item_color || [],
  description: Item.item_description,
  locationDescription: Item.location_description,
  floor: Item.floor,
  founder: "Unknown"
});