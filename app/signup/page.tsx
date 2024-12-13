"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import axios from "axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        btid: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset error and success messages
        setError(null);
        setSuccess(null);

        const { btid, name, email, password, confirmPassword } = formData;

        // Frontend validation
        if (!btid || !name || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post("/api/signup", {
                btid,
                name,
                email,
                password,
            });

            if (response.status === 201) {
                setSuccess("Account created successfully. Please log in to continue.");

                // Redirect to login page after success
                setTimeout(() => {
                    router.push("/login");
                }, 3000);
            } else {
                throw new Error(response.data.error || "An unexpected error occurred.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
            console.error("Signup Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">
                    Sign Up
                </h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {success && <p className="text-green-500 text-center mb-4">{success}</p>}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            BTID
                        </Label>
                        <Input
                            type="text"
                            name="btid"
                            value={formData.btid}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            Name
                        </Label>
                        <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            Email
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            Password
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            Confirm Password
                        </Label>
                        <Input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 mt-4 text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-ring"
                    >
                        {loading ? "Signing Up..." : "Sign Up"}
                    </Button>
                    <p className="mt-4 text-center text-muted-foreground">
                        Already have an account?{" "}
                        <a href="/login" className="text-primary hover:underline">
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
