export type ClubExecutive = { name: string; role: string };

export type ClubDataProps = {
  id: number | string;
  name: string;
  shortDescription?: string;
  mission?: string;
  history?: string;
  coreValues?: string | string[];
  memberCount?: number;
  meetingTime?: string;
  meetingLocation?: string;
  fee?: string;
  isAcceptingApplications?: boolean;
  executives?: ClubExecutive[];
  socials?: { instagram?: string; kakao?: string; youtube?: string };
  articles?: unknown[];
  gallery?: unknown[];
  [key: string]: unknown;
};
