export type Position = {
  id: number;
  title: string;
  badge_color: string;
};

export type Profile = {
  id: string;
  full_name: string;
  club_position_id: number | null;
};

export type Reply = {
  id: string;
  question_id: string;
  parent_reply_id: string | null;

  content: string;

  likes: number;

  created_at: string;

  is_solution: boolean;

  likedByMe?: boolean;

  profiles: Profile | null;
};

export type Question = {
  id: string;

  title: string;

  slug: string;

  description: string;

  content: string;

  category: string;

  status: string;

  pinned: boolean;

  featured: boolean;

  locked: boolean;

  views: number;

  likes: number;

  created_at: string;

  profiles: Profile | null;

  question_replies: Reply[];
};