'use client';
import { useRouter } from 'next/navigation';
import { useGetCalls } from '@/hooks/useGetCalls';
import { useEffect, useState } from 'react';
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import MeetingCard from './MeetingCard';
import Loader from '@/components/Loader';

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

  useEffect(() => {
    const fetchRecordings = async () => {
      const callData = await Promise.all(
        callRecordings.map((meeting) => meeting.queryRecordings())
      );

      const recordings = callData
        .filter((call) => call.recordings.length > 0)
        .flatMap((call) => call.recordings);

      setRecordings(recordings);
    };

    if (type === 'recordings') fetchRecordings();
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  return (
    <div className="grid gap-5 grid-cols-1 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording, index) => (
          <MeetingCard
            key={(meeting as Call)?.id}
            title={
              (meeting as Call)?.state?.custom.description.substring(0, 25) ||
              'No description'
            }
            date={
              (meeting as Call)?.state?.startsAt?.toLocaleString() ||
              (meeting as CallRecording)?.start_time.toLocaleString()
            }
            icon={
              type === 'ended'
                ? '/icons/previous.svg'
                : type === 'upcoming'
                ? '/icons/upcoming.svg'
                : '/icons/recordings.svg'
            }
            isPreviousMeeting={type === 'ended'}
            buttonIcon1={type === 'recordings' ? '/icons/play.svg' : undefined}
            buttonText={type === 'recordings' ? 'Play' : 'Start'}
            handleClick={
              type === 'recordings'
                ? () => router.push(`${(meeting as CallRecording)?.url}`)
                : () => router.push(`/meeting/${(meeting as Call)?.id}`)
            }
            link={
              type === 'recordings'
                ? (meeting as CallRecording)?.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call)?.id
                  }`
            }
          />
        ))
      ) : (
        <h1 className="">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
