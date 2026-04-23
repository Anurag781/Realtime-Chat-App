import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden pt-24 lg:pt-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-6rem)]">
        {/* Left Side - Login */}
        <div className="flex items-start lg:items-center justify-center px-6 pb-10 sm:px-10 lg:px-14">
          <div className="w-full max-w-md">
            {/* Glass Card */}
            <div className="rounded-3xl border border-white/10 bg-base-100/85 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.16)] p-8 sm:p-10 transition-all duration-300 hover:shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
                  <MessageSquare className="size-7" />
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                  Welcome Back
                </h1>

                <p className="mt-3 text-base-content/60 text-sm sm:text-base">
                  Sign in to continue your conversations
                </p>
              </div>

              {/* Badges */}
              <div className="mb-6 flex items-center justify-center gap-2 flex-wrap">
                <div className="badge badge-outline gap-1 px-3 py-3">
                  <ShieldCheck className="size-3.5" />
                  Secure Login
                </div>

                <div className="badge badge-outline gap-1 px-3 py-3">
                  <Sparkles className="size-3.5" />
                  Premium Chat
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text font-medium">Email</span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="size-5 text-base-content/40" />
                    </div>

                    <input
                      type="email"
                      className="input input-bordered w-full pl-12 h-14 rounded-2xl bg-base-100/70 focus:outline-none focus:border-primary"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="form-control">
                  <label className="label pb-2">
                    <span className="label-text font-medium">Password</span>
                  </label>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="size-5 text-base-content/40" />
                    </div>

                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-12 pr-12 h-14 rounded-2xl bg-base-100/70 focus:outline-none focus:border-primary"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          password: e.target.value,
                        })
                      }
                    />

                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="size-5 text-base-content/40 hover:text-primary transition-colors" />
                      ) : (
                        <Eye className="size-5 text-base-content/40 hover:text-primary transition-colors" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="btn w-full h-14 rounded-2xl border-0 bg-gradient-to-r from-primary to-secondary text-white text-base shadow-lg hover:scale-[1.01] transition-all"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-7 text-center">
                <p className="text-base-content/60">
                  Don&apos;t have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold text-primary hover:underline"
                  >
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="hidden lg:flex items-center justify-center px-10 pb-10">
          <AuthImagePattern
            title={"Welcome back!"}
            subtitle={
              "Sign in to continue your conversations and catch up with your messages."
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;