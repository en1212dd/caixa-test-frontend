import Video from "@app/presentation/Video";
import Wellcoming from "@app/presentation/Wellcoming";
import PortalButton from "@shared/components/PortalButton";
import { CENTERED_CONTAINER_STYLE } from "@shared/constants";
import { useNavigate } from "react-router-dom";

export default function WellcomePage() {
    const navigate = useNavigate();
    return (
        <>
            <Wellcoming />
            <Video />
            <div
                style={CENTERED_CONTAINER_STYLE}
            >
                <PortalButton onClick={() => navigate("/characters")} />
            </div>
        </>
    );
}