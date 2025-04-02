drop database if exists watchparty;
create database watchparty;
use watchparty;

create table `user`(
	user_id int primary key auto_increment,
	username varchar(40)
);

create table room (
	room_id int primary key auto_increment,
    room_name varchar(255) not null,
    room_code varchar(10),
    current_video_id int,
    current_video_time float,
    using_playlist boolean
);

create table playlist (
	playlist_id int primary key auto_increment,
    room_id int unique,
    playlist_name varchar(255),
    position int,
    foreign key (room_id) references room(room_id) on delete cascade
    
);

create table video (
	video_id int primary key auto_increment,
    playlist_id int,
    title varchar(255) not null,
    video_url varchar(255) not null,
    thumbnail_url varchar(255),
    foreign key (playlist_id) references playlist(playlist_id)
);

ALTER TABLE room ADD CONSTRAINT fk_room_current_video 
FOREIGN KEY (current_video_id) REFERENCES video(video_id) on delete cascade;

select * from room;
