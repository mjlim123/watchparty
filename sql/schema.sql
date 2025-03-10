drop database if exists watchparty;
create database watchparty;
use watchparty;

create table `User`(
	user_id int primary key auto_increment,
	username varchar(40)
);

create table Room (
	room_id int primary key auto_increment,
    room_name varchar(255) not null,
    room_code varchar(7)
);

create table Playlist (
	playlist_id int primary key auto_increment,
    room_id int unique,
    foreign key (room_id) references Room(room_id) on delete cascade
    
);

create table Video (
	video_id int primary key auto_increment,
    playlist_id int not null,
    title varchar(255) not null,
    video_url varchar(255) not null,
    foreign key (playlist_id) references Playlist(playlist_id)
);