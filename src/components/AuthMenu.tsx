import { CheckBalance } from "../assets/icons/CheckBalance";
import { Contact } from "../assets/icons/Contact";
import { DepositCash } from "../assets/icons/DepositCash";
import { Exit } from "../assets/icons/Exit";
import { WithdrawCash } from "../assets/icons/WithdrawCash";
import { Container } from "../pages/Container";

type Props = {
    userId: string;
    openCheckBalance: () => void;
    openDeposit: () => void;
    openWithdraw: () => void;
    logout: () => void;
}
export const AuthMenu = ({
    openCheckBalance,
    openDeposit,
    openWithdraw,
    logout
}: Props) => {
    return (
        <Container>
            <div className="main-container">
                <div className="main-header">
                    <div>
                        <h1 className="main-header-title">Welcome, Gjorgi Krenkov</h1>
                        <h3 className="main-header-body">Which service would you like to use today?</h3>
                    </div>
                    <div>
                        <h3 className="main-header-body" style={{ color: "#3C5E60" }}>15 November, {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h3>
                        <h1 className="main-header-title" style={{ textAlign: 'right', height: '48px' }}>26ºC</h1>
                    </div>
                </div>
                <div style={{ display: 'flex', rowGap: "16px", flexDirection: 'column' }}>
                    <div className="main-button-row">
                        <button className="button main-large-button" onClick={() => openWithdraw()}>
                            <WithdrawCash />
                            <h3 className="main-large-button-text">Withdraw Cash</h3>
                        </button>
                        <button className="button main-large-button" onClick={() => openDeposit()}>
                            <DepositCash />
                            <h3 className="main-large-button-text">Deposit Cash</h3>
                        </button>
                    </div>
                    <div className="main-button-row">
                        <button className="button main-balance-button" onClick={() => openCheckBalance()}>
                            <CheckBalance />
                            <h3 className="main-header-title main-balance-button-text">Check Balance</h3>
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