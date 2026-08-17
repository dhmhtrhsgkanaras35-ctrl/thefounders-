export type Profile = {
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  location?: string;
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
  country?: string;
  joinedAt?: string;
  profileViews?: number;
  followers?: number;
};

export type MessageItem = {
  id: string;
  content: string;
  timestamp: string;
  reactions: Record<string, number>;
  author: Profile;
  image?: string;
  links?: string[];
};

export type ProfileForm = {
  photo: string;
  fullName: string;
  username: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  country: string;
};

export type CountryEntry = {
  country: string;
  flag: string;
  status: "open" | "waitlist";
  current: number;
  target: number;
  description: string;
};
