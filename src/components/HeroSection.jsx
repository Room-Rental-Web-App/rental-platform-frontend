import Login from "../components/Login";
import { } from 'lucide-react';
import "../css/hero.css";
function HeroSection() {
    const token = localStorage.getItem("token");


    const handleLoginSuccess = () => {
        window.location.reload();
    };
    return (
        <section className="hero">
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-info">
                        <h1 className="hero-title">
                            Find Your Perfect <span className="highlight">Room</span><br />
                            Anywhere in India
                        </h1>
                        <p className="hero-desc">
                            Discover thousands of verified rental properties across 50+ cities.
                            Your dream home is just a search away.
                        </p>
                    </div>
                    {!token && (

                        <Login onLoginSuccess={handleLoginSuccess} />

                    )}
                </div>


            </div>
        </section>
    );
}

export default HeroSection;