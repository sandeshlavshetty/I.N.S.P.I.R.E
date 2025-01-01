import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import getUserModel from "@/models/user"; // Dynamic model import
import pfp from "@/app/assets/pfp.png";

// POST handler for user signup
export async function POST(req: Request) {
    try {
        console.log("Received signup request.");

        // Parse the request body
        const {
            btid,
            name,
            email,
            password,
            avatar = pfp.src,
            title = "Developer",
            bio = "",
            socialLinks = { github: "", linkedin: "", website: "" },
            approval = 0,
            chosen_option = "",
            d_optn = "",
            role = "student",
        } = await req.json();

        console.log("Parsed request data:", { btid, name, email });

        // Validate required fields
        if (!btid || !name || !email || !password) {
            console.log("Validation failed: missing fields.");
            return NextResponse.json(
                { error: "All fields are required: btid, name, email, and password." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            console.log("Validation failed: invalid email format.");
            return NextResponse.json(
                { error: "Invalid email address format." },
                { status: 400 }
            );
        }

        // Validate btid format if required (add your own regex for btid)
        const btidRegex = /^[A-Za-z0-9]+$/; // Example pattern, replace with your actual format
        if (!btidRegex.test(btid)) {
            console.log("Validation failed: invalid btid format.");
            return NextResponse.json(
                { error: "Invalid btid format." },
                { status: 400 }
            );
        }

        // Check if the email or btid already exists
        const User = await getUserModel();
        const existingUser = await User.findOne({ $or: [{ email }, { btid }] });
        if (existingUser) {
            const conflictField = existingUser.email === email ? "email" : "btid";
            console.log(`Validation failed: ${conflictField} already exists.`);
            return NextResponse.json(
                { error: `${conflictField} already exists.` },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            btid,
            name,
            email,
            password: hashedPassword,
            avatar,
            title,
            bio,
            socialLinks,
            approval,
            chosen_option,
            d_optn,
            role,
        });

        // Save the user to the database
        await newUser.save();
        console.log("User successfully saved to the database:", newUser);

        // Return a success response excluding sensitive information
        return NextResponse.json(
            {
                message: "User created successfully.",
                user: {
                    btid: newUser.btid,
                    name: newUser.name,
                    email: newUser.email,
                    avatar: newUser.avatar,
                    title: newUser.title,
                    bio: newUser.bio,
                    socialLinks: newUser.socialLinks,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during user signup:", error);

        // Handle unexpected server errors
        return NextResponse.json(
            { error: "Internal Server Error. Please try again later." },
            { status: 500 }
        );
    }
}
