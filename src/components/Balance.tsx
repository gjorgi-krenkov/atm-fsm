import { Back } from "../assets/icons/Back";
import { Contact } from "../assets/icons/Contact";
import { Exit } from "../assets/icons/Exit";
import { Container } from "../pages/Container";

type Props = {
    logout: () => void;
    back: () => void;
    balance: string | undefined;
}
export const Balance = ({
    logout,
    back,
    balance = '0'
}: Props) => {
    return (
        <Container>
            <div className="main-container">
                <div className="main-header">
                    <div>
                        <h1 className="main-header-title">Account Balance</h1>
                        <h3 className="main-header-body">How would you like to proceed?</h3>
                    </div>
                    <div>
                        <h3 className="main-header-body" style={{ color: "#3C5E60" }}>15 November, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                        <h1 className="main-header-title" style={{ textAlign: 'right', height: '48px' }}>26ºC</h1>
                    </div>
                </div>
                <div style={{ display: 'flex', rowGap: "16px", flexDirection: 'column' }}>
                    <div className="data-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '704px'}}>
                        <h3 className="main-header-title" style={{ fontSize: '32px' }}>Your current balance is: </h3>
                        <h3 className="main-header-title" style={{ fontSize: '32px' }}>€ {Number.parseInt(balance).toFixed(2)} </h3>
                        </div>
                    </div>
                    <div style={{ display: 'flex', columnGap: '16px' }}>
                        <button className="button common-button" onClick={() => back()}>
                            <Back />
                            <h3 className="main-header-title" style={{ fontSize: "24px" }}>Main Menu</h3>
                        </button>
                        <button className="button common-button" onClick={() => logout()}>
                            <Exit />
                            <h3 className="common-button-text">Exit / Remove card</h3>
                        </button>
                    </div>
                </div>
                <div className="main-button-row main-footer">
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '16px' }}>
                        <Contact />
                        <h3 className="contact-text">Contact centre: 000 123 456</h3>
                    </div>
                </div>
            </div>
        </Container>
    )
}