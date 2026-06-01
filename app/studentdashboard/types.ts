export interface StudentProfile {
  id: string;
  name: string | null;
  email: string;
  major: string;
  avatarUrl: string;
}

export interface Application {
  id: string;
  clubName: string;
  status: 'submitted' | 'under_review' | 'interview' | 'result';
}

export interface SavedEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  category: string;
}
