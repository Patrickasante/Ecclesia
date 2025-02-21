import { create } from 'zustand';
import { MeetingState, Participant } from '../types/meeting';

export const useMeetingStore = create<MeetingState>((set) => ({
  participants: new Map(),
  localUser: null,
  isHost: false,
  meetingId: '',

  addParticipant: (participant) =>
    set((state) => ({
      participants: new Map(state.participants).set(participant.uid, participant),
    })),

  removeParticipant: (uid) =>
    set((state) => {
      const newParticipants = new Map(state.participants);
      newParticipants.delete(uid);
      return { participants: newParticipants };
    }),

  setLocalUser: (user) => set({ localUser: user }),

  toggleVideo: (uid) =>
    set((state) => {
      const participants = new Map(state.participants);
      const participant = participants.get(uid);
      if (participant) {
        participants.set(uid, {
          ...participant,
          isVideoEnabled: !participant.isVideoEnabled,
        });
      }
      return { participants };
    }),

  toggleAudio: (uid) =>
    set((state) => {
      const participants = new Map(state.participants);
      const participant = participants.get(uid);
      if (participant) {
        participants.set(uid, {
          ...participant,
          isAudioEnabled: !participant.isAudioEnabled,
        });
      }
      return { participants };
    }),

  setMeetingId: (id) => set({ meetingId: id }),
  setIsHost: (isHost) => set({ isHost }),
}));