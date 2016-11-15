CREATE TABLE upvotes (
    id SERIAL primary key,
    username VARCHAR(25) not null references users(username),
    link_id INT not null references links(id)
);
CREATE TABLE bookmarks (
    id SERIAL primary key,
    username VARCHAR(25) not null references users(username),
    link_id INT not null references links(id)
);
