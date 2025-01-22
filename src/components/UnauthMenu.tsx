import EnterPinIllu from "../assets/illustrations/EnterPin";
import { Container } from "../pages/Landing/Container";
import PinInput from "./PinInput";

type Props = {
    onAuth: (pin: string) => void;
}
export const UnauthMenu = ({
    onAuth
}: Props) => {
    return (
        <>
            <Container>
                <>
                    <div className="landing-left"
                    >
                        <div className="left-content">
                            <h1 className="landing-typography">
                                {`Please\nenter your pin`}
                            </h1>
                            <PinInput onSubmit={onAuth} />
                        </div>
                    </div>
                    <div style={{
                        top: 0,
                        right: 0,
                        position: 'absolute'
                    }}>
                        <EnterPinIllu />
                    </div>
                </>
            </Container>
        </>
    )
}