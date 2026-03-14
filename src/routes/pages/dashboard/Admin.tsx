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

type FetchedUser = User & {
  active: boolean;
};

const Admin = () => {
  // --------------------------------------------------
  // Local state
  // --------------------------------------------------
  const [userInput, setUserInput] = useState<string>("");
  const [fetchedUser, setFetchedUser] = useState<FetchedUser | null>(null);

  // Separate loading states for each admin action.
  // This prevents duplicate requests and overlapping actions.
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [isActivatingUser, setIsActivatingUser] = useState(false);
  const [isDeactivatingUser, setIsDeactivatingUser] = useState(false);

  const { accessToken, setAccessToken } = useAuth();
  const { t, tr, tf } = useLanguage();

  const infoListItems = tr<string[]>("admin.infoListItems", []);

  // --------------------------------------------------
  // Derived state
  // --------------------------------------------------
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

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  const handleRemoveFetchedUser = () => {
    // Do not allow local reset while a request is running
    if (isFetchingUser || isActivatingUser || isDeactivatingUser) return;

    setFetchedUser(null);
    setUserInput("");
  };

  // --------------------------------------------------
  // Fetch user by username or email
  // --------------------------------------------------
  const handleFetchUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      toast.error(t("admin.mustBeLoggedInFetch"));
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
        throw new Error(res.message || t("admin.requestFailed"));
      }

      setFetchedUser(res.data);
      toast.success(t("admin.userFound"));
    } catch (err: any) {
        const message = getApiErrorMessage(err, t("admin.fetchFailed"));
        const status = err?.response?.status ?? err?.response?.data?.statusCode;

        if (status === 404) {
          toast.error(t("admin.userNotFound"));
        } else {
          toast.error(message);
        }
    } finally {
      setIsFetchingUser(false);
    }
  };

  // --------------------------------------------------
  // Reactivate selected user
  // --------------------------------------------------
  const handleReactivateUser = async () => {
    if (!accessToken || !fetchedUser) {
      toast.error(t("admin.mustBeLoggedInReactivate"));
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
        throw new Error(res.message || t("admin.requestFailed"));
      }

      setFetchedUser(res.data);
      toast.success(tf("admin.userActivated", { username: fetchedUser.username }));
    } catch (err: any) {
      toastApiError(err, t("admin.activateFailed"));
    } finally {
      setIsActivatingUser(false);
    }
  };

  // --------------------------------------------------
  // Deactivate selected user
  // --------------------------------------------------
  const handleDeactivateUser = async () => {
    if (!accessToken || !fetchedUser) {
      toast.error(t("admin.mustBeLoggedInDeactivate"));
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
        throw new Error(res.message || t("admin.requestFailed"));
      }

      setFetchedUser(res.data);
      toast.success(tf("admin.userDeactivated", { username: fetchedUser.username }));
    } catch (err: any) {
      toastApiError(err, t("admin.deactivateFailed"));
    } finally {
      setIsDeactivatingUser(false);
    }
  };

  return (
    <div className="container inputInfo-container">
      <div>
        <div className="info-container">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl my-4">{t("admin.infoHeading")}</h2>
          </div>

          <div className="mb-10 md:mb-0 px-6">
            <ol>
              {infoListItems.map((item) => (
                <li className="list-decimal list-inside text-xl md:text-2xl mt-2" key={item}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div data-label="input-container" className="input-container">
        <h2 className="input-heading">{t("admin.inputHeading")}</h2>

        {/*
          This form is only responsible for fetching a user.
          Reactivate/deactivate are separate button actions, not form submits.
        */}
        <form onSubmit={handleFetchUser}>
          <Input
            id="userInput"
            label={t("admin.userInputLabel")}
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
                label={t("admin.removeFetchedUser")}
                disabled={isFetchingUser || isActivatingUser || isDeactivatingUser}
              >
                X
              </Button>

              <Avatar size={60} avatarUrl={fetchedUser.avatar} />
              <p className="mt-2 font-bold">{fetchedUser.username}</p>
              <p>
                {t("admin.statusLabel")}:{" "}
                {fetchedUser.active ? t("admin.active") : t("admin.inactive")}
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4 mt-6">
            <Button
              type="submit"
              className="w-full mt-7"
              label={t("admin.button1")}
              disabled={!canFetchUser}
            >
              {isFetchingUser ? t("common.loading") : t("admin.button1")}
            </Button>

            <Button
              type="button"
              variant="success"
              onClick={handleReactivateUser}
              className="w-full"
              label={t("admin.button2")}
              disabled={!canReactivateUser}
            >
              {isActivatingUser ? t("common.loading") : t("admin.button2")}
            </Button>

            <Button
              type="button"
              variant="error"
              onClick={handleDeactivateUser}
              className="w-full"
              label={t("admin.button3")}
              disabled={!canDeactivateUser}
            >
              {isDeactivatingUser ? t("common.loading") : t("admin.button3")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;