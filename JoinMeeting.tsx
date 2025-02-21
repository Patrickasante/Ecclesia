import React, { useState } from 'react';
import { Video } from 'lucide-react';

interface JoinMeetingProps {
  onJoin: (username: string, meetingId: string) => void;
}

const JoinMeeting: React.FC<JoinMeetingProps> = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [meetingId, setMeetingId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && meetingId) {
      onJoin(username, meetingId);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-8">
          <Video className="w-12 h-12" />
          <h1 className="text-2xl font-bold ml-2">Video Conference</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <div>
            <label htmlFor="meetingId" className="block text-sm font-medium text-gray-700">
              Meeting ID
            </label>
            <input
              type="text"
              id="meetingId"
              value={meetingId}
              onChange={(e) => setMeetingId(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Join Meeting
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinMeeting;