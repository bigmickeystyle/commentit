DROP TABLE users CASCADE;
DROP TABLE links CASCADE;
DROP TABLE comments CASCADE;
DROP TABLE upvotes CASCADE;
DROP TABLE bookmarks CASCADE;

CREATE TABLE users (
    id SERIAL primary key,
    username VARCHAR(25) unique not null,
    oauth VARCHAR(25),
    oauth_token TEXT,
    password TEXT not null,
    created TIMESTAMP DEFAULT now(),
    email VARCHAR(225),
    age INT,
    location VARCHAR(225),
    -- to filter by relevant tags:
    interests TEXT[],
    -- set equal to the URL ids bookmarked
    bookmarks TEXT[],
    upvotes INT DEFAULT 0
);
CREATE TABLE links (
    id SERIAL primary key,
    url TEXT not null,
    -- Need to change username to username VARCHAR(25) not null references users(username),
    -- once users table is created
    username VARCHAR(25) not null references users(username),
    created TIMESTAMP DEFAULT now(),
    siteName VARCHAR(225),
    siteType VARCHAR(50),
    headline TEXT not null,
    description TEXT,
    -- image used as the thumbnail, saved as a url
    image TEXT,
    thumbnail TEXT,
    tags TEXT[],
    upvote_count INT DEFAULT 0
);
CREATE TABLE comments (
    id SERIAL primary key,
    created TIMESTAMP DEFAULT now(),
    parent_id INT,
    link_id INT not null references links(id),
    username VARCHAR(25) not null references users(username),
    comment TEXT not null,
    upvote_count INT DEFAULT 0,
    replies INT DEFAULT 0
);
CREATE TABLE upvotes (
    id SERIAL primary key,
    created TIMESTAMP DEFAULT now(),
    username VARCHAR(25) not null references users(username),
    link_id INT not null references links(id)
);
CREATE TABLE bookmarks (
    bookmark_id SERIAL primary key,
    created TIMESTAMP DEFAULT now(),
    username VARCHAR(25) not null references users(username),
    link_id INT not null references links(id),
    bookmarked BOOLEAN DEFAULT true
);
