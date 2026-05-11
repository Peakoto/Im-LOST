import "./MainLayout.css";
import logo from "../assets/logo_binus.png";
import profile_icon from "../assets/profile_icon.png"; // button that navigates to profile page
import history_icon from "../assets/history_icon.png"; // button that shows the popup of HistoryModal
import Button from "../components/Button";
import Login from "../features/auth/ModalLogin.jsx";
import { useState } from "react";
// import History from "../features/history/ModalHistory.jsx";

function MainLayout({children, pageTitle = "LOST AND FOUND"}) {
    const [showLogin, setShowLogin] = useState(false);
    // const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="layout">
            {/* HEADER */}
            <header className="header">

                {/* Logo Container */}
                <div className="header-logo">
                    <img src={logo} alt="logo" className="logo" />
                </div>

                {/* Title Container */}
                <div className="header-title">
                    <h1 className="title">{pageTitle}</h1>
                </div>

                {/* Actions Container */}
                <div className="header-actions">

                    <Button
                        type="login"
                        label="Log In"
                        onClick={() => setShowLogin(true)}
                    />

                    <Button
                        type="header"
                        icon={profile_icon}
                        iconOnly={true}
                        to="profile"
                    />

                    <Button
                        type="header"
                        icon={history_icon}
                        iconOnly={true}
                        // onClick={() => setShowHistory(true)}
                    />

                </div>

            </header>

            {/* Content */}
            <main className="content">
                {children}
            </main>
            
            {/* La Footer */}
            <footer className="footer">
                <p className="footer-text">
                    Syarat dan ketentuan pengambilan barang:

                    {"\n\n"}1. Untuk pengambilan barang dapat langsung menemui BM Gedung terkait dengan membawa foto copy Binusian Card (1 lembar)

                    {"\n"}2. Batas waktu penyimpanan barang lost and found selama 30 hari kerja dan 1 hari kerja untuk makanan

                    {"\n"}3. Jam Operasional Pengambilan:
                    {"\n"}Senin - Jumat   09.00 - 17.00
                    {"\n"}Sabtu           09.00 - 12.00

                    {"\n\n"}Tlp (021) 53696969 Ext. 1007
                </p>
            </footer>
            
            {showLogin && (
                <Login onClose={() => setShowLogin(false)} />
            )}
            
            {/* {showHistory && (
                <History onClose={() => setShowHistory(false)} />
            )} */}
        </div>
    )
}

export default MainLayout;
