import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PublicUser } from "@shared/model/public-user.js";

interface UserContextType {
  user: PublicUser | null;
  setUser: (user: PublicUser | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PublicUser | null>(null);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:3080/auth/me", { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      const data = await res.json();
      setUser(data.user ?? null);
    } catch {
      setUser(null);
    }
  };
  fetchUser();
}, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
