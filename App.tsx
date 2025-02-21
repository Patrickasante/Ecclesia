import React, { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import { createClient, createMicrophoneAndCameraTracks } from 'agora-rtc-react';
import { useMeetingStore } from './store/meetingStore';
import VideoGrid from './components/VideoGrid';
import Controls from './components/Controls';
import JoinMeeting from './components/JoinMeeting';

const APP_ID = ''; // You'll need to add your Agora App ID here
const client = createClient({ mode: 'rtc', codec: 'vp8', appId: APP_ID });
const { ready: tracksReady, tracks } = createMicrophoneAndCameraTracks();

function App() {
  const [inMeeting, setInMeeting] = useState(false);
  const { 
    setLocalUser,
    addParticipant,
    removeParticipant,
    setMeetingId,
    meetingId
  } = useMeetingStore();

  const handleJoinMeeting = async (username: string, roomId: string) => {
    if (!tracksReady || !tracks) return;

    try {
      await client.join(APP_ID, roomId, null, username);
      
      setLocalUser({
        uid: username,
        videoTrack: tracks[1],
        audioTrack: tracks[0],
        username,
        isVideoEnabled: true,
        isAudioEnabled: true
      });

      setMeetingId(roomId);
      setInMeeting(true);

      // Publish local tracks
      await client.publish(tracks);

      // Handle remote users
      client.on('user-published', async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        
        if (mediaType === 'video') {
          addParticipant({
            uid: user.uid as string,
            videoTrack: user.videoTrack,
            username: user.uid as string,
            isVideoEnabled: true,
            isAudioEnabled: true
          });
        }
        if (mediaType === 'audio') {
          user.audioTrack?.play();
        }
      });

      client.on('user-unpublished', (user, mediaType) => {
        if (mediaType === 'video') {
          removeParticipant(user.uid as string);
        }
      });

      client.on('user-left', (user) => {
        removeParticipant(user.uid as string);
      });

    } catch (error) {
      console.error('Error joining meeting:', error);
    }
  };

  const handleLeaveMeeting = async () => {
    tracks?.[0].close();
    tracks?.[1].close();
    await client.leave();
    setInMeeting(false);
  };

  useEffect(() => {
    return () => {
      // Remove specific event listeners instead of using removeAllListeners
      client.off('user-published');
      client.off('user-unpublished');
      client.off('user-left');
      
      // Close tracks if they exist
      if (tracks) {
        tracks[0].close();
        tracks[1].close();
      }
    };
  }, []);

  if (!inMeeting) {
    return <JoinMeeting onJoin={handleJoinMeeting} />;
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-4">
        <VideoGrid />
      </div>
      <Controls onLeave={handleLeaveMeeting} />
    </div>
  );
}

export default App;