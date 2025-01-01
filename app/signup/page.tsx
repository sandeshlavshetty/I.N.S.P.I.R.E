"use client";

import { useState } from "react";
import Part1 from "./components/Part1";
import Part2 from "./components/Part2";
import { useRouter } from "next/navigation";
import axios from "axios";
import pfp from "@/app/assets/pfp.png";

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: pfp.src,
        title: "Developer",
        bio: "",
        socialLinks: {
            github: "",
            linkedin: "",
            website: "",
        },
        btid: "",
        approval: 0,
        chosen_option: "",
        d_optn: "",
        role: "student",
    });
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleNext = () => {
        setError(null);
        if (currentStep < 3) setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name.startsWith("socialLinks.")) {
            // Handle nested updates for socialLinks
            const field = name.split(".")[1]; // Extract the nested key (e.g., "github" or "linkedin")
            setFormData((prev) => ({
                ...prev,
                socialLinks: {
                    ...prev.socialLinks,
                    [field]: value,
                },
            }));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post("/api/signup", formData);

            if (response.status === 201) {
                router.push("/login");
            } else {
                throw new Error(response.data.error || "Signup failed.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
            <div className="w-full max-w-md p-6 bg-card rounded-lg shadow-lg">
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                {currentStep === 1 && (
                    <Part1 formData={formData} handleChange={handleChange} handleNext={handleNext} />
                )}
                {currentStep === 2 && (
                    <Part2
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handlePrevious={handlePrevious}
                        loading={loading}
                    />
                )}
            </div>
        </div>
    );
};

export default Signup;
