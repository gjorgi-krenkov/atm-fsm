import { ReactElement } from "react"

export const Container = ({ children }: { children: ReactElement }) => {
    return <div style={{
        background: 'linear-gradient(240.78deg, #FFFFFF 18.64%, #D0F1F2 95.29%)',
        width: '1024px',
        height: '768px',
        position: 'relative',
        display: 'flex'
    }}>
        {children}
    </div>
}