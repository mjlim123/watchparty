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
    room_code varchar(10)
);

create table playlist (
	playlist_id int primary key auto_increment,
    room_id int unique,
    playlist_name varchar(255),
    foreign key (room_id) references room(room_id) on delete cascade
    
);

create table video (
	video_id int primary key auto_increment,
    playlist_id int not null,
    title varchar(255) not null,
    video_url varchar(255) not null,
    thumbnail_url varchar(255) not null,
    foreign key (playlist_id) references playlist(playlist_id)
);


