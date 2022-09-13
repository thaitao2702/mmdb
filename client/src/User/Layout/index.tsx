import React, { useEffect, useState, useMemo } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';

import Footer from 'User/Layout/Footer';
import Header from 'User/Layout/Header';

import { useApi } from 'shared/hooks/api';
import { ApiUrl } from 'shared/config/apiUrl';
import useToast from 'shared/hooks/toast';
import { getAuthData } from 'shared/utils/auth';

import { IMovieList } from 'User/Home';

export interface IUser {
  id: number;
  name: string;
  email: string;
  movieRatings: any[];
  watchList: IMovieList;
}

export interface IUserResponse {
  success: boolean;
  data: IUser;
}

export interface IUserContext {
  isLogin: boolean;
  loading: boolean;
  userData?: IUser;
  setWatchListCount: React.Dispatch<React.SetStateAction<number>>;
}

const HomeLayout = () => {
  const auth = getAuthData();
  const isLogin = !!auth && !!auth.userId && !!auth.token;
  const [userData, setUserData] = useState<IUser>();
  const [watchListCount, setWatchListCount] = useState(0);
  const [{ loading }, getUser] = useApi('get', ApiUrl.user);
  const toast = useToast();
  const userContextData = useMemo(
    () => ({
      isLogin,
      loading,
      userData,
      setWatchListCount,
    }),
    [userData, loading],
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = (await getUser()) as IUserResponse;
        if (response.success) {
          setUserData(response.data);
          setWatchListCount(Object.keys(response.data.watchList).length);
        }
      } catch (error) {
        if (error && error.message) toast.error(error.message);
      }
    };
    if (isLogin) fetchUser();
  }, []);

  return (
    <div className="l-user-ctn">
      <Header watchListCount={watchListCount} />
      <Outlet context={userContextData} />
      <Footer />
    </div>
  );
};

export default HomeLayout;

export function useUser() {
  return useOutletContext<IUserContext>();
}
