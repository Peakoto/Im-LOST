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
import ModalItemDetailsStudentView from "../../features/items/ModalItemDetailsStudentView.jsx";
import ModalItemDetailsStudentEdit from "../../features/items/ModalItemDetailsStudentEdit.jsx";
import { useState } from "react";




function ModalHistory({ historyData = [] }) {

    const [showStudentViewModal, setShowStudentViewModal] = useState(false);
    const [showStudentEditModal, setShowStudentEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);


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
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            historyData.length > 0 ? (
                                historyData.map((item, index) => (
                                    <tr key={item.id || index}>

                                        <td>{index + 1}</td>

                                        <td>
                                            <span className={`status ${item.status.toLowerCase()}`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        <td>{item.dateLost}</td>

                                        <td>{item.itemName}</td>

                                        <td>{item.campus}</td>

                                        <td>{item.location}</td>

                                        <td className="action-buttons">
                                            <Button 
                                                type="tableView"
                                                icon={infoIcon}
                                                iconOnly={true}
                                                onClick={() => {
                                                    setSelectedItem(item);
                                                    setShowStudentViewModal(true);
                                                }}
                                            />

                                            {item.status === "Lost" && (
                                                <Button
                                                    type="tableEdit"
                                                    icon={editIcon}
                                                    iconOnly={true}
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        setShowStudentEditModal(true);
                                                    }}
                                                />
                                            )}

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