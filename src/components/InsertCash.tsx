import { Confirm } from "../assets/icons/Confirm";
import { InsertCash as Landing } from "../pages/Landing";
import { Cancel } from "../assets/icons/Cancel";

type Props = {
    confirm: () => void;
    back: () => void;
}

export const InsertCash = ({
    confirm,
    back,
}: Props) => {

    return (
        <Landing
            footer={
                <div style={{ display: 'flex', columnGap: '16px', marginTop: '64px', zIndex: 2, position: 'relative' }}>
                    <button className="button common-button" onClick={() => back()}>
                        <Cancel />
                        <h3 className="common-button-text" style={{ fontSize: "24px" }}>Cancel</h3>
                    </button>
                    <button className="button common-button" onClick={() => confirm()}>
                        <Confirm />
                        <h3 className="different-amount-button-text">Confirm</h3>
                    </button>
                </div>
            }
        />
    )
}