create table league (
    league_id uuid primary key,
    name text not null,
    status boolean not null default true
)

create table team (
    team_id uuid primary key,
    league_id uuid references league(league_id) on delete cascade,
    name text not null,
    short_name varchar(5) not null,
    coach text,
    unique(league_id, name)
)

create table player (
    player_id uuid primary key,
    team_id uuid references team(team_id) on delete cascade,
    name text not null,
    position text not null,
    date_of_birth date not null,
    jersey_number integer not null,
    unique(team_id, jersey_number)
)

create table standing (
    standing_id uuid primary key,
    team_id uuid references team(team_id) on delete cascade,
    league_id uuid references league(league_id) on delete cascade,
    position integer,
    wins integer not null default 0,
    draws integer not null default 0,
    losses integer not null default 0,
    points integer not null default 0,
    games_played integer not null default 0,
    goals_for integer not null default 0,
    goals_against integer not null default 0,
    goal_difference integer not null default 0,
    unique(league_id, team_id),
    unique(league_id, position)
);

create table game (
    game_id uuid primary key,
    league_id uuid references league(league_id) on delete cascade,
    home_team_id uuid references team(team_id) on delete cascade,
    away_team_id uuid references team(team_id) on delete cascade,
    date date not null,
    matchday integer not null,
    status text not null default 'scheduled' -- scheduled, completed
)

create table score (
    score_id uuid primary key,
    game_id uuid references game(game_id) on delete cascade,
    home_team_score integer not null,
    away_team_score integer not null
)

