-- Add some test users with SHA-256 hashed passwords
-- Password 'password123' hashed with SHA-256 = ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f

INSERT INTO users (email, password_hash) 
VALUES ('test@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f');

INSERT INTO users (email, password_hash)
VALUES ('demo@example.com', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f');
