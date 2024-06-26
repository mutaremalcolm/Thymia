"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


export interface UserContextType {
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  correctAnswers: number;
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>;
  wrongAnswers: number;
  setWrongAnswers: React.Dispatch<React.SetStateAction<number>>;
  gameOver: boolean;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  gameEndReason: string;
  setGameEndReason: React.Dispatch<React.SetStateAction<string>>;
  restartGame: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [gameEndReason, setGameEndReason] = useState<string>("");
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  

  const restartGame = () => {
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setGameOver(false);
    setGameEndReason("");
    toast.success("Event Logged: Game Restarted");
  };

  const logout = () => {
    setUserName("");
    router.push("./");
    toast.success("Event Logged: Log Out Successful");
  };

  return (
    <UserContext.Provider
      value={{
        userName,
        setUserName,
        correctAnswers,
        setCorrectAnswers,
        wrongAnswers,
        setWrongAnswers,
        gameOver,
        setGameOver,
        gameEndReason,
        setGameEndReason,
        restartGame,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};
