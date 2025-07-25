// import React from 'react';
// import { Link } from 'react-router-dom';

// const LandingPage = () => {
//     return (
//         <div className="landing-container">
//             <header className="landing-header">
//                 <div className="logo">
//                     <h1>The Daily Post</h1>
//                 </div>
//                 <nav className="nav-links">
//                     <a href="#features">Features</a>
//                     <a href="#about">About</a>
//                     <Link to="/login" className="login-btn">Login</Link>
//                     <Link to="/register" className="register-btn">Register</Link>
//                 </nav>
//             </header>

//             <main>
//                 <section className="hero-section">
//                     <motion.div 
//                         className="hero-content"
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.8 }}
//                     >
//                         <h2>Stay Informed with The Daily Post</h2>
//                         <p>Your trusted source for breaking news, in-depth analysis, and compelling stories from around the globe.</p>
//                         <Link to="/register" className="cta-button">Get Started</Link>
//                     </motion.div>
//                     <div className="hero-image">
//                         <img src="/images/news-illustration.svg" alt="News Illustration" />
//                     </div>
//                 </section>

//                 <section id="features" className="features-section">
//                     <h2>Why Choose The Daily Post?</h2>
//                     <div className="features-grid">
//                         <div className="feature-card">
//                             <i className="feature-icon fa-solid fa-bolt"></i>
//                             <h3>Breaking News</h3>
//                             <p>Get real-time updates on stories that matter.</p>
//                         </div>
//                         <div className="feature-card">
//                             <i className="feature-icon fa-solid fa-globe"></i>
//                             <h3>Global Coverage</h3>
//                             <p>Stories from every corner of the world.</p>
//                         </div>
//                         <div className="feature-card">
//                             <i className="feature-icon fa-solid fa-user-check"></i>
//                             <h3>Fact Checked</h3>
//                             <p>Verified information you can trust.</p>
//                         </div>
//                         <div className="feature-card">
//                             <i className="feature-icon fa-solid fa-mobile-screen"></i>
//                             <h3>Mobile Friendly</h3>
//                             <p>Read anywhere, anytime on any device.</p>
//                         </div>
//                     </div>
//                 </section>

//                 <section id="about" className="about-section">
//                     <div className="about-content">
//                         <h2>About The Daily Post</h2>
//                         <p>Founded with a mission to deliver unbiased, accurate news to readers worldwide. Our team of experienced journalists work tirelessly to bring you stories that inform, educate, and inspire.</p>
//                         <Link to="/about" className="learn-more-btn">Learn More</Link>
//                     </div>
//                 </section>

//                 <section className="testimonials-section">
//                     <h2>What Our Readers Say</h2>
//                     <div className="testimonials-carousel">
//                         <div className="testimonial-card">
//                             <p>"The Daily Post has become my go-to source for reliable news. Their coverage is comprehensive and balanced."</p>
//                             <h4>- Sarah Johnson</h4>
//                         </div>
//                         {/* Add more testimonials as needed */}
//                     </div>
//                 </section>

//                 <section className="newsletter-section">
//                     <div className="newsletter-container">
//                         <h2>Subscribe to Our Newsletter</h2>
//                         <p>Get the latest news delivered directly to your inbox.</p>
//                         <form className="newsletter-form">
//                             <input type="email" placeholder="Enter your email" required />
//                             <button type="submit">Subscribe</button>
//                         </form>
//                     </div>
//                 </section>
//             </main>

//             <footer className="landing-footer">
//                 <div className="footer-content">
//                     <div className="footer-logo">
//                         <h2>The Daily Post</h2>
//                     </div>
//                     <div className="footer-links">
//                         <div className="footer-column">
//                             <h3>Navigation</h3>
//                             <a href="#home">Home</a>
//                             <a href="#features">Features</a>
//                             <a href="#about">About</a>
//                         </div>
//                         <div className="footer-column">
//                             <h3>Legal</h3>
//                             <Link to="/privacy">Privacy Policy</Link>
//                             <Link to="/terms">Terms of Service</Link>
//                         </div>
//                         <div className="footer-column">
//                             <h3>Connect</h3>
//                             <div className="social-icons">
//                                 <a href="#"><i className="fa-brands fa-twitter"></i></a>
//                                 <a href="#"><i className="fa-brands fa-facebook"></i></a>
//                                 <a href="#"><i className="fa-brands fa-instagram"></i></a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="copyright">
//                     <p>&copy; {new Date().getFullYear()} The Daily Post. All rights reserved.</p>
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default LandingPage;