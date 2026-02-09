// PortalButton.jsx
import "./PortalButton.css";

interface PortalButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
}

export default function PortalButton({ onClick, children }: PortalButtonProps) {
    return (
        <button className="portal-button" onClick={onClick}>
            <div className="portal-bg">
                <span id="text-wrapper">
                    <h2 className="portal-text">
                        {children || "Enter Portal"}
                    </h2>
                </span>
            </div>
        </button>
    );
}
