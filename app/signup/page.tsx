"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Signup = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center mb-6 text-foreground">Sign Up</h2>
            <form className="space-y-4">
                <div className="flex flex-col">
                <Label className="text-sm font-medium text-card-foreground">First Name</Label>
                <Input type="text" className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="flex flex-col">
                <Label className="text-sm font-medium text-card-foreground">Last Name</Label>
                <Input type="text" className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="flex flex-col">
                <Label className="text-sm font-medium text-card-foreground">Phone Number</Label>
                <Input type="tel" className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="flex flex-col">
                <Label className="text-sm font-medium text-card-foreground">Email</Label>
                <Input type="email" className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="flex flex-col">
                <Label className="text-sm font-medium text-card-foreground">Password</Label>
                <Input type="password" className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="flex flex-col">
                <Label className="text-sm font-medium text-card-foreground">Confirm Password</Label>
                <Input type="password" className="w-full px-4 py-2 mt-1 bg-input text-card-foreground border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <Button type="submit" className="w-full py-2 mt-4 text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 focus:ring-2 focus:ring-ring">Sign Up</Button>
                <p className="mt-4 text-center text-muted-foreground">
                Already have an account? <a href="/login" className="text-primary hover:underline">Log in</a>
                </p>
            </form>
            </div>
        </div>
    );
};

export default Signup;
