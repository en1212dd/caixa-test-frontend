import './PrincipalLayout.css';
import Footer from "@shared/components/Footer";
import Header from "@shared/components/Header";


export default function PrincipalLayout({ children }: { children: React.ReactNode }) {
    return (
        <section id="principal-container">
            <Header />
            <main >
                {children}
            </main>
            <Footer />
        </section>
    );
}