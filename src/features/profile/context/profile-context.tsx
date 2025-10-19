"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface UserProfile {
  username: string;
  jobTitle: string;
}

interface UserProfileContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  createUserProfile: (username: string, jobTitle: string) => Promise<void>;
  updateUserProfile: (username: string, jobTitle: string) => Promise<void>;
  clearUserProfile: () => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(
  undefined
);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const response = await fetch("/api/v1/user");
      if (response.ok) {
        const userData = await response.json();
        setUserProfile(userData);
      } else {
        setUserProfile(null);
      }
    } catch (error) {
      // TODO: Add state to display error message to user, and use centralised logging service
      console.error("Failed to check user profile:", error);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createUserProfile = async (username: string, jobTitle: string) => {
    try {
      const response = await fetch("/api/v1/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, jobTitle }),
      });

      if (response.ok) {
        setUserProfile({ username, jobTitle });
        router.push("/profile");
        router.refresh();
      }
    } catch (error) {
      // TODO: Add state to display error message to user, and use centralised logging service
      console.error("Failed to set user profile:", error);
    }
  };

  const updateUserProfile = async (username: string, jobTitle: string) => {
    try {
      const response = await fetch("/api/v1/user", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, jobTitle }),
      });

      if (response.ok) {
        setUserProfile({ username, jobTitle });
        router.refresh();
      }
    } catch (error) {
      // TODO: Add state to display error message to user, and use centralised logging service
      console.error("Failed to update user profile:", error);
    }
  };

  const clearUserProfile = async () => {
    try {
      await fetch("/api/v1/user", { method: "DELETE" });
      setUserProfile(null);
      router.push("/profile");
      router.refresh();
    } catch (error) {
      // TODO: Add state to display error message to user, and use centralised logging service
      console.error("Failed to clear user profile:", error);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        userProfile,
        isLoading,
        createUserProfile,
        updateUserProfile,
        clearUserProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error("useUserProfile must be used within a UserProfileProvider");
  }
  return context;
}
