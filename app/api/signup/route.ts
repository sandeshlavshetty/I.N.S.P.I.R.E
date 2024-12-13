import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/user";
import { connectToUserDB } from "@/lib/mongodb";

// POST handler for user signup
export async function POST(req: Request) {
    try {
        console.log("Received signup request.");
        // Ensure the database connection is established
        await connectToUserDB();
        console.log("Connected to user database.");

        // Parse the request body
        const { btid, name, email, password } = await req.json();
        console.log("Parsed request data:", { btid, name, email });

        // Validate required fields
        if (!btid || !name || !email || !password) {
            console.log("Validation failed: missing fields");
            return NextResponse.json(
                { error: "Please provide all required fields: btid, name, email, and password." },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            console.log("Invalid email format.");
            return NextResponse.json(
                { error: "Invalid email address." },
                { status: 400 }
            );
        }

        // Check if the email or btid already exists
        const existingUser = await User.findOne({ $or: [{ email }, { btid }] });
        if (existingUser) {
            const conflictField = existingUser.email === email ? "email" : "btid";
            console.log(`${conflictField} already exists.`);
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
        });

        // Save the user to the database
        await newUser.save();
        console.log("User saved to database:", newUser);

        // Return a success response excluding sensitive information
        return NextResponse.json(
            {
                message: "User created successfully.",
                user: {
                    btid: newUser.btid,
                    name: newUser.name,
                    email: newUser.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during user signup:", error);

        // Handle unexpected server errors
        return NextResponse.json(
            { error: "Internal Server Error." },
            { status: 500 }
        );
    }
}
