export type ClubExecutive = { name: string; role: string };

export type ClubDataProps = {
  id: number | string;
  name: string;
  mission?: string;
  coreValues?: string | string[];
  memberCount?: number;
  meetingTime?: string;
  meetingLocation?: string;
  fee?: string;
  isAcceptingApplications?: boolean;
  executives?: ClubExecutive[];
  socials?: { instagram?: string; kakao?: string; youtube?: string };
  [key: string]: unknown;
};
