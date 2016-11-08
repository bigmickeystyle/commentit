DROP TABLE users CASCADE;
DROP TABLE links CASCADE;
DROP TABLE comments CASCADE;

CREATE TABLE users (
    id SERIAL primary key,
    username VARCHAR(25) unique not null,
    oauth VARCHAR(25),
    created TIMESTAMP DEFAULT now(),
    email VARCHAR(225),
    age INT,
    location VARCHAR(225),
    -- to filter by relevant tags:
    interests TEXT[],
    -- set equal to the URL ids bookmarked
    bookmarks TEXT[],
    -- set equal to the URL ids already upvoted
    upvotes TEXT[]
);
CREATE TABLE links (
    id SERIAL primary key,
    url TEXT not null,
    username VARCHAR(25) not null references users(username),
    created TIMESTAMP DEFAULT now(),
    siteName VARCHAR(225),
    siteType VARCHAR(50),
    headline TEXT not null,
    alt_headline TEXT,
    description TEXT,
    -- image used as the thumbnail, saved as a url
    thumbnail TEXT,
    tags TEXT[],
    upvote_count INT DEFAULT 0,
    upvoted_users TEXT[]
);
CREATE TABLE comments (
    id SERIAL primary key,
    parent_id INT,
    link_id INT not null references links(id),
    username VARCHAR(25) not null references users(username),
    comment TEXT not null,
    upvote_count INT DEFAULT 0
)
