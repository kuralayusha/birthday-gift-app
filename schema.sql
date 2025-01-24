create table birthdays (
  id uuid default uuid_generate_v4() primary key,
  sender_name text not null,
  recipient_name text not null,
  birth_date timestamp with time zone not null,
  target_age integer not null,
  created_at timestamp with time zone default now()
); 