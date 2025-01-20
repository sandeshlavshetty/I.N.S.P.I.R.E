"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useUserContext } from "../context/UserContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { setUser } = useUserContext(); // Destructure setUser from context

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors
        setIsLoading(true);

        try {
            const response = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                const user = data.user;
                // Save the role to localStorage
                localStorage.setItem("role", user.role);

                // Set user data in context
                setUser(user);
                console.log("Updated User Context:", user);

                router.push(user.role === "student" ? "/dashboard" : "/admin");
            } else {
                const errorData = await response.json();
                setError(errorData.error || "Login failed");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? `Something went wrong: ${err.message}`
                    : "Something went wrong."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Login</h2>
                <form className="space-y-6" onSubmit={handleLogin}>
                    {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">Email</Label>
                        <Input
                            type="email"
                            className="w-full px-4 py-2 mt-2 bg-input text-card-foreground border-none rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">Password</Label>
                        <Input
                            type="password"
                            className="w-full px-4 py-2 mt-2 bg-input text-card-foreground border-none rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-2 mt-4 text-primary-foreground bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg focus:ring-2 focus:ring-ring"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </Button>
                    <p className="mt-4 text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
