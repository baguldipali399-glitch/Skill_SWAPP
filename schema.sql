-- USERS
create table users (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) not null,
    email varchar(255) unique not null,
    department varchar(100),
    year integer,
    bio text,
    avatar_url text,
    credit_balance integer default 10,
    created_at timestamp default now()
);

-- SKILLS
create table skills (
    id uuid primary key default gen_random_uuid(),
    name varchar(100) unique not null,
    category varchar(100)
);

-- USER SKILLS
create table user_skills (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    skill_id uuid references skills(id) on delete cascade,
    type varchar(10) check (type in ('teach', 'learn')),
    level varchar(30)
);

-- SWAP REQUESTS
create table swap_requests (
    id uuid primary key default gen_random_uuid(),
    requester_id uuid references users(id) on delete cascade,
    provider_id uuid references users(id) on delete cascade,
    skill_id uuid references skills(id),
    status varchar(20) default 'pending'
        check (status in ('pending', 'accepted', 'declined')),
    created_at timestamp default now()
);

-- SESSIONS
create table sessions (
    id uuid primary key default gen_random_uuid(),
    swap_request_id uuid references swap_requests(id) on delete cascade,
    scheduled_at timestamp,
    duration_mins integer default 60,
    status varchar(20) default 'scheduled'
        check (status in (
            'scheduled',
            'completed',
            'no_show',
            'cancelled'
        )),
    meeting_link text
);

-- CREDIT TRANSACTIONS
create table credit_transactions (
    id uuid primary key default gen_random_uuid(),
    user_id uuid references users(id) on delete cascade,
    session_id uuid references sessions(id),
    amount integer not null,
    type varchar(10) check (type in ('earned', 'spent')),
    created_at timestamp default now()
);

-- RATINGS
create table ratings (
    id uuid primary key default gen_random_uuid(),
    session_id uuid references sessions(id) on delete cascade,
    rated_by uuid references users(id),
    rated_user uuid references users(id),
    stars integer check (stars between 1 and 5),
    feedback_text text,
    created_at timestamp default now()
);
