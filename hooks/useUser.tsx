import { createContext, useContext, useEffect, useState } from "react";

import { Subscription, UserDetails } from "@/types";
import { User } from "@supabase/auth-helpers-nextjs";

import {
  useSessionContext,
  useUser as useSupaUser,
} from "@supabase/auth-helpers-react";

type userContextType = {
  accessToken: string | null;
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<userContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}

export const MyUserContextProvider = (props: Props) => {
  const {
    session,
    isLoading: isLoadingUser,
    supabaseClient: supabase,
  } = useSessionContext();

  const user = useSupaUser();
  const accessToken = session?.access_token ?? null;
  const [isLoadingData, setIsLoadingData] = useState(false);

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const getUserDetails = supabase.from("users").select("*").single();
  const getSubscription = supabase
    .from("subscription")
    .select("*,prices(*,products(*))")
    .in("status", ["trailing", "active"])
    .single();

  useEffect(() => {
    if (user && !isLoadingData && !userDetails && !subscription) {
      setIsLoadingData(true);
      Promise.allSettled([getUserDetails, getSubscription]).then((results) => {
        const userDetailsPromise = results[0];
        const subScriptionPromise = results[1];

        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }
        if (subScriptionPromise.status === "fulfilled") {
          setSubscription(subScriptionPromise.value.data as Subscription);
        }
        setIsLoadingData(false);
      });
    } else if (!user && !isLoadingData && !isLoadingUser) {
      setUserDetails(null);
      setSubscription(null);
    }
  }, [user, isLoadingData]);

  const value = {
    accessToken,
    user,
    userDetails,
    isLoading: isLoadingUser || isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be be used within my User Context Provider");
  }

  return context;
};
