export interface Participant {
  uid: string;
  videoTrack?: any;
  audioTrack?: any;
  username: string;
  isVideoEnabled: boolean;
  isAudioEnabled: boolean;
}

export interface MeetingState {
  participants: Map<string, Participant>;
  localUser: Participant | null;
  isHost: boolean;
  meetingId: string;
  addParticipant: (participant: Participant) => void;
  removeParticipant: (uid: string) => void;
  setLocalUser: (user: Participant) => void;
  toggleVideo: (uid: string) => void;
  toggleAudio: (uid: string) => void;
  setMeetingId: (id: string) => void;
  setIsHost: (isHost: boolean) => void;
}