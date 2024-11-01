"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Login = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="w-full max-w-md p-8 bg-card rounded-2xl shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">
                    Login
                </h2>
                <form className="space-y-6">
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            Email
                        </Label>
                        <Input
                            type="email"
                            className="w-full px-4 py-2 mt-2 bg-input text-card-foreground border-none rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label className="text-sm font-medium text-card-foreground">
                            Password
                        </Label>
                        <Input
                            type="password"
                            className="w-full px-4 py-2 mt-2 bg-[#e0f7f9] text-card-foreground border-none rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full py-2 mt-4 text-primary-foreground bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 shadow-lg focus:ring-2 focus:ring-ring"
                    >
                        Login
                    </Button>
                    <p className="mt-4 text-center text-muted-foreground">
                        Don&apos;t have an account?{" "}
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
