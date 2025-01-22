import { ReactElement } from "react";
import { Container } from "./Container"
import InsertCashIllu from "../../assets/illustrations/InsertCash";
import InsertCardIllu from "../../assets/illustrations/InsertCard";
import CollectCashIllu from "../../assets/illustrations/CollectCash";
import RemoveCardIllu from "../../assets/illustrations/RemoveCard";
import ThankYouIllu from "../../assets/illustrations/ThankYou";


type Props = {
    title: string;
    illustration: ReactElement;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    footer?: ReactElement;
}
const Page = ({ title, illustration, onClick, footer }: Props) => {
    return (
        <Container>
            <>
                <div className="landing-left"
                    onClick={onClick}
                >
                    <div className="left-content" style={footer ? {marginBottom: '64px'} : {}}>
                        <h1 className="landing-typography">
                            {title}
                        </h1>
                        {footer}
                    </div>
                </div>
                <div onClick={onClick} style={{
                    top: 0,
                    right: 0,
                    position: 'absolute'
                }}>
                    {illustration}
                </div>

            </>
        </Container>
    )
}

type PageProps = {
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
    footer?: ReactElement;
}

export const InsertCash = ({ footer }: PageProps) => <Page footer={footer} title={`Insert\ncash into the\ndeposit slot`} illustration={<InsertCashIllu />} />
export const InsertCard = ({ onClick }: PageProps) => <Page onClick={onClick} title={`Insert\nyour card\nto start using\nthe ATM`} illustration={<InsertCardIllu />} />
export const CollectCash = ({ onClick }: PageProps) => <Page onClick={onClick} title={`Collect\nyour cash`} illustration={<CollectCashIllu />} />
export const RemoveCard = ({ onClick }: PageProps) => <Page onClick={onClick} title={`Please\nremove\nyour card`} illustration={<RemoveCardIllu />} />
export const ThankYou = ({ onClick }: PageProps) => <Page onClick={onClick} title={`Thank you\nfor using our ATM!`} illustration={<ThankYouIllu />} />