import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCallListStore = create(
  persist(
    (set) => ({
      callList: [],
      addToCallList: (candidate) => {
        const candidateWithStatus = { ...candidate, status: "Not Invited" };
        set((state) => {
          // Prevent duplicates based on email
          const alreadyExists = state.callList.some(
            (c) => c.userEmail === candidate.userEmail
          );
          if (alreadyExists) return { callList: state.callList };
          return { callList: [...state.callList, candidateWithStatus] };
        });
      },
      updateCandidateStatus: (email, status) => {
        set((state) => ({
          callList: state.callList.map((candidate) =>
            candidate.userEmail === email
              ? { ...candidate, status }
              : candidate
          ),
        }));
      },
      deleteCandidate: (email) => {
        set((state) => ({
          callList: state.callList.filter((candidate) => candidate.userEmail !== email),
        }));
      },
      // Rehydrate call list to remove duplicates
      rehydrateCallList: () =>
        set((state) => {
          const unique = [];
          const seen = new Set();
          for (const candidate of state.callList) {
            if (!seen.has(candidate.userEmail)) {
              seen.add(candidate.userEmail);
              unique.push(candidate);
            }
          }
          return { callList: unique };
        }),
    }),
    {
      name: 'call-list-storage', // key for localStorage
    }
  )
);
