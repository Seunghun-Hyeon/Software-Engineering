export type ClubCategory =
  | 'Academic'
  | 'Engineering'
  | 'Speech'
  | 'Arts'
  | 'Business'
  | 'Social'
  | 'Music'
  | 'Science'
  | string;

export interface Club {
  id: string | number;
  name: string;
  category: ClubCategory;
  description: string;
  isActive: boolean;
  coverImageUrl?: string;
  logoUrl?: string;
}

export interface ClubFiltersState {
  searchQuery: string;
  category: string;
  status: 'All' | 'Currently Recruiting';
  // Add more filter fields here as backend supports them
}
