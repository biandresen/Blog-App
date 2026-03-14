import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import Modal from "../../../components/molecules/Modal";
import AvatarWithBadges from "../../../components/atoms/AvatarWithBadges";

import { useUser } from "../../../contexts/UserContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";

import { deleteUser, updateUser } from "../../../lib/axios";
import { safeRequest } from "../../../lib/auth";
import { logoutAndRedirect } from "../../../lib/logout";
import { formatDateProfile } from "../../../lib/utils";
import { getApiErrorMessage, toastApiError } from "../../../lib/apiErrors";

import {
  passwordValidator,
  usernameValidator,
  emailValidator,
} from "../../../validators/auth";

import type { User } from "../../../types/context.types";

const MAX_AVATAR_SIZE = 6 * 1024 * 1024; // 6 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

const Profile = () => {
  const { user, setUser } = useUser();
  const { accessToken, setAccessToken } = useAuth();
  const { t, tf } = useLanguage();
  const navigate = useNavigate();

  // --------------------------------------------------
  // Local UI state
  // --------------------------------------------------
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Prevent duplicate requests
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // --------------------------------------------------
  // Form state
  // --------------------------------------------------
  const [username, setUsername] = useState<string>(user?.username || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);

  // --------------------------------------------------
  // Validation / inline error state
  // --------------------------------------------------
  const [input1Valid, setInput1Valid] = useState<boolean>(true);
  const [errorMsg1, setErrorMsg1] = useState<string>("");

  const [input2Valid, setInput2Valid] = useState<boolean>(true);
  const [errorMsg2, setErrorMsg2] = useState<string>("");

  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string>("");

  // --------------------------------------------------
  // Derived state
  // --------------------------------------------------
  const invalidForm =
    !input1Valid ||
    !input2Valid ||
    passwordErrors.length > 0 ||
    !!avatarError ||
    !username ||
    !email;

  // --------------------------------------------------
  // Keep form values in sync if user context changes
  // Useful after successful profile update
  // --------------------------------------------------
  useEffect(() => {
    setUsername(user?.username || "");
    setEmail(user?.email || "");
  }, [user?.username, user?.email]);

  // --------------------------------------------------
  // Clean up object URL previews to avoid memory leaks
  // --------------------------------------------------
  useEffect(() => {
    return () => {
      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // --------------------------------------------------
  // Logout
  // --------------------------------------------------
  const handleLogout = () => {
    if (isSubmitting || isDeleting) return;
    logoutAndRedirect({ setUser, setAccessToken, navigate });
  };

  // --------------------------------------------------
  // Open delete confirmation modal
  // --------------------------------------------------
  const handleDeleteButton = () => {
    if (isSubmitting || isDeleting) return;
    setShowModal(true);
  };

  // --------------------------------------------------
  // Delete profile (soft delete / delete endpoint)
  // --------------------------------------------------
  const handleDeleteProfile = async () => {
    if (isDeleting) return;

    try {
      if (!accessToken || !user?.id) return;

      setIsDeleting(true);

      const res = await safeRequest(
        deleteUser,
        accessToken,
        setAccessToken,
        Number(user.id)
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("profile.toasts.deleteFailed"));
      }

      toast.success(t("profile.toasts.deleteSuccess"));
      setUser(null);
      setAccessToken(null);
      navigate("/login");
    } catch (err: any) {
      toastApiError(err, t("profile.toasts.deleteFailed"));
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  // --------------------------------------------------
  // Update profile
  // Uses form onSubmit to avoid submit/onClick duplication issues
  // --------------------------------------------------
  const handleUpdateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (invalidForm || isSubmitting) return;
    if (!accessToken || !user?.id) return;

    const updates: Record<string, unknown> = {
      username: username.trim(),
      email: email.trim(),
    };

    if (password.trim().length > 0) {
      updates.password = password;
    }

    if (avatar) {
      updates.avatar = avatar;
    }

    try {
      setIsSubmitting(true);

      const res = await safeRequest(
        updateUser,
        accessToken,
        setAccessToken,
        Number(user.id),
        updates
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("profile.toasts.updateFailed"));
      }

      setUser(res.data);
      setPassword("");
      setPasswordErrors([]);

      if (avatarPreview) {
        URL.revokeObjectURL(avatarPreview);
      }

      setAvatar(null);
      setAvatarPreview(null);
      setAvatarError("");

      toast.success(t("profile.toasts.updateSuccess"));
    } catch (err: any) {
      const message = getApiErrorMessage(err, t("profile.toasts.updateFailed"));

      if (err?.response?.data?.message === "File too large") {
        toast.error(t("profile.toasts.avatarTooLarge"));
        return;
      }

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container inputInfo-container">
      <Modal
        isOpen={showModal}
        title={t("profile.modal.title")}
        message={t("profile.modal.message")}
        confirmText={isDeleting ? t("common.loading") : t("profile.modal.confirmText")}
        cancelText={t("profile.modal.cancelText")}
        onConfirm={handleDeleteProfile}
        onCancel={() => {
          if (isDeleting) return;
          setShowModal(false);
        }}
      />

      <div>
        <div className="info-container flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-4xl font-bold">{t("profile.infoHeading")}</h2>

            <AvatarWithBadges
              size={80}
              avatarUrl={user?.avatar}
              username={user?.username}
              user={user as User}
            />
          </div>

          <dl className="mt-6 grid gap-y-3 text-lg md:text-xl">
            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.bestDailyStreak")}</dt>
              <dd className="font-bold break-all text-right">{user?.dailyJokeBestStreak}</dd>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.username")}</dt>
              <dd className="font-bold break-all text-right">{user?.username}</dd>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.email")}</dt>
              <dd className="font-bold break-all text-right">{user?.email}</dd>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.role")}</dt>
              <dd className="font-bold text-right">{user?.role}</dd>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.created")}</dt>
              <dd className="font-bold text-right">{formatDateProfile(user?.createdAt)}</dd>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.updated")}</dt>
              <dd className="font-bold text-right">{formatDateProfile(user?.updatedAt)}</dd>
            </div>

            <div className="my-2 border-t border-white/10" />

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.termsAccepted")}</dt>
              <dd className="font-bold text-right">{formatDateProfile(user?.termsAcceptedAt)}</dd>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-start gap-x-6">
              <dt className="opacity-70">{t("profile.facts.termsVersion")}</dt>
              <dd className="font-bold text-right">
                {user?.termsVersion ?? t("profile.facts.notAvailable")}
              </dd>
            </div>
          </dl>

          <div className="mt-auto pt-6 flex flex-col gap-4">
            <Button
              type="button"
              variant="secondary"
              onClick={handleLogout}
              className="w-full"
              label={t("profile.actions.logout")}
              disabled={isSubmitting || isDeleting}
            >
              {t("profile.actions.logout")}
            </Button>

            <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
              <p className="text-sm opacity-80 mb-3">{t("profile.deleteBox.text")}</p>
              <Button
                type="button"
                variant="error"
                onClick={handleDeleteButton}
                className="w-full"
                label={t("profile.actions.deleteProfile")}
                disabled={isSubmitting || isDeleting}
              >
                {isDeleting ? t("common.loading") : t("profile.actions.deleteProfile")}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="input-container">
        <h2 className="input-heading">{t("profile.inputHeading")}</h2>

        <form onSubmit={handleUpdateUser} className="flex flex-col h-[88%]">
          <div>
            <Input
              id="username"
              label={t("profile.fields.username")}
              value={username}
              errorMsg={errorMsg1}
              placeholder=""
              required
              inputValid={input1Valid}
              onChange={(e) => {
                const value = e.target.value;
                setUsername(value);

                const validationKey = usernameValidator(value);
                setInput1Valid(!validationKey);
                setErrorMsg1(validationKey ? t(validationKey) : "");
              }}
            />

            <Input
              id="email"
              type="email"
              label={t("profile.fields.email")}
              value={email}
              errorMsg={errorMsg2}
              placeholder=""
              required
              inputValid={input2Valid}
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);

                const validationKey = emailValidator(value);
                setInput2Valid(!validationKey);
                setErrorMsg2(validationKey ? t(validationKey) : "");
              }}
            />

            <div className="flex flex-col relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                label={t("profile.fields.password")}
                value={password}
                placeholder={t("profile.placeholders.password")}
                inputValid={passwordErrors.length === 0}
                onChange={(e) => {
                  const value = e.target.value;
                  setPassword(value);
                  setPasswordErrors(passwordValidator(value));
                }}
              />

              <Button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                label={showPassword ? "Hide password" : "Show password"}
                size="zero"
                className="bg-transparent absolute left-21 md:left-28 top-2"
                onClick={() => setShowPassword((prev) => !prev)}
                disabled={isSubmitting || isDeleting}
              >
                {showPassword ? (
                  <FaEye size={20} className="text-[var(--text1)]" />
                ) : (
                  <FaEyeSlash size={20} className="text-[var(--text1)]" />
                )}
              </Button>
            </div>

            {passwordErrors.length > 0 && (
              <ul className="text-[0.9rem] text-[var(--error)] my-2">
                {passwordErrors.map((message) => (
                  <li key={message}>• {t(message, message)}</li>
                ))}
              </ul>
            )}

            <Input
              id="avatar"
              type="file"
              label={t("profile.fields.avatar")}
              title={t("profile.fields.avatar")}
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (!file) {
                  if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                  }

                  setAvatar(null);
                  setAvatarPreview(null);
                  setAvatarError("");
                  return;
                }

                if (!ALLOWED_TYPES.includes(file.type)) {
                  setAvatar(null);
                  if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                  }
                  setAvatarPreview(null);
                  setAvatarError(t("profile.avatar.invalidType"));
                  return;
                }

                if (file.size > MAX_AVATAR_SIZE) {
                  setAvatar(null);
                  if (avatarPreview) {
                    URL.revokeObjectURL(avatarPreview);
                  }
                  setAvatarPreview(null);
                  setAvatarError(
                    tf("profile.avatar.tooLarge", {
                      size: String(MAX_AVATAR_SIZE / (1024 * 1024)),
                    })
                  );
                  return;
                }

                if (avatarPreview) {
                  URL.revokeObjectURL(avatarPreview);
                }

                setAvatar(file);
                setAvatarError("");
                setAvatarPreview(URL.createObjectURL(file));
              }}
            />

            <p className="text-xs text-gray-500 mb-3 mt-[-10px]">
              {tf("profile.avatar.help1", {
                size: String(MAX_AVATAR_SIZE / (1024 * 1024)),
              })}
            </p>

            <p className="text-xs text-gray-500 mb-3 mt-[-10px]">
              {t("profile.avatar.help2")}
            </p>

            {avatarPreview && (
              <img
                src={avatarPreview}
                alt={t("profile.avatar.previewAlt")}
                className="rounded-full w-20 h-20 object-cover"
              />
            )}

            {avatarError && <p className="text-red-500">{avatarError}</p>}
          </div>

          <Button
            type="submit"
            variant="tertiary"
            className="w-full mt-auto"
            label={t("profile.actions.update")}
            disabled={invalidForm || isSubmitting || isDeleting}
          >
            {isSubmitting ? t("common.loading") : t("profile.actions.update")}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;