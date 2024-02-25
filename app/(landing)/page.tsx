import { Button } from "@/components/ui/button";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-5xl text-white font-bold mb-8 animate-pulse">
        Being Conceptualized
      </h1>
      <p className="text-white text-lg mb-8">
        The landing page is currently under conceptualization and development.
        However, you have access to the backend functionalities.
      </p>
      <Link href="/dashboard">
        <Button variant="secondary">Take me there</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
