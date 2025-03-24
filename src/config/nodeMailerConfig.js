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
        subject: `Team Registered for ${eventName}`,
        html: `
            <h2>Congratulations! Your team has been registered.</h2>
            <p><strong>Event Name:</strong> ${eventName}</p>
            <p><strong>Team Name:</strong> ${teamName}</p>
            <p><strong>Leader:</strong> ${leaderName} (${leaderEmail})</p>
            <p><strong>Members:</strong></p>
            <ul>
                ${members.map(member => `<li>${member.name}</li>`).join('')}
            </ul>
            <p>Best of luck for the event!</p>
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
