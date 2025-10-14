import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance";
import { apiRoutes } from "../utils/apiRoute";

import { devtools, persist } from "zustand/middleware";
import { handleTryCatch } from "../utils/handleTryCatch";

const userProvider = create(
  persist(
    devtools(
      (set) => ({
        user: null,
        loading: false,

        setUser: (userData) => set({ user: userData }),
        setLoading: (isLoading) => set({ loading: isLoading }),

        setUserInformation: handleTryCatch(async () => {
          const token = localStorage.getItem("token");
          if (!token) {
            set({ user: null, loading: false });
            return;
          }

          set({ loading: true });

          const response = await axiosInstance.post(
            apiRoutes.AUTH.GET_PROFILE,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          set({ user: response.data, loading: false });
        }),

        updateUserInformation: (user) => set({ user }),
        logOut: () => {
          set({ user: null, loading: false }); // reset store state
          localStorage.removeItem("token"); // remove auth token
          userProvider.persist.clearStorage(); // clear persisted store
        },
      }),
      { name: "UserStore" } // DevTools label
    ),
    {
      name: "user-storage", // localStorage key
      partialize: (state) => ({ user: state.user }), // only persist user
    }
  )
);

export default userProvider;
