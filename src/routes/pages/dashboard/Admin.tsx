import { useMemo, useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../../contexts/AuthContext";
import { useLanguage } from "../../../contexts/LanguageContext";

import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import Avatar from "../../../components/atoms/Avatar";

import { safeRequest } from "../../../lib/auth";
import {
  deactivateUser,
  getUserByNameOrEmail,
  reactivateUser,
} from "../../../lib/axios";
import { getApiErrorMessage, toastApiError } from "../../../lib/apiErrors";

import { type User } from "../../../types/context.types";
import ModerationPanel from "./ModerationPanel";

type FetchedUser = User & {
  active: boolean;
};

type AdminSection = "users" | "moderation";

const Admin = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>("users");
  const [userInput, setUserInput] = useState<string>("");
  const [fetchedUser, setFetchedUser] = useState<FetchedUser | null>(null);

  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isActivatingUser, setIsActivatingUser] = useState(false);
  const [isDeactivatingUser, setIsDeactivatingUser] = useState(false);

  const { accessToken, setAccessToken } = useAuth();
  const { t, tr, tf } = useLanguage();

  const infoListItems = tr<string[]>("admin.infoListItems", []);
  const trimmedUserInput = useMemo(() => userInput.trim(), [userInput]);

  const canFetchUser =
    Boolean(accessToken) &&
    Boolean(trimmedUserInput) &&
    !isFetchingUser &&
    !isActivatingUser &&
    !isDeactivatingUser;

  const canReactivateUser =
    Boolean(accessToken) &&
    Boolean(fetchedUser) &&
    fetchedUser?.active === false &&
    !isFetchingUser &&
    !isActivatingUser &&
    !isDeactivatingUser;

  const canDeactivateUser =
    Boolean(accessToken) &&
    Boolean(fetchedUser) &&
    fetchedUser?.active === true &&
    !isFetchingUser &&
    !isActivatingUser &&
    !isDeactivatingUser;

  const handleRemoveFetchedUser = () => {
    if (isFetchingUser || isActivatingUser || isDeactivatingUser) return;

    setFetchedUser(null);
    setUserInput("");
  };

  const handleFetchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      toast.error(t("admin.toasts.mustBeLoggedInFetch"));
      return;
    }

    if (!trimmedUserInput || isFetchingUser || isActivatingUser || isDeactivatingUser) {
      return;
    }

    try {
      setIsFetchingUser(true);

      const res = await safeRequest(
        getUserByNameOrEmail,
        accessToken,
        setAccessToken,
        trimmedUserInput
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("admin.toasts.requestFailed"));
      }

      setFetchedUser(res.data);
      toast.success(t("admin.toasts.userFound"));
    } catch (err: any) {
      const message = getApiErrorMessage(err, t("admin.toasts.fetchFailed"));
      const status = err?.response?.status ?? err?.response?.data?.statusCode;

      if (status === 404) {
        toast.error(t("admin.toasts.userNotFound"));
      } else {
        toast.error(message);
      }
    } finally {
      setIsFetchingUser(false);
    }
  };

  const handleReactivateUser = async () => {
    if (!accessToken || !fetchedUser) {
      toast.error(t("admin.toasts.mustBeLoggedInReactivate"));
      return;
    }

    if (!canReactivateUser) return;

    try {
      setIsActivatingUser(true);

      const res = await safeRequest(
        reactivateUser,
        accessToken,
        setAccessToken,
        Number(fetchedUser.id)
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("admin.toasts.requestFailed"));
      }

      setFetchedUser(res.data);
      toast.success(
        tf("admin.toasts.userActivated", { username: fetchedUser.username })
      );
    } catch (err: any) {
      toastApiError(err, t("admin.toasts.activateFailed"));
    } finally {
      setIsActivatingUser(false);
    }
  };

  const handleDeactivateUser = async () => {
    if (!accessToken || !fetchedUser) {
      toast.error(t("admin.toasts.mustBeLoggedInDeactivate"));
      return;
    }

    if (!canDeactivateUser) return;

    try {
      setIsDeactivatingUser(true);

      const res = await safeRequest(
        deactivateUser,
        accessToken,
        setAccessToken,
        Number(fetchedUser.id)
      );

      if (res.statusCode !== 200) {
        throw new Error(res.message || t("admin.toasts.requestFailed"));
      }

      setFetchedUser(res.data);
      toast.success(
        tf("admin.toasts.userDeactivated", { username: fetchedUser.username })
      );
    } catch (err: any) {
      toastApiError(err, t("admin.toasts.deactivateFailed"));
    } finally {
      setIsDeactivatingUser(false);
    }
  };

  if (!accessToken) {
    return (
      <div className="text-center text-[var(--text1)] mt-6">
        {t("moderationAdmin.states.adminRequired")}
      </div>
    );
  }

  return (
    <div className={`container flex flex-col ${activeSection == "users" ? "sm:flex-row" : ""} gap-6 sm:justify-center sm:gap-0 sm:mt-20!`}>
      <div>
        <div className={`info-container rounded-xl! mb-5 ${activeSection === "users" ? "sm:rounded-r-none!" : ""}`}>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl my-4">{t("admin.infoHeading")}</h2>
          </div>

          <div className="px-6">
            <div className="flex flex-wrap gap-3 mb-6 justify-center sm:justify-start">
              <Button
                type="button"
                variant={activeSection === "users" ? "tertiary" : "secondary"}
                onClick={() => setActiveSection("users")}
                label={t("admin.tabs.users")}
              >
                {t("admin.tabs.users")}
              </Button>

              <Button
                type="button"
                variant={activeSection === "moderation" ? "tertiary" : "secondary"}
                onClick={() => setActiveSection("moderation")}
                label={t("admin.tabs.moderation")}
              >
                {t("admin.tabs.moderation")}
              </Button>
            </div>

            {activeSection === "users" ? (
              <ol>
                {infoListItems.map((item) => (
                  <li
                    className="list-decimal list-inside text-xl md:text-2xl mt-2"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ol>
            ) : (
              <div className="text-lg md:text-xl space-y-2">
                <p>{t("admin.moderationIntro.paragraph1")}</p>
                <p>{t("admin.moderationIntro.paragraph2")}</p>
                <p>{t("admin.moderationIntro.paragraph3")}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div data-label="input-container" className={`input-container rounded-xl! ${activeSection === "users" ? "sm:rounded-l-none!" : ""}`}>
        {activeSection === "users" ? (
          <>
            <h2 className="input-heading">{t("admin.userSection.heading")}</h2>

            <form onSubmit={handleFetchUser}>
              <Input
                id="userInput"
                label={t("admin.userSection.userInputLabel")}
                value={userInput}
                placeholder=""
                required
                onChange={(e) => {
                  setUserInput(e.target.value);
                }}
              />

              {fetchedUser && (
                <div className="relative grid place-items-center mt-8 mb-3 xl:mb-0 md:ml-auto text-[var(--text1)]">
                  <Button
                    type="button"
                    onClick={handleRemoveFetchedUser}
                    className="absolute top-0 right-0 py-0! px-1! text-xs!"
                    label={t("admin.userSection.removeFetchedUser")}
                    disabled={isFetchingUser || isActivatingUser || isDeactivatingUser}
                  >
                    X
                  </Button>

                  <Avatar size={60} avatarUrl={fetchedUser.avatar} />
                  <p className="mt-2 font-bold">{fetchedUser.username}</p>
                  <p>
                    {t("admin.userSection.statusLabel")}:{" "}
                    {fetchedUser.active
                      ? t("admin.userSection.active")
                      : t("admin.userSection.inactive")}
                  </p>
                </div>
              )}

              <div className="flex flex-col gap-4 mt-6">
                <Button
                  type="submit"
                  className="w-full mt-7"
                  label={t("admin.userSection.actions.findUser")}
                  disabled={!canFetchUser}
                >
                  {isFetchingUser
                    ? t("common.loading")
                    : t("admin.userSection.actions.findUser")}
                </Button>

                <Button
                  type="button"
                  variant="success"
                  onClick={handleReactivateUser}
                  className="w-full"
                  label={t("admin.userSection.actions.reactivateUser")}
                  disabled={!canReactivateUser}
                >
                  {isActivatingUser
                    ? t("common.loading")
                    : t("admin.userSection.actions.reactivateUser")}
                </Button>

                <Button
                  type="button"
                  variant="error"
                  onClick={handleDeactivateUser}
                  className="w-full"
                  label={t("admin.userSection.actions.deactivateUser")}
                  disabled={!canDeactivateUser}
                >
                  {isDeactivatingUser
                    ? t("common.loading")
                    : t("admin.userSection.actions.deactivateUser")}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <ModerationPanel />
        )}
      </div>
    </div>
  );
};

export default Admin;