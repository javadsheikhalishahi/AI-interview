import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCallListStore = create(
  persist(
    (set) => ({
      callList: [],
      candidateDates: {},

      addToCallList: (candidate, status = "Not Invited") => {
        const candidateWithStatus = { ...candidate, status };
        set((state) => {
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
      // ✅ Add this method to store callId
      updateCallId: (email, callId) => {
        set((state) => ({
          callList: state.callList.map((candidate) =>
            candidate.userEmail === email
              ? { ...candidate, callId }
              : candidate
          ),
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
        updateScheduledTime: (email, scheduledTime) => {
          set((state) => ({
            callList: state.callList.map((candidate) =>
              candidate.userEmail === email
                ? { ...candidate, scheduledTime }
                : candidate
            ),
          }));
        },
        setScheduledTime: (email, time) =>
          set((state) => ({
            callList: state.callList.map((candidate) =>
              candidate.userEmail === email
                ? { ...candidate, scheduledTime: time }
                : candidate
            ),
          })),
          setCandidateDate: (email, date) =>
            set((state) => ({
              candidateDates: { ...state.candidateDates, [email]: date },
            })),
            
            scheduledTimes: {},
setScheduledTime: (email, time) =>
  set((state) => ({
    scheduledTimes: { ...state.scheduledTimes, [email]: time },
  })),
    }),
    {
      name: 'call-list-storage',
    }
  )
);
