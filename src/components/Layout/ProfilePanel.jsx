import { useEffect, useState } from "react";
import { X, LogOut, Upload, Eye, EyeOff } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout, updatePassword, updateProfile } from "../../store/slices/authSlice";
import { toggleAuthPopup } from "../../store/slices/popupSlice";

const ProfilePanel = () => {
  const dispatch = useDispatch()
  const { isAuthPopupOpen } = useSelector(state => state.popup)
  const { authUser, isUpdatingProfile, isUpdatingPassword } = useSelector(state => state.auth)
  const [name, setName] = useState(authUser?.name || "")
  const [email, setEmail] = useState(authUser?.email || "")
  const [avatar, setAvatar] = useState(null)

  useEffect(() => {
    if (authUser) {
      setName(authUser.name || "")
      setEmail(authUser.email || "")
    }
  }, [authUser])

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("name", name)
    formData.append("email", email)
    if (avatar) formData.append("avatar", avatar)
    dispatch(updateProfile(formData))
  }

  const handleUpdatePassword = () => {
    const formData = new FormData()
    formData.append("currentPassword", currentPassword)
    formData.append("newPassword", newPassword)
    formData.append("confirmNewPassword", confirmNewPassword)
    dispatch(updatePassword(formData))
  }

  if (!isAuthPopupOpen || !authUser) return null

  return <>
    {/* overlay */}
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => dispatch(toggleSidebar())} />

    {/* profile panel */}
    <div className="fixed right-0 top-0 h-full w-96 z-50 glass-panel animate-slide-in-right overflow-y-auto">
      <div className="flex items-center justify-between p-6 border-b border-[hsla(var(--glass-border))]">
        <h2 className="text-xl font-semibold text-primary">Profile</h2>
        <button onClick={() => dispatch(toggleAuthPopup())} className="p-2 rounded-lg glass-card hover:glow-on-hover animate-smooth">
          <X className="w-5 h-5 text-primary" />
        </button>
      </div>
      <div className="p-6">
        {/* avatar, basic info */}
        <div className="text-center mb-6">
          <img src={authUser?.avatar?.url || "/avatar-holder.avif"} alt={authUser?.name} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-primary object-cover" />
          <h3 className="text-lg font-semibold text-foreground">{authUser?.name}</h3>
          <p className="text-muted-foreground">{authUser?.email}</p>
        </div>
      </div>
    </div>
  </>;
};

export default ProfilePanel;
