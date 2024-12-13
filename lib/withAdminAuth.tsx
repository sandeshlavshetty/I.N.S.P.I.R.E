"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const withAdminAuth = (WrappedComponent: React.ComponentType) => {
    const WithAdminAuth = (props: any) => {
        const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
        const router = useRouter();

        useEffect(() => {
            const role = localStorage.getItem("role");

            if (role !== "admin") {
                setIsAuthorized(false);

                // Delay redirection to show the error message briefly
                setTimeout(() => {
                    router.push("/dashboard"); // Redirect to /dashboard or the previous page
                }, 2000);
            } else {
                setIsAuthorized(true);
            }
        }, [router]);

        if (isAuthorized === null) {
            return <p>Loading...</p>; // Optionally show a loading state while checking authorization
        }

        if (!isAuthorized) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
                    <h1 className="text-2xl font-bold text-red-500">Permission Denied</h1>
                    <p className="text-sm mt-2">You do not have access to this page. Redirecting...</p>
                </div>
            );
        }

        return <WrappedComponent {...props} />;
    };

    return WithAdminAuth;
};

export default withAdminAuth;
