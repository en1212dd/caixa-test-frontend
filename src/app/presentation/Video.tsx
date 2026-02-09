import { FRAME_RATE, IMG_CONTAINER_STYLE, IMG_STYLE, MAX_FRAMES } from "@shared/constants/index";
import { useState, useEffect } from "react";
import { preload } from "react-dom";

export default function Video() {
    for (let index = 0; index < MAX_FRAMES; index++) {
        const url = `src/assets/frames/frame_${index}.jpg`;
        preload(url, { as: 'image' })
    }
    preload
    const [currentFrame, setCurrentFrame] = useState(0);


    useEffect(() => {
        const updateFrame = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const videoStart = windowHeight; // Después del Wellcoming

            if (scrollY >= videoStart) {
                const scrollInVideo = scrollY - videoStart;

                // Calcular frames basado en densidad configurada
                const frameIndex = Math.floor(
                    (scrollInVideo / windowHeight) * FRAME_RATE
                );

                const clampedFrame = Math.min(frameIndex, MAX_FRAMES - 1);

                if (clampedFrame !== currentFrame) {
                    setCurrentFrame(clampedFrame);
                }
            }
        };

        window.addEventListener('scroll', updateFrame, { passive: true });

        return () => {
            window.removeEventListener('scroll', updateFrame);
        };
    }, []);

    // Calcular altura total basada en densidad
    const totalHeightVH = (MAX_FRAMES / FRAME_RATE) * 100;

    return (
        <article style={{
            height: `${totalHeightVH}vh`,
            width: '100%'
        }}>
            <div style={IMG_CONTAINER_STYLE}>
                <img
                    style={IMG_STYLE}
                    src={`src/assets/frames/frame_${currentFrame}.jpg`}
                    alt={`Frame ${currentFrame}`}
                />

            </div>
        </article>
    );
}