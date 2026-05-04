import "./MainLayout.css";
import logo from "../assets/logo_binus.png";
import profile_icon from "../assets/profile_icon.png"; // button that navigates to profile page
import history_icon from "../assets/history_icon.png"; // button that shows the popup of HistoryModal
import Button from "../components/Button";

function MainLayout({children}) {
    return (
        <div className="layout">
            {/* La Header */}
            <header className="header">
                <div className="header-container">
                    <div className="left">
                        <img src={logo} alt="logo" className="logo"/>
                        <h1 className="title">Lost & Found</h1>
                    </div>

                    <div className="right">
                        <Button 
                            type="login"
                            label="Log In"
                            // to="../auth/ModalLogin.jsx"
                        />
                        <img src={history_icon} alt="history" className="icon"/>
                        <img src={profile_icon} alt="profile" className="icon"/>
                    </div>
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

        </div>
    )
}

export default MainLayout;



