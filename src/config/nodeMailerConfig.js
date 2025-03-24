const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send emails
const sendRegistrationEmail = async (leaderEmail, eventName, teamName, leaderName, members) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: leaderEmail,
        subject: `🚀 ${eventName} Registration Confirmed!`,
        html: `
            <div style="background: #111; color: #0ff; font-family: 'Orbitron', sans-serif; padding: 20px; border: 2px solid #f0f; border-radius: 8px; text-align: left;">
                <h2 style="color: #f0f; text-shadow: 0 0 8px #f0f;">✔ Registered Successfully!</h2>
                
                <p><strong>Event:</strong> <span style="color: #ff0;">${eventName}</span></p>
                <p><strong>Team:</strong> <span style="color: #ff0;">${teamName}</span></p>
                <p><strong>Leader:</strong> <span style="color: #ff0;">${leaderName}</span> (${leaderEmail})</p>
    
                <p><strong>Team Members:</strong></p>
                <ul style="list-style: none; padding: 0;">
                    ${members.map(member => `<li style="color: #ff0; background: rgba(255, 0, 255, 0.2); padding: 7px; margin: 5px 0; border-radius: 4px;">⚡ ${member.name}</li>`).join('')}
                </ul>
    
                <p style="color: #f0f; text-shadow: 0 0 8px #f0f;">💀 Get Ready for the Challenge! 💀</p>
            </div>
        `
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Registration emal sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendRegistrationEmail;
