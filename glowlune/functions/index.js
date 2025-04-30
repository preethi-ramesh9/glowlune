const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
  const email = user.email;
  const displayName = user.displayName || "Skincare Enthusiast";

  const mailRef = admin.firestore().collection("mail").doc();
  return mailRef.set({
    to: email,
    message: {
      subject: `✨ Welcome to GlowLune – Radiant Skin Awaits!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body {
                    font-family: 'Helvetica Neue', Arial, sans-serif;
                    background-color: #f9f5f0; /* Soft beige */
                    color: #333;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background: white;
                    border-radius: 8px;
                    overflow: hidden;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                }
                .header {
                    background-color: #f6f6e9; /* Light beige */
                    padding: 30px;
                    text-align: center;
                    border-bottom: 1px solid #e0d5c8;
                }
                .logo {
                    max-width: 150px;
                }
                h1 {
                    color: #2a2a2a; /* Dark black */
                    font-size: 24px;
                    margin: 20px 0 10px;
                }
                .content {
                    padding: 30px;
                    color: #555;
                }
                .cta-button {
                    display: inline-block;
                    background: #2a2a2a;
                    color: white !important;
                    padding: 12px 25px;
                    text-decoration: none;
                    border-radius: 4px;
                    font-weight: bold;
                    margin: 20px 0;
                }
                .footer {
                    background-color: #f6f6e9;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #777;
                }
                .social-icons a {
                    margin: 0 10px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <img src="./static/images/logo.jpg" alt="GlowLune Logo" class="logo">
                    <h1>Welcome to GlowLune, ${displayName}!</h1>
                </div>
                <div class="content">
                    <p>We’re thrilled to have you join our community of radiant skin seekers. At GlowLune, we believe in clean, science-backed skincare that brings out your natural glow.</p>
                    
                    <p>Here’s what to expect:</p>
                    <ul>
                        <li><strong>15% off your first order</strong> – Use code <strong>GLOW15</strong> at checkout</li>
                        <li>Expert skincare tips tailored to your skin type</li>
                        <li>Early access to new product launches</li>
                    </ul>
                    
                    <p>Ready to start your glow-up journey?</p>
                    <a href="https://glowlune.com/shop" class="cta-button">Shop Now</a>
                    
                    <p>With love,<br>The GlowLune Team</p>
                </div>
                <div class="footer">
                    <p>Follow us for skincare tips and updates:</p>
                    <div class="social-icons">
                        <a href="https://instagram.com/glowluneskincare"><img src="https://glowlune.com/ig-icon.png" width="24" alt="Instagram"></a>
                        <a href="https://pinterest.com/glowluneskincare"><img src="https://glowlune.com/fb-icon.png" width="24" alt="Facebook"></a>
                    </div>
                    <p>© ${new Date().getFullYear()} GlowLune Skincare. All rights reserved.</p>
                    <p><a href="https://glowlune.com/unsubscribe" style="color: #777;">Unsubscribe</a></p>
                </div>
            </div>
        </body>
        </html>
      `,
    },
  });
});