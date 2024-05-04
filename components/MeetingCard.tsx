import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  title,
  date,
  icon,
  isPreviousMeeting,
  buttonIcon1,
  buttonText,
  handleClick,
  link
}: MeetingCardProps) => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} width={28} height={28} alt="icon" />

        <div className="flex justify-between">
          <div className="flex flex-col font-bold">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base text-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className="relative flex w-full">
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn('rounded-full', {
                absolute: index > 0
              })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>

        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              &nbsp; {buttonText}
            </Button>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: 'Link Copied'
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
    // <div className="bg-dark-1 flex flex-col justify-between gap-5 w-full h-[230px] p-6 text-white">
    //   <Image src="/icons/upcoming.svg" width={24} height={24} alt="icon" />

    //   <div className="flex flex-col gap-2">
    //     <h1 className="text-2xl font-bold">
    //       Team Sync: Sprint Planning & Updates
    //     </h1>
    //     <p className="text-lead text-normal">March 15, 2024 - 11:00 AM</p>
    //   </div>

    //   <div className="flex items-between">
    //     <div></div>
    //     <div className="flex gap-2 w-full">
    //       <Button className="bg-blue-1 w-full focus-visible:ring-0 focus-visible:ring-offset-0">
    //         Start
    //       </Button>
    //       <Button className="bg-dark-3 w-full focus-visible:ring-0 focus-visible:ring-offset-0">
    //         <Image
    //           src="/icons/copy.svg"
    //           alt="button icon"
    //           width={13}
    //           height={13}
    //         />{' '}
    //         &nbsp; Copy Invitation
    //       </Button>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MeetingCard;
