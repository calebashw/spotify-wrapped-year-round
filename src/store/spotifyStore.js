import { create } from "zustand";

const useSpotifyStore = create((set) => ({
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
}));

export default useSpotifyStore;
