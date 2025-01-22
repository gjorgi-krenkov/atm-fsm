import { useEffect, useRef, useState } from "react";
import { Back } from "../assets/icons/Back";
import { Confirm } from "../assets/icons/Confirm";
import { Contact } from "../assets/icons/Contact";
import { Exit } from "../assets/icons/Exit";
import { Container } from "../pages/Container";

type Props = {
    logout: () => void;
    back: () => void;
    withdraw: (amount: number) => void;
}

export const DifferentAmount = ({
    withdraw,
    logout,
    back,
}: Props) => {
    const inputRef = useRef(null);

    const handleBlur = () => {
        // Refocus the input if it loses focus
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleInput = (e) => {
        // Update displayed value in euros
        const value = Number.parseInt(e.target.value)
        setDisplayValue(Number.isNaN(value) ? 0 : value);
    };

    // Disable scroll-to-change feature
    useEffect(() => {
        const handleWheel = (e) => {
            if (document.activeElement === inputRef.current) {
                e.preventDefault();
            }
        };

        inputRef.current.addEventListener('wheel', handleWheel);

        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);

    const [displayValue, setDisplayValue] = useState(0);

    return (
        <Container>
            <div className="main-container">
                <div className="main-header">
                    <div>
                        <h1 className="main-header-title">Withdraw cash</h1>
                        <h3 className="main-header-body">Please select the amount you wish to withdraw:</h3>
                    </div>
                    <div>
                        <h3 className="main-header-body" style={{ color: "#3C5E60" }}>15 November, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                        <h1 className="main-header-title" style={{ textAlign: 'right', height: '48px' }}>26ºC</h1>
                    </div>
                </div>
                <div style={{ display: 'flex', rowGap: "16px", flexDirection: 'column' }}>
                    <div className="data-card" style={{ overflow: 'hidden', flexDirection: 'column', gap: '0px' }}>
                        <h3 className="main-header-title withdraw-value">€ {(displayValue ?? 0).toFixed(2)}</h3>
                        <input
                            ref={inputRef}
                            type="number"
                            className="withdraw-input"
                            value={displayValue}
                            onChange={handleInput}
                            onBlur={handleBlur}
                            autoFocus
                            min={0}
                        />
                    </div>
                    <div style={{ display: 'flex', columnGap: '16px' }}>
                        <button className="button common-button" onClick={() => back()}>
                            <Back />
                            <h3 className="main-header-title" style={{ fontSize: "24px" }}>Main Menu</h3>
                        </button>
                        <button disabled={displayValue === 0} className="button common-button" onClick={() => withdraw(displayValue)}>
                            <Confirm />
                            <h3 className="different-amount-button-text">Confirm</h3>
                        </button>
                    </div>
                </div>
                <div className="main-button-row main-footer">
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}>
                        <Contact />
                        <h3 className="contact-text">Contact centre: 000 123 456</h3>
                    </div>
                    <button className="button common-button" onClick={() => logout()}>
                        <Exit />
                        <h3 className="common-button-text">Exit / Remove card</h3>
                    </button>
                </div>
            </div>
        </Container>
    )
}