import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface AuthCallbackProps {
  onSuccess: () => void;
}

const AuthCallback = ({ onSuccess }: AuthCallbackProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      console.error("Auth error:", error);
      navigate("/?error=" + error, { replace: true });
    } else {
      // Cookie is already set by backend, just call onSuccess
      onSuccess();
      navigate("/", { replace: true });
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
