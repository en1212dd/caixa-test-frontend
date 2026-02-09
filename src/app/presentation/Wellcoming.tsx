import './Wellcoming.css';

export default function Wellcoming() {
    return (
        <article id="main-wellcoming">
            <figure id="ship-container">
                <div id="ship" />
                <div id="title">
                    <h3>by</h3>
                    <h3>Yerko Alvarez</h3>
                    <h1>Rick and Morty dex</h1>
                </div>
            </figure>
            <section id="scroll-indicator-container">
                <h1>Scroll</h1>
                <div id="scroll-indicator">
                    <h1 >For</h1>
                    <img src="src/assets/portal.webp" alt="Portal" />
                </div>
                <h1 >More</h1>
            </section>
        </article>
    );
} 