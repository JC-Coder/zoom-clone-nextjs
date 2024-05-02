'use client';
import { useRouter } from 'next/navigation';
import { useGetCalls } from '../hooks/useGetCalls';
import { useState } from 'react';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';

const CallList = ({ type }: { type: 'upcoming' | 'ended' | 'recordings' }) => {
  const { endedCalls, isLoading, callRecordings, upcomingCalls } =
    useGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'upcoming':
        return upcomingCalls;
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'upcoming':
        return 'No upcoming calls';
      case 'ended':
        return 'No ended calls';
      case 'recordings':
        return 'No recordings';
      default:
        return '';
    }
  };

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  return (
    <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard key={index} />
        ))
      ) : (
        <h1 className="">{noCallsMessage}</h1>
      )}

      <MeetingCard />
    </div>
  );
};

export default CallList;
