import { useState } from "react";
import "../styles/Header.css";
import InfoModal from "./InfoModal";


export default function Header() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header-stripes">
                    <div className="stripe stripe-2" />
                    <div className="stripe stripe-3" />
                    <div className="stripe stripe-4" />
                    <div className="stripe stripe-5" />
                </div>

                <div className="header-content">
                    <div className="header-left">
                        <img src="/compChordsLogo.png" alt="Comp Chords logo" />
                    </div>
                    <div className="header-right">
                        <div 
                            className="info-box"
                            onClick={() => setShowModal(true)}
                            style={{ cursor: "pointer" }}
                        >
                            <span className="info-icon">?</span>
                        </div>
                    </div>
                </div>
            </header>
            {showModal && <InfoModal onClose={() => setShowModal(false)} />}
        </>
    );
}