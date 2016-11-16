CREATE TABLE upvotes (
    id SERIAL primary key,
    created TIMESTAMP DEFAULT now(),
    username VARCHAR(25) not null references users(username),
    link_id INT not null references links(id)
);
CREATE TABLE bookmarks (
    id SERIAL primary key,
    created TIMESTAMP DEFAULT now(),
    username VARCHAR(25) not null references users(username),
    link_id INT not null references links(id),
    bookmarked BOOLEAN DEFAULT true
);

-- ALTER TABLE comments ADD COLUMN created TIMESTAMP DEFAULT now();
