"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import LoadingSpinner from "./LoadingSpinner";

// Define authentication context types
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the auth context
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
});

// Hook to use auth context
export const useAuth = () => useContext(AuthContext);

// Routes that don't require authentication
const publicRoutes = ["/landing-page", "/flow/login", "/flow/create-account"];

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const isLoggedIn = !!user;
      setIsAuthenticated(isLoggedIn);

      // Complete authentication check
      setIsLoading(false);

      // Route protection logic
      const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isLoggedIn) {
        // Authenticated users on public routes get redirected to main app
        if (isPublicRoute) {
          router.push("/");
        }
      } else {
        // Unauthenticated users on protected routes get redirected to landing page
        if (!isPublicRoute) {
          router.push("/landing-page");
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router, pathname]);

  // If still loading auth state, show loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
