import { useState } from "react";
import { toast } from "react-toastify";

import { useAuth } from "../../../contexts/AuthContext";
import Input from "../../../components/atoms/Input";
import Button from "../../../components/atoms/Button";
import adminContent from "../../../text-content/admin-page";
import { deactivateUser, getUserByNameOrEmail, reactivateUser } from "../../../lib/axios";
import { safeRequest } from "../../../lib/auth";
import { type User } from "../../../types/context.types";
import Avatar from "../../../components/atoms/Avatar";

type FetchedUser = User & {
  active: boolean;
};

const Admin = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [fetchedUser, setFetchedUser] = useState<FetchedUser | null>(null);

  const { accessToken, setAccessToken } = useAuth();

  const handleRemoveFetchedUser = () => {
    setFetchedUser(null);
    setUserInput("");
  };

  const handleFetchUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to fetch a user.");
      return;
    }
    try {
      const res = await safeRequest(getUserByNameOrEmail, accessToken, setAccessToken, userInput);
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      toast.success("User found!");
      setFetchedUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
      toast.error("Failed to fetch user");
    }
    console.log("Form submitted with:", { userInput });
  };

  const handleReactivateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !fetchedUser) {
      toast.error("You must be logged in to reactivate a user.");
      return;
    }
    try {
      const res = await safeRequest(reactivateUser, accessToken, setAccessToken, Number(fetchedUser.id));
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      setFetchedUser(res.data);
      toast.success(`User ${fetchedUser.username} activated!`);
    } catch (error) {
      console.error("Failed to activate user", error);
      toast.error("Failed to activate user");
    }
  };

  const handleDeactivateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !fetchedUser) {
      toast.error("You must be logged in to deactivate a user.");
      return;
    }
    try {
      const res = await safeRequest(deactivateUser, accessToken, setAccessToken, Number(fetchedUser.id));
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      setFetchedUser(res.data);
      toast.success(`User ${fetchedUser.username} deactivated!`);
    } catch (error) {
      console.error("Failed to deactivate user", error);
      toast.error("Failed to deactivate user");
    }
  };

  return (
    <div className="container inputInfo-container">
      <div>
        <div className="info-container">
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl my-4">{adminContent.infoHeading}</h2>
          </div>
          <div className="mb-10 md:mb-0 px-6">
            <ol>
              {adminContent.infoListItems.map((list) => (
                <li className="list-decimal list-inside text-xl md:text-2xl mt-2" key={list}>
                  {list}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
      <div data-label="input-container" className="input-container">
        <h2 className="input-heading">{adminContent.inputHeading}</h2>
        <form action="">
          <Input
            id="userInput"
            label="Username/Email"
            value={userInput}
            placeholder={""}
            required
            onChange={(e) => {
              const value = e.target.value;
              setUserInput(value);
            }}
          />
          {fetchedUser && (
            <div className="relative grid place-items-center mt-8 mb-3 xl:mb-0 md:ml-auto text-[var(--text1)]">
              <Button
                onClick={handleRemoveFetchedUser}
                className="absolute top-0 right-0 py-0! px-1! text-xs!"
                label="remove fetched user"
              >
                X
              </Button>
              <Avatar size={60} avatarUrl={fetchedUser?.avatar} />
              <p className="mt-2 font-bold">{fetchedUser?.username}</p>
              <p className="">{`Status: ${fetchedUser?.active ? "Active" : "Inactive"}`}</p>
            </div>
          )}
          <div className="flex flex-col gap-4 mt-6">
            <Button
              type="submit"
              onClick={handleFetchUser}
              className="w-full mt-7"
              label={adminContent.button1}
            >
              {adminContent.button1}
            </Button>
            <Button
              type="submit"
              variant="success"
              onClick={handleReactivateUser}
              className="w-full"
              label={adminContent.button2}
            >
              {adminContent.button2}
            </Button>
            <Button
              type="submit"
              variant="error"
              onClick={handleDeactivateUser}
              className="w-full"
              label={adminContent.button3}
            >
              {adminContent.button3}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
