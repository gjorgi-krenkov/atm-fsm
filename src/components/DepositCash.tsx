import { Confirm } from "../assets/icons/Confirm";
import { Contact } from "../assets/icons/Contact";
import { Container } from "../pages/Container";
import { Cancel } from "../assets/icons/Cancel";

type Props = {
    confirm: () => void;
    cancel: () => void;
    amount: string | undefined;
}

export const DepositCash = ({
    confirm,
    cancel,
    amount = '0'
}: Props) => {
 
    return (
        <Container>
            <div className="main-container">
                <div className="main-header">
                    <div>
                        <h1 className="main-header-title">Depost cash</h1>
                        <h3 className="main-header-body">Would you like to prooced?</h3>
                    </div>
                    <div>
                        <h3 className="main-header-body" style={{ color: "#3C5E60" }}>15 November, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                        <h1 className="main-header-title" style={{ textAlign: 'right', height: '48px' }}>26ºC</h1>
                    </div>
                </div>
                <div style={{ display: 'flex', rowGap: "16px", flexDirection: 'column' }}>
                    <div className="data-card" style={{ overflow: 'hidden', flexDirection: 'column', gap: '0px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '704px' }}>
                            <h3 className="main-header-title" style={{ fontSize: '32px' }}>Depositing amount: </h3>
                            <h3 className="main-header-title" style={{ fontSize: '32px' }}>€ {Number.parseInt(amount).toFixed(2)} </h3>
                        </div>
                    </div>
                    <div style={{ display: 'flex', columnGap: '16px' }}>
                        <button className="button common-button" onClick={() => cancel()}>
                            <Cancel />
                            <h3 className="common-button-text" style={{ fontSize: "24px" }}>Cancel</h3>
                        </button>
                        <button className="button common-button" onClick={() => confirm()}>
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
                </div>
            </div>
        </Container>
    )
}