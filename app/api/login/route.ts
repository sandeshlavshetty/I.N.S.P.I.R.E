import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsersDB } from "@/lib/db"; // Import the function to get the connection for Users DB
import getUserModel from "@/models/user"; // Import the function to get the User model

export async function POST(req: Request) {
    try {
        // Connect to the database and retrieve the User model bound to the correct DB
        const User = await getUserModel();

        // Parse incoming request body
        const { email, password } = await req.json();

        // Validate that both email and password are provided
        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            );
        }

        // Check if the user exists in the database by email
        const user = await User.findOne({ email });
        if (!user) {
            console.warn(`Login attempt failed: User not found for email: ${email}`);
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 400 }
            );
        }

        // Check if the password matches the stored hash
        const isPasswordValid = user.password
            ? await bcrypt.compare(password, user.password)
            : false;

        if (!isPasswordValid) {
            console.warn(`Login attempt failed: Invalid password for email: ${email}`);
            return NextResponse.json(
                { error: "Invalid email or password." },
                { status: 400 }
            );
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role }, // Payload
            process.env.JWT_SECRET!, // Secret key
            { expiresIn: "1d" } // Token expiration (1 day)
        );

        // Prepare the user data to return in the response (excluding password)
        const userData = {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            title: user.title,
            bio: user.bio,
            stats: user.stats,
            socialLinks: user.socialLinks,
            projects: user.projects,
            recentActivities: user.recentActivities,
            btid: user.btid,
            approval: user.approval,
            chosen_option: user.chosen_option,
            d_optn: user.d_optn,
            googleId: user.googleId,
            provider: user.provider
        };

        // Set the HttpOnly cookie with the token
        const response = NextResponse.json(
            {
                message: "Login successful",
                user: userData, // Include the user data here
            },
            { status: 200 }
        );

        response.cookies.set({
            name: "authToken",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensure the cookie is secure in production
            sameSite: "strict", // Prevent CSRF
            path: "/", // Cookie is available across the entire site
            maxAge: 24 * 60 * 60, // 1 day in seconds
        });

        return response;
    } catch (error) {
        console.error("Error logging in user:", error);
        return NextResponse.json(
            { error: "An error occurred during login. Please try again." },
            { status: 500 }
        );
    }
}
