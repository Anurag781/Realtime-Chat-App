import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Camera,
  Mail,
  User,
  ShieldCheck,
  Sparkles,
  CalendarDays,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-base-200 relative overflow-hidden pt-24 lg:pt-28">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-10">
        {/* Back Button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-2 px-4 h-11 rounded-xl bg-base-100 border border-base-300 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">
              Back to Home
            </span>
          </button>
        </div>

        {/* Main Card */}
        <div className="rounded-3xl border border-white/10 bg-base-100/85 backdrop-blur-2xl shadow-[0_25px_80px_rgba(0,0,0,0.16)] p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white shadow-lg">
              <User className="size-7" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              My Profile
            </h1>

            <p className="mt-3 text-base-content/60 text-sm sm:text-base">
              Manage your personal information and account details
            </p>
          </div>

          {/* Badges */}
          <div className="mb-8 flex items-center justify-center gap-2 flex-wrap">
            <div className="badge badge-outline gap-1 px-3 py-3">
              <ShieldCheck className="size-3.5" />
              Secure Account
            </div>

            <div className="badge badge-outline gap-1 px-3 py-3">
              <Sparkles className="size-3.5" />
              Premium Profile
            </div>
          </div>

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4 mb-10">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="size-32 sm:size-36 rounded-full object-cover border-4 border-primary/20 shadow-lg"
              />

              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-1 right-1
                  bg-gradient-to-r from-primary to-secondary
                  text-white p-3 rounded-full cursor-pointer
                  shadow-lg hover:scale-105 transition-all duration-200
                  ${
                    isUpdatingProfile
                      ? "animate-pulse pointer-events-none"
                      : ""
                  }
                `}
              >
                <Camera className="w-5 h-5" />

                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>

            <p className="text-sm text-base-content/60 text-center">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          {/* User Details */}
          <div className="space-y-5">
            <div>
              <div className="text-sm text-base-content/60 flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </div>

              <div className="px-4 h-14 flex items-center bg-base-200 rounded-2xl border border-base-300 font-medium">
                {authUser?.fullName}
              </div>
            </div>

            <div>
              <div className="text-sm text-base-content/60 flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>

              <div className="px-4 h-14 flex items-center bg-base-200 rounded-2xl border border-base-300 font-medium">
                {authUser?.email}
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="mt-8 rounded-3xl bg-base-200 border border-base-300 p-6">
            <h2 className="text-xl font-semibold mb-5">
              Account Information
            </h2>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between py-3 border-b border-base-300">
                <span className="flex items-center gap-2 text-base-content/70">
                  <CalendarDays className="w-4 h-4" />
                  Member Since
                </span>

                <span className="font-medium">
                  {authUser.createdAt?.split("T")[0]}
                </span>
              </div>

              <div className="flex items-center justify-between py-2">
                <span className="text-base-content/70">
                  Account Status
                </span>

                <span className="text-green-500 font-semibold">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;