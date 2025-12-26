import React from 'react'
import Login from "../components/Login"
function HeroSection() {
    return (
        <section className="hero">
            <article>
                <h1 className="hero-title">
                    Find Your Perfect <span className="highlight">Room</span><br />
                    Anywhere in India
                </h1>
                <p className="hero-desc">
                    Discover thousands of verified rental properties across 50+ cities in India. Your dream home is just a search away with our trusted platform.
                </p>
            </article>
            <Login />
        </section>
    )
}

export default HeroSection