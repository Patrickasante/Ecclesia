import React from 'react';
import { useMeetingStore } from '../store/meetingStore';
import { Video } from 'lucide-react';

const VideoGrid: React.FC = () => {
  const { participants, localUser } = useMeetingStore();

  const renderParticipant = (participant: any) => {
    return (
      <div key={participant.uid} className="relative bg-gray-900 rounded-lg overflow-hidden">
        {participant.isVideoEnabled ? (
          <div className="aspect-video">
            <div id={`video-${participant.uid}`} className="w-full h-full" />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-gray-800">
            <Video className="w-16 h-16 text-gray-400" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-50">
          <p className="text-white text-sm">
            {participant.username} {participant.uid === localUser?.uid ? '(You)' : ''}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {localUser && renderParticipant(localUser)}
      {Array.from(participants.values()).map((participant) => {
        if (participant.uid !== localUser?.uid) {
          return renderParticipant(participant);
        }
        return null;
      })}
    </div>
  );
};

export default VideoGrid;