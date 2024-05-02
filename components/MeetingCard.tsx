import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const MeetingCard = () => {
  return (
    <div className="bg-dark-1 flex flex-col justify-between gap-5 w-full h-[230px] p-6 text-white">
      <Image src="/icons/upcoming.svg" width={24} height={24} alt="icon" />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">
          Team Sync: Sprint Planning & Updates
        </h1>
        <p className="text-lead text-normal">March 15, 2024 - 11:00 AM</p>
      </div>

      <div className="flex items-between">
        <div></div>
        <div className='flex gap-2 w-full'>
          <Button className="bg-blue-1 w-full focus-visible:ring-0 focus-visible:ring-offset-0">
            Start
          </Button>
          <Button className="bg-dark-3 w-full focus-visible:ring-0 focus-visible:ring-offset-0">
            <Image
              src="/icons/copy.svg"
              alt="button icon"
              width={13}
              height={13}
            />{' '}
            &nbsp; Copy Invitation
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeetingCard;
