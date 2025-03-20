export interface User {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
  stories?: Story[];
}

export interface Story{
    id: string
    created_at: string
    user: string
    title: string
}

export interface Message {
  id: string;
  created_at: string;
  story: string;
  role: string;
  content: string;
}

export interface UserDetails {
  id: string;
  username: string;
  email?: string;
}
