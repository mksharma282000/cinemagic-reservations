import { useClerk } from "@clerk/clerk-react";
import { Button } from "./button";
export const SignOutButton = () => {
    const { signOut } = useClerk();
  
    const handleSignOut = () => {
      signOut({ redirectUrl: '/' }); // Redirect to login page after sign out
    };
  
    return (
      <button className="bg-white px-6 py-2 rounded hover:bg-slate-200" onClick={handleSignOut}>
        Sign Out
      </button>
    );
  };