"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Part1Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: () => void;
}

const Part1 = ({ formData, handleChange, handleNext }: Part1Props) => {
    return (
        <form className="space-y-4">
            <div className="flex flex-col">
                <Label className="text-sm font-medium">Name</Label>
                <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"
                />
            </div>
            <div className="flex flex-col">
                <Label className="text-sm font-medium">Email</Label>
                <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"
                />
            </div>
            <div className="flex flex-col">
                <Label className="text-sm font-medium">Password</Label>
                <Input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"
                />
            </div>
            <div className="flex flex-col">
                <Label className="text-sm font-medium">Confirm Password</Label>
                <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"
                />
            </div>
            <div className="flex flex-col">
                <Label className="text-sm font-medium">BTID</Label>
                <Input
                    type="text"
                    name="btid"
                    value={formData.btid}
                    onChange={handleChange}
                    placeholder="Enter your BTID"
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"
                />
            </div>
            <Button className="w-full mt-4" onClick={handleNext}>
                Next
            </Button>
        </form>
    );
};

export default Part1;
