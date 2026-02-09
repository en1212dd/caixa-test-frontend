import "./PortalLoader.css";
interface PortalLoaderProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export default function PortalLoader({ size = 'medium', className = '' }: PortalLoaderProps) {
    const sizes = {
        small: { width: '80px', height: '80px' },
        medium: { width: '120px', height: '120px' },
        large: { width: '180px', height: '180px' }
    };

    return (
        <div
            className={`portal-loader ${className}`}
            style={sizes[size]}
        >
            <div className="portal-outer-ring">
                <div className="portal-ring-segment"></div>
                <div className="portal-ring-segment"></div>
                <div className="portal-ring-segment"></div>
                <div className="portal-ring-segment"></div>
            </div>

            {/* Centro del portal */}
            <div className="portal-core">
            </div>
        </div>
    );
}