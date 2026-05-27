import { BentoCard } from '@/app/components/BentoCard';
import { Badge } from '@/app/components/Badge';
import { ClubFilters } from '@/app/components/ClubFilters';
import { Pagination } from '@/app/components/Pagination';

// Mock Data for demonstration
const CLUBS = [
  {
    id: 1,
    name: 'Software Engineering Club',
    category: 'Academic',
    description:
      'A community of passionate developers building software solutions for the campus.',
    isActive: true,
  },
  {
    id: 2,
    name: 'Robotics Society',
    category: 'Engineering',
    description:
      'Design, build, and program autonomous robots for national competitions.',
    isActive: true,
  },
  {
    id: 3,
    name: 'Debate Team',
    category: 'Speech',
    description:
      'Hone your public speaking and critical thinking skills on the national stage.',
    isActive: false,
  },
  {
    id: 4,
    name: 'Photography Club',
    category: 'Arts',
    description:
      'Capture the beauty of campus life and learn advanced editing techniques.',
    isActive: true,
  },
  {
    id: 5,
    name: 'Investment Group',
    category: 'Business',
    description:
      'Learn stock market analysis and manage a simulated investment portfolio.',
    isActive: false,
  },
  {
    id: 6,
    name: 'Environmental Action',
    category: 'Social',
    description: 'Leading sustainability initiatives and campus cleanups.',
    isActive: true,
  },
  {
    id: 7,
    name: 'Jazz Ensemble',
    category: 'Music',
    description:
      'Perform classic and contemporary jazz pieces at university events.',
    isActive: false,
  },
  {
    id: 8,
    name: 'Astronomy Club',
    category: 'Science',
    description: 'Weekly stargazing sessions and discussions on astrophysics.',
    isActive: true,
  },
];

export default function ClubsDirectoryPage() {
  return (
    <div className="min-h-screen py-8 md:py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-4 lg:px-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Club Finder
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-600">
            Explore and join over 100+ active student organizations. Find your
            community, build new skills, and make lasting connections.
          </p>
        </div>

        {/* Search & Filter Section */}
        <ClubFilters />

        {/* Minimalist 4-Column Split Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CLUBS.map((club) => (
            <BentoCard
              key={club.id}
              className="overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0px_15px_40px_rgba(0,0,0,0.08)]"
            >
              {/* Image Section */}
              <div className="relative h-32 w-full shrink-0 bg-gray-200">
                <img
                  src={`https://picsum.photos/seed/${club.id}/400/200`}
                  alt={`${club.name} cover`}
                  className="h-full w-full object-cover"
                />

                {/* Small Circle Logo */}
                <div className="absolute -bottom-6 left-6 h-12 w-12 rounded-full border-4 border-white bg-white shadow-sm">
                  <img
                    src={`https://picsum.photos/seed/logo${club.id}/100/100`}
                    alt={`${club.name} logo`}
                    className="h-full w-full rounded-full object-cover"
                  />
                </div>
              </div>

              {/* Text Section */}
              <div className="flex flex-grow flex-col p-6 pt-8">
                <div className="mb-4 flex items-start justify-between">
                  <Badge>{club.category}</Badge>
                  {club.isActive && <Badge variant="active">Active</Badge>}
                </div>

                <h3 className="font-display mb-2 line-clamp-1 text-xl font-semibold text-gray-900">
                  {club.name}
                </h3>

                <p className="mb-6 line-clamp-2 flex-grow text-sm text-gray-600">
                  {club.description}
                </p>

                <button className="bg-primary/10 text-primary hover:bg-primary mt-auto inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-semibold transition-colors hover:text-white">
                  View Details
                </button>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Pagination Section */}
        <Pagination currentPage={1} totalPages={5} />
      </div>
    </div>
  );
}
