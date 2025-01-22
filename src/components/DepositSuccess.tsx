import { Back } from "../assets/icons/Back";
import { Exit } from "../assets/icons/Exit";
import { Container } from "../pages/Container";
import { Success } from "../assets/icons/Success";

type Props = {
    logout: () => void;
    back: () => void;
}

export const DepositSuccess = ({
    logout,
    back,
}: Props) => {
    return (
        <Container>
            <div className="main-container">
                <div className="main-header">
                    <div>
                        <h1 className="main-header-title">Deposit success</h1>
                        <h3 className="main-header-body">How would you like to proceed?</h3>
                    </div>
                    <div>
                        <h3 className="main-header-body" style={{ color: "#3C5E60" }}>15 November, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                        <h1 className="main-header-title" style={{ textAlign: 'right', height: '48px' }}>26ºC</h1>
                    </div>
                </div>
                <div style={{ display: 'flex', rowGap: "16px", flexDirection: 'column' }}>
                    <div className="data-card" style={{ overflow: 'hidden', flexDirection: 'column', gap: '0px', height: '336px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '32px' }}>
                            <Success />
                            <h3 className="main-header-title" style={{ fontSize: '48px', color: "#11969E" }}>Deposit Successful</h3>
                        </div>
                    </div>
                </div>
                <div className="main-button-row main-footer">
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
        </Container>
    )
}