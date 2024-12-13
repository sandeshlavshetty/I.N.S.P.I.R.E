import { Loading } from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function withAuth(Component: React.ComponentType) {
    return function AuthenticatedComponent(props: any) {
        const router = useRouter();
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            // Ensure this runs only on the client-side (no SSR issues)
            if (typeof window !== "undefined") {
                const token = localStorage.getItem("token");

                if (!token) {
                    router.replace("/login"); // Redirect to login if no token
                    return;
                }

                // If everything checks out, stop loading
                setLoading(false);
            }
        }, [router]);

        // If the page is still loading (checking authentication), show loading message
        if (loading) return <div><Loading/></div>;

        // If the user is authenticated, render the wrapped component
        return <Component {...props} />;
    };
}
