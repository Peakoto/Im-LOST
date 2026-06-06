// can be accessed using bt_history.jsx

// informations consists of
// unhidden
// - index number
// - status
// - date lost
// - item name
// - campus
// - location

// - edit pencil icon (directs to the 'item_details_student_edit.jsx')
// - full information (directs to the 'item_details_student_view.jsx')

// hidden (can be seen on the edit popup) *you need to access to the 'edit_item_details.jsx' in the popup folder
// - floor
// - color
// - description (location)
// - description (item)

import "./ModalHistory.css";
import Button from "../../components/Button.jsx";
import infoIcon from "../../assets/info_icon.png"
import editIcon from "../../assets/edit_icon.png"
import matchIcon from "../../assets/match_icon.png"
import ModalItemDetailsStudentView from "../../features/items/ModalItemDetailsStudentView.jsx";
import ModalItemDetailsStudentEdit from "../../features/items/ModalItemDetailsStudentEdit.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




function ModalHistory({ historyData = [] }) {

    const [showStudentViewModal, setShowStudentViewModal] = useState(false);
    const [showStudentEditModal, setShowStudentEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    return (
        <div className="history">

            <div className="history-header">
                <h1>Lost Item History</h1>
            </div>

            <div className="history-table-wrapper">

                <table className="history-table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Status</th>
                            <th>Date Lost</th>
                            <th>Item Name</th>
                            <th>Campus</th>
                            <th>Location</th>
                            <th className="action-column">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            historyData.length > 0 ? (
                                historyData.map((item, index) => (
                                    <tr key={item.item_id || index}>

                                        <td>{index + 1}</td>

                                        <td>
                                            <span className={`status ${item.status}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>{item.dateLost}</td>

                                        <td>{item.itemName}</td>

                                        <td>{item.campus}</td>

                                        <td>{item.location}</td>
                                        
                                        <td className="action-column"> 
                                            <div className="action-buttons">
                                                <Button 
                                                    type="tableView"
                                                    icon={infoIcon}
                                                    iconOnly={true}
                                                    onClick={() => {
                                                        // since there are mismatch in naming, map item is added again
                                                        const mappedItem = {
                                                            ...item,

                                                            image: item.imageURL,
                                                            title: item.itemName,
                                                            date: item.dateLost,
                                                            description: item.itemDescription,
                                                        };

                                                        setSelectedItem(mappedItem);
                                                        setShowStudentViewModal(true);
                                                    }}
                                                />

                                                {item.status === "Lost" && (
                                                    <Button
                                                        type="tableEdit"
                                                        icon={editIcon}
                                                        iconOnly={true}
                                                        onClick={() => {
                                                            // since there are mismatch in naming, map item is added again
                                                            const mappedItem = {
                                                                ...item,

                                                                image: item.imageURL,
                                                                title: item.itemName,
                                                                date: item.dateLost,
                                                                description: item.itemDescription,
                                                            };

                                                            setSelectedItem(mappedItem);
                                                            setShowStudentEditModal(true);
                                                        }}
                                                    />
                                                )}

                                                {item.status === "Lost" && (
                                                    <Button
                                                        type="matchPage"
                                                        icon={matchIcon}
                                                        iconOnly={true}
                                                        onClick={() => {
                                                            navigate(`/match/${item.item_id}`, {
                                                                state: {
                                                                    item
                                                                }
                                                            });
                                                        }}
                                                    />
                                                )}
                                            </div>                                             
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    { /* If there is no history */ }
                                    <td colSpan="7" className="empty-message">
                                        No history available.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {/* STUDENT VIEW MODAL */}
            {
                showStudentViewModal && selectedItem && (
                    <ModalItemDetailsStudentView
                        item={selectedItem}
                        onClose={() => setShowStudentViewModal(false)}
                    />
                )
            }

            {/* STUDENT EDIT MODAL */}
            {
                showStudentEditModal && selectedItem && (
                    <ModalItemDetailsStudentEdit
                        item={selectedItem}
                        onClose={() => setShowStudentEditModal(false)}
                    />
                )
            }

            {
            /* Note: 
                ModalItemDetailsStudentView expects an `item` prop.
                Once history is wired to Supabase, pass the selected row's item data or an item id. 
            */
            }
        </div>
    );
}

export default ModalHistory;