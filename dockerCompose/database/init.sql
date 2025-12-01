CREATE DATABASE IF NOT EXISTS sampledb;
USE sampledb;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(255)
);

INSERT INTO users (name, email) 
SELECT 'Taro Yamada', 'taro@example.com' WHERE NOT EXISTS (SELECT * FROM users WHERE name='Taro Yamada');
INSERT INTO users (name, email) 
SELECT 'Hanako Suzuki', 'hanako@example.com' WHERE NOT EXISTS (SELECT * FROM users WHERE name='Hanako Suzuki');
INSERT INTO users (name, email) 
SELECT 'Rio Tsukatsuki', 'rio@example.com' WHERE NOT EXISTS (SELECT * FROM users WHERE name='Rio Tsukatsuki');
