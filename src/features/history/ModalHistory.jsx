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

function ModalHistory({ historyData = [] }) {
    return (
        <div className="history">

            <div className="history-header">
                <h2>Lost Item History</h2>
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
                            <th>Action</th>
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
                                                type="" //showstudentview

                                            />
                                            <Button
                                                type="" //showstudentedit
                                            />
                                        </td>

                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="empty-message">
                                        No history available.
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ModalHistory;