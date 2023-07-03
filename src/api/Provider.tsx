import axios from "axios";
import React, { Dispatch, ReactNode, SetStateAction, useState } from "react";

const makeRequest = (query: string, token: string) => {
  return axios.post(
    `https://api.github.com/graphql`,
    {
      query: query,
    },
    {
      headers: {
        Authorization: `bearer ${token}`.replace(/["']/g, ""),
      },
    }
  );
};

export const GraphqlClientContext = React.createContext(makeRequest);

export type StoreType = {
  tokenStore: {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
  };
};

export const StoreContext = React.createContext<StoreType | null>(null);

const Provider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState("");

  const store = {
    tokenStore: {
      token,
      setToken,
    },
  };

  return (
    <StoreContext.Provider value={store}>
      <GraphqlClientContext.Provider value={makeRequest}>
        {children}
      </GraphqlClientContext.Provider>
    </StoreContext.Provider>
  );
};

export default Provider;
