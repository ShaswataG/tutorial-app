const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: true,
    auth: {
        user: 'nobitanobichildish@gmail.com',
        pass: 'Ajibhallagile37#'
    }
});

const sendOtp = async (email, otp) => {
    console.log('Inside emailService.sendOtp');
    const mailOptions = {
        from: 'nobitanobichildish@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        html: `Your otp is ${otp}`
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info);
        return info
    } catch (error) {
        console.log(error);
        console.error('Failed to send OTP email');
        throw new Error('Failed to send OTP email');
    }
}

module.exports = {
    sendOtp
}