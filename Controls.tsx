import React from 'react';
import { useMeetingStore } from '../store/meetingStore';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Users, MessageSquare } from 'lucide-react';

const Controls: React.FC<{ onLeave: () => void }> = ({ onLeave }) => {
  const { localUser, toggleAudio, toggleVideo } = useMeetingStore();

  if (!localUser) return null;

  const handleAudioToggle = () => {
    toggleAudio(localUser.uid);
  };

  const handleVideoToggle = () => {
    toggleVideo(localUser.uid);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-center space-x-4">
        <button
          onClick={handleAudioToggle}
          className={`p-4 rounded-full ${
            localUser.isAudioEnabled ? 'bg-white text-black' : 'bg-red-600 text-white'
          }`}
        >
          {localUser.isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
        </button>

        <button
          onClick={handleVideoToggle}
          className={`p-4 rounded-full ${
            localUser.isVideoEnabled ? 'bg-white text-black' : 'bg-red-600 text-white'
          }`}
        >
          {localUser.isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
        </button>

        <button
          onClick={onLeave}
          className="p-4 rounded-full bg-red-600 text-white"
        >
          <PhoneOff size={24} />
        </button>

        <button className="p-4 rounded-full bg-white text-black">
          <Users size={24} />
        </button>

        <button className="p-4 rounded-full bg-white text-black">
          <MessageSquare size={24} />
        </button>
      </div>
    </div>
  );
};

export default Controls;