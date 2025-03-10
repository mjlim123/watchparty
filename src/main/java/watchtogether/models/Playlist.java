package watchtogether.models;


import javax.persistence.*;

@Entity
public class Playlist {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlist_id;

    @OneToOne
    @JoinColumn(name = "room_id", unique = true, nullable = false)
    private Room room;

    public Long getPlaylist_id() {
        return playlist_id;
    }

    public void setPlaylist_id(Long playlist_id) {
        this.playlist_id = playlist_id;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }
}
