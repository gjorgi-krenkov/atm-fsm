import { ReactElement } from "react"

export const Container = ({ children, style }: { children: ReactElement, style?: React.CSSProperties  }) => {
    return <div style={{
        background: '#F8F8F8',
        width: '1024px',
        height: '768px',
        padding: '64px 80px', 
        boxSizing: 'border-box',
        ...style
    }}>
        {children}
    </div>
}