import { Container } from "../pages/Container";
import { Spinner } from "../assets/icons/Spinner";

export const ProcessRequest = () => {
    return (
        <Container style={{zIndex: 2, position: 'absolute', backgroundColor: '#F8F8F8B3', top: 0}}>
            <div className="main-container" style={{justifyContent: 'center'}}>
                <div style={{ display: 'flex', rowGap: "16px", flexDirection: 'column' }}>
                    <div className="data-card" style={{ overflow: 'hidden', flexDirection: 'column', gap: '0px', height: '336px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', columnGap: '32px' }}>
                            <Spinner />
                            <h3 className="main-header-title" style={{ fontSize: '48px', color: "#11969E" }}>Processing request...</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}