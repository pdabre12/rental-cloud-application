-- drop database if exists avCloud_db;
-- create database avCloud_db;
use avCloud_db;

drop TABLE if exists cars;
CREATE TABLE cars (
car_id int not null AUTO_INCREMENT PRIMARY KEY,
use_state varchar(10) not null default 'active',
moving_state varchar(10) not null default 'idle',
car_type varchar(20) not null,
-- need to confirm
car_loc_x float(4) not null,
car_loc_y float(4) not null
);

truncate table cars;
INSERT INTO cars(use_state, car_type, car_loc_x, car_loc_y) VALUES('connected', 'audi.tt', 111.1, 222.3);
INSERT INTO cars(use_state, car_type, car_loc_x, car_loc_y) VALUES('connected', 'audi.a2', 222.2, 33.3);
SELECT * FROM cars;

drop TABLE if exists admins;
CREATE TABLE admins (
admin_id varchar(9) not null PRIMARY KEY,
admin_pw varchar(45) not null
-- foreign key (a_car_id) references cars(car_id) on update cascade
);

INSERT INTO admins VALUES('MAN101', sha1('testpw'));
INSERT INTO admins VALUES('MAN102', sha1('testpw2'));
select * from admins;

drop TABLE if exists manage;
CREATE TABLE manage (
m_admin_id varchar(9) not null,
m_car_id int not null,
PRIMARY KEY (m_admin_id, m_car_id),
foreign key (m_admin_id) references admins(admin_id) on update cascade,
foreign key (m_car_id) references cars(car_id) on update cascade
);

drop TABLE if exists users;
CREATE TABLE users (
user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_name varchar(20) not null unique,
user_pw varchar(45) not null,
user_email varchar(30) not null,
user_phone varchar(10) not null
);

SET SQL_SAFE_UPDATES = 0;
delete from users;
INSERT INTO users VALUES('','user1', sha1('text'), 'user1@gmail.com', '6668889999');
INSERT INTO users VALUES('','user2', sha1('thisIsPW'), 'user2@gmail.com', '6667779999');
-- INSERT INTO users(user_name, user_pw, user_email, user_phone) VALUES ('user3', 'userpw3', 'user3@gmail.com', '6667772222');
SELECT * FROM users;


drop TABLE if exists bookings;
CREATE TABLE bookings (
booking_id int not null AUTO_INCREMENT PRIMARY KEY,
reserve_time TIMESTAMP not null,
start_loc varchar(40) not null,
destination_loc varchar(40) not null,
customer_name varchar(20) not null,
b_car_id int not null, 
foreign key (customer_name) references users(user_name) on update cascade,
foreign key (b_car_id) references cars(car_id) on update cascade
);

drop TABLE if exists orders;
CREATE TABLE orders (
order_id int not null AUTO_INCREMENT PRIMARY KEY,
start_time TIMESTAMP not null default "2000-01-01 00:00:00",
pickup_time TIMESTAMP not null default "2000-01-01 00:00:00",
finish_time TIMESTAMP not null default "2000-01-01 00:00:00",
cost float(6) not null default 0,
distance float(6) not null default 0,
customer_name varchar(20) not null,
o_booking_id int not null unique, 
foreign key (customer_name) references users(user_name) on update cascade,
foreign key (o_booking_id) references bookings(booking_id) on update cascade
);

truncate table bookings;
describe orders;

-- ref: https://dba.stackexchange.com/questions/43899/too-many-database-connections-on-amazon-rds 
DELIMITER $$

DROP PROCEDURE IF EXISTS `avCloud_db`.`Kill_Long_Running_Selects` $$
CREATE PROCEDURE `avCloud_db`.`Kill_Long_Running_Selects` (time_limit INT,display INT)
BEGIN

    DECLARE ndx,lastndx INT;

    DROP TABLE IF EXISTS avCloud_db.LongRunningSelects;
    CREATE TABLE avCloud_db.LongRunningSelects
    (
        id INT NOT NULL AUTO_INCREMENT,
        idtokill BIGINT,
        PRIMARY KEY (id)
    ) ENGINE=MEMORY;
    INSERT INTO avCloud_db.LongRunningSelects (idtokill)
    SELECT id FROM information_schema.processlist
    WHERE user<>'system user' AND info regexp '^SELECT' AND time > time_limit;

    SELECT COUNT(1) INTO lastndx FROM avCloud_db.LongRunningSelects;
    SET ndx = 0;
    WHILE ndx < lastndx DO
        SET ndx = ndx + 1;
        SELECT idtokill INTO @kill_id
        FROM avCloud_db.LongRunningSelects WHERE id = ndx;
        CALL mysql.rds_kill(@kill_id);
    END WHILE;

    IF lastndx > 0 THEN
        IF display = 1 THEN
            SELECT GROUP_CONCAT(idtokill) INTO @idlist FROM avCloud_db.LongRunningSelects;
            SELECT @idlist IDs_KIlled;
            SELECT CONCAT('Processes Killed : ',lastndx) Kill_Long_Running_Selects;
        END IF;
    END IF;

END $$

CALL avCloud_db.Kill_Long_Running_Selects(0,0);
SHOW FULL PROCESSLIST;
SET session wait_timeout=300;