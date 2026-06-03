import "./LostItemDetailBox.css";

const LostItemDetailBox = ({ item }) => {
  if (!item) return null;

  return (
    <div className="lost-item-box">
        {/* title for the box */}
        <div className="lost-item-title">
            Item Detail
        </div>
            
        <div className="lost-item-top">
            <img
            src={item.image}
            alt={item.title}
            className="lost-item-img"
            />

            <div className="lost-item-details">
            <div>
                <label>Item Name</label>
                <p>{item.title}</p>
            </div>

            <div>
                <label>Founder's Name</label>
                <p>{item.founder || "Anonymous"}</p>
            </div>

            <div>
                <label>Date Lost</label>
                <p>{item.date}</p>
            </div>

            <div>
                <label>Campus</label>
                <p>{item.campus}</p>
            </div>

            <div>
                <label>Location</label>
                <p>{item.location}</p>
            </div>

            <div>
                <label>Category</label>
                <p>{item.category}</p>
            </div>

            <div>
                <label>Color</label>
                <p>{item.color?.join(", ")}</p>
            </div>

            <div>
                <label>Floor</label>
                <p>{item.floor}</p>
            </div>
            </div>
        </div>

        <div className="lost-item-description">
            <div>
                <label>Item Description</label>
                <p>{item.description}</p>
            </div>

            <div>
                <label>Location Description</label>
                <p>{item.locationDescription}</p>
            </div>
        </div>
    </div>
  );
};

export default LostItemDetailBox;