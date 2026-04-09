import "../styles/AcademicCurator.css"
export default function MainFooter() {
  return (
    <footer className="ac-footer">
      <div className="ac-footer-grid">
        <div className="ac-footer-brand">
          <div className="ac-footer-logo">The Academic Curator</div>
          <p className="ac-footer-tagline">
            Redefining student housing in the cultural capital of India.
            Elevating the academic lifestyle through premium spaces and community.
          </p>
        </div>

        <div className="ac-footer-col">
          <h4>Explore</h4>
          <ul>
            <li>About Us</li>
            <li>Verified Listings</li>
            <li>Safety Guidelines</li>
          </ul>
        </div>

        <div className="ac-footer-col">
          <h4>Support</h4>
          <ul>
            <li>Contact Support</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div className="ac-footer-col">
          <h4>Stay Connected</h4>
          <div className="ac-footer-social">
            <div className="ac-footer-social-btn">𝕏</div>
            <div className="ac-footer-social-btn">✉</div>
          </div>
        </div>
      </div>

      <div className="ac-footer-bottom">
        <span>© 2024 The Academic Curator. Premium Student Living in Kolkata.</span>
      </div>
    </footer>
  );
}