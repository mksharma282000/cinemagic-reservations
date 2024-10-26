import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { MovieList } from "@/components/MovieList";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignOutButton } from "../components/ui/SignOutButton"


const Index = () => {
  const { isSignedIn, user } = useUser();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

  // If the user is not signed in, display the sign-in or sign-up form
  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-500 mb-2">MovieBox</h1>
            <p className="text-slate-700">Your premier movie booking destination</p>
          </div> 
          
          <div className="bg-white rounded-lg shadow-xl p-6">
            <Tabs value={authMode} onValueChange={(value: "signin" | "signup") => setAuthMode(value)}>
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignIn />
              </TabsContent>
              <TabsContent value="signup">
                <SignUp />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  // If the user is signed in, display the main content and sign out button
  return (
    <div className="min-h-screen bg-slate-200">
      <header className="bg-blue-500 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">MovieBox</h1>
          <div className="flex items-center gap-4">
            <span className="text-white">Welcome,</span>
            <SignOutButton /> {/* Updated SignOutButton */}
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <MovieList />
      </main>
    </div>
  );
};

export default Index;
