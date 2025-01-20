import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function withAuth(Component: React.ComponentType) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState(false);

        useEffect(() => {
            const verifyAuth = async () => {
                try {
                    // Show loading during verification
                    setLoading(true);

                    // Make a call to verify the token from cookies
                    const response = await axios.get("/api/verify-auth", {
                        withCredentials: true, // Include cookies with the request
                    });

                    if (response.status === 200 && response.data.authenticated) {
                        setIsAuthenticated(true); // Set authentication status
                    } else {
                        router.replace("/login"); // Redirect if not authenticated
                    }
                } catch (error) {
                    console.error("Error verifying auth:", error);
                    router.replace("/login"); // Redirect on error
                } finally {
                    setLoading(false); // Stop loading after verification
                }
            };

            verifyAuth();
        }, [router]);

        // Show <Loading /> while authentication is being verified
        if (loading) return <Loading />;

        // Render the component if authenticated
        if (isAuthenticated) return <Component {...props} />;

        // Prevent rendering anything if unauthenticated
        return null;
    };
}
