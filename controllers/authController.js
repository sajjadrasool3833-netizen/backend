const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @desc Register new user & Send Email
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Verification token generate karein
        const verificationToken = crypto.randomBytes(20).toString('hex');

        const user = await User.create({ 
            name, 
            email, 
            password,
            verificationToken 
        });

        if (user) {
            // Verification Link
            const verifyUrl = `http://localhost:5000/api/auth/verify/${verificationToken}`;
            
            // Email ka HTML
            const message = `
                <h2>Welcome to TTS Collection, ${name}!</h2>
                <p>Please click the link below to verify your email address:</p>
                <a href="${verifyUrl}" style="background:#f05a28;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Verify Email</a>
            `;

            // Email Bhejne ka Code (Agar Gmail set hai toh chalega, warna error console mein aayega)
            try {
                await sendEmail({
                    email: user.email,
                    subject: 'Verify your TTS Collection Account',
                    message
                });
            } catch (error) {
                console.log("Email bhejne mein error aya (Gmail set nahi hai):", error.message);
            }

            // ⚠️ Main yahan se direct verify hata raha hoon taake user email par click kare
            // Agar aap chahti hain bina email click ke direct verify ho, toh niche wali line uncomment kar dein:
            // user.isVerified = true;
            // await user.save();

            res.status(201).json({ message: 'User registered. Please check your email to verify.' });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error during registration' });
    }
};

// @desc Verify Email (Isme hum user ko Admin bana rahe hain)
const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({ verificationToken: req.params.token });

        if (!user) {
            return res.status(400).send('<h1>Invalid or Expired Token</h1>');
        }

        user.isVerified = true;
        user.role = 'admin'; // <-- YEH LINE USER KO ADMIN BANA DEGI
        user.verificationToken = undefined;
        await user.save();

        // Verify hone ke baad frontend par bhej dein
        res.redirect('http://localhost:5173/signin?verified=true');
    } catch (error) {
        res.status(500).send('Server Error');
    }
};

// @desc Login User (Bina email verification check ke)
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Maine yahan se 'isVerified' ka check hata diya hai taake aap foran login kar sakein
            res.json({
                _id: user._id, 
                name: user.name, 
                email: user.email, 
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error during login' });
    }
};

module.exports = { registerUser, verifyEmail, loginUser };