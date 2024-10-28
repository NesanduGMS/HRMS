import React from 'react';
import { TiSocialFacebook, TiSocialTwitter, TiSocialInstagram, TiSocialLinkedin } from "react-icons/ti";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";

const ContactForm = () => {
  return (
    <div className="contact-form-container" style={{ padding: '50px 0', backgroundColor: '#f9fafb', position: 'relative', display: 'flex', justifyContent: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '900px', backgroundColor: '#fff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '10px', overflow: 'hidden' }}>
        {/* Left Section */}
        <div style={{ padding: '40px', backgroundColor: '#fff' }}>
          <h3 style={{ fontSize: '24px', color: '#1a202c', marginBottom: '20px' }}>Let's get in touch</h3>
          <p style={{ color: '#4a5568', marginBottom: '20px' }}>
            Welcome to our Contact Page! We are here to help with any questions, feedback, or inquiries you may have.
          </p>
          
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', color: '#718096', marginBottom: '10px' }}>
              <MdLocationOn style={{ fontSize: '30px', marginRight: '10px' }} />
              <p>University of Moratuwa, Katubedda.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#718096', marginBottom: '10px' }}>
              <MdEmail style={{ fontSize: '30px', marginRight: '10px' }} />
              <p>moramerchandise@gmail.com</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', color: '#718096', marginBottom: '10px' }}>
              <MdPhone style={{ fontSize: '30px', marginRight: '10px' }} />
              <p>+94-77-5963961</p>
            </div>
          </div>

          <div>
            <p style={{ color: '#4a5568', marginBottom: '10px' }}>Connect with us :</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <a href="https://www.facebook.com/profile.php?id=61560774282709&mibextid=LQQJ4d" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#3b5998', width: '36px', height: '36px', color: '#fff', borderRadius: '5px', transition: 'transform 0.3s', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                <TiSocialFacebook style={{ fontSize: '24px' }} />
              </a>
              <a href="#" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#1da1f2', width: '36px', height: '36px', color: '#fff', borderRadius: '5px', transition: 'transform 0.3s', textDecoration: 'none' }}>
                <TiSocialTwitter style={{ fontSize: '24px' }} />
              </a>
              <a href="https://www.instagram.com/moramerc_?igsh=dHFrZG9wdGQ0ajhv" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'linear-gradient(to right, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)', width: '36px', height: '36px', color: '#fff', borderRadius: '5px', transition: 'transform 0.3s', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer">
                <TiSocialInstagram style={{ fontSize: '24px' }} />
              </a>
              <a href="#" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#0077b5', width: '36px', height: '36px', color: '#fff', borderRadius: '5px', transition: 'transform 0.3s', textDecoration: 'none' }}>
                <TiSocialLinkedin style={{ fontSize: '24px' }} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Section with Dark Navy Blue */}
        <div style={{ padding: '40px', backgroundColor: '#1a2e46', color: '#fff' }}> {/* Changed backgroundColor to dark navy blue */}
          <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Contact us</h3>

          <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <input type="text" name="name" style={{ padding: '10px 20px', backgroundColor: '#2e3d55', border: '2px solid #3c4e6b', borderRadius: '25px', color: '#fff', outline: 'none' }} placeholder="Name" />
            <input type="email" name="email" style={{ padding: '10px 20px', backgroundColor: '#2e3d55', border: '2px solid #3c4e6b', borderRadius: '25px', color: '#fff', outline: 'none' }} placeholder="Email" />
            <input type="tel" name="phone" style={{ padding: '10px 20px', backgroundColor: '#2e3d55', border: '2px solid #3c4e6b', borderRadius: '25px', color: '#fff', outline: 'none' }} placeholder="Phone" />
            <textarea name="message" rows="4" style={{ padding: '10px 20px', backgroundColor: '#2e3d55', border: '2px solid #3c4e6b', borderRadius: '10px', color: '#fff', outline: 'none', resize: 'none' }} placeholder="Message"></textarea>
            <button type="submit" style={{ padding: '12px 25px', backgroundColor: '#0077b5', color: '#fff', border: 'none', borderRadius: '25px', cursor: 'pointer', transition: 'background-color 0.3s' }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
