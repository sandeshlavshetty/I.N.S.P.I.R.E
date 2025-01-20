import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Part2Props {
    formData: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleNext: () => void;
    handlePrevious: () => void;
    loading: boolean;
}

const Part2 = ({ formData, handleChange, handleNext, handlePrevious, loading }: Part2Props) => {
    return (
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <h2 className="text-2xl font-semibold text-center mb-6">Profile Information</h2>
            <div className="flex flex-col">
                <Label>Title</Label>
                <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"

                />
            </div>
            <div className="flex flex-col">
                <Label>Bio</Label>
                <Input
                    type="text"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"

                />
            </div>
            <div className="flex flex-col">
                <Label>GitHub</Label>
                <Input
                    type="text"
                    name="socialLinks.github"
                    value={formData.socialLinks.github}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"

                />
            </div>
            <div className="flex flex-col">
                <Label>LinkedIn</Label>
                <Input
                    type="text"
                    name="socialLinks"
                    value={formData.socialLinks.linkedin}
                    onChange={handleChange}
                    className="w-full px-4 py-2 mt-1 bg-input border rounded-lg"

                />
            </div>
            <Button className="w-full mt-4" onClick={handlePrevious}>
                Back
            </Button>
            <Button className="w-full mt-4" onClick={handleNext} disabled={loading}>
                {loading ? "Submitting..." : "Next"}
            </Button>
        </form>
    );
};

export default Part2;
