import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface AuthCallbackProps {
  onSuccess: (token: string) => void;
}

const AuthCallback = ({ onSuccess }: AuthCallbackProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      // Save token to localStorage
      localStorage.setItem("token", token);
      onSuccess(token);
      // Redirect to home
      navigate("/", { replace: true });
    } else if (error) {
      console.error("Auth error:", error);
      // Redirect to login with error
      navigate("/login?error=" + error, { replace: true });
    }
  }, [searchParams, navigate, onSuccess]);

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <p className="mt-4 text-gray-400">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
