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
                    // TESTING: Bypass auth check - always authenticate
                    setLoading(true);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error verifying auth:", error);
                } finally {
                    setLoading(false);
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
