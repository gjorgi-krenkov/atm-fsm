import { Back } from "../assets/icons/Back";
import { Contact } from "../assets/icons/Contact";
import { DifferentAmount } from "../assets/icons/DifferentAmount";
import { Exit } from "../assets/icons/Exit";
import { Container } from "../pages/Container";


type SuggestedAmountProps = {
    onClick: () => void;
    value: number;
    noLeft?: boolean
}
const SuggestedAmountButton = ({ onClick, value, noLeft }: SuggestedAmountProps) => {
    return <button className={`suggested-amount-button ${noLeft ? "" : " border-left"} bottom-border`} onClick={onClick}>
        € {value.toFixed(2)}
    </button>
}


type Props = {
    logout: () => void;
    back: () => void;
    withdraw: (amount: number) => void;
    openDiffAmount: () => void;
}

export const WithdrawMenu = ({
    logout,
    back,
    withdraw,
    openDiffAmount
}: Props) => {
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
                        <div className="main-border" style={{ display: 'flex' }}>
                            <SuggestedAmountButton noLeft value={10} onClick={() => withdraw(10)} />
                            <SuggestedAmountButton value={20} onClick={() => withdraw(20)} />
                            <SuggestedAmountButton value={25} onClick={() => withdraw(25)} />
                        </div>
                        {/* <div class="horizontal-line"></div> */}
                        <div style={{ display: 'flex' }}>
                            <SuggestedAmountButton noLeft value={50} onClick={() => withdraw(50)} />
                            <SuggestedAmountButton value={100} onClick={() => withdraw(100)} />
                            <SuggestedAmountButton value={150} onClick={() => withdraw(150)} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', columnGap: '16px' }}>
                        <button className="button common-button" onClick={() => back()}>
                            <Back />
                            <h3 className="main-header-title" style={{ fontSize: "24px" }}>Main Menu</h3>
                        </button>
                        <button className="button common-button" onClick={() => openDiffAmount()}>
                            <DifferentAmount />
                            <h3 className="different-amount-button-text">Different amount</h3>
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