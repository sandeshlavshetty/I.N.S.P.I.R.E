// components/Part3.tsx
import React from "react";
import pfp from "@/app/assets/pfp.png";
import pfp1 from "@/app/assets/pfp1.png";
import pfp2 from "@/app/assets/pfp2.png";
import pfp3 from "@/app/assets/pfp3.png";
import pfp4 from "@/app/assets/pfp4.png";
import pfp5 from "@/app/assets/pfp5.png";

interface Part3Props {
    formData: any;
    setAvatar: (avatar: string) => void;
    handlePrevious: () => void;
    handleSubmit: () => void;
}

const pfpOptions = [
    pfp.src,
    pfp1.src,
    pfp2.src,
    pfp3.src,
    pfp4.src,
    pfp5.src,
];

const Part3: React.FC<Part3Props> = ({ formData, setAvatar, handlePrevious, handleSubmit }) => {
    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4">Choose Your Profile Picture</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {pfpOptions.map((pfp, index) => (
                    <div
                        key={index}
                        className={`p-2 rounded-lg border-2 cursor-pointer ${
                            formData.avatar === pfp ? "border-blue-500" : "border-transparent"
                        }`}
                        onClick={() => setAvatar(pfp)}
                    >
                        <img src={pfp} alt={`PFP ${index + 1}`} className="w-24 h-24 object-cover rounded-full" />
                    </div>
                ))}
            </div>
            <div className="flex justify-between w-full">
                <button
                    onClick={handlePrevious}
                    className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
                >
                    Back
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                    Finish Signup
                </button>
            </div>
        </div>
    );
};

export default Part3;
