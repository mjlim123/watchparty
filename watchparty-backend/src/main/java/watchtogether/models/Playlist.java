package watchtogether.models;


import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
public class Playlist {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long playlist_id;

    @OneToOne
    @JoinColumn(name = "room_id", unique = true, nullable = false)
    private Room room;

    @OneToMany(mappedBy = "playlist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Video> videos;

    public Playlist() {
    }

    public List<Video> getVideos() {
        return videos;
    }

    public void setVideos(List<Video> videos) {
        this.videos = videos;
    }

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

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Playlist playlist = (Playlist) o;
        return Objects.equals(playlist_id, playlist.playlist_id) && Objects.equals(room, playlist.room) && Objects.equals(videos, playlist.videos);
    }

    @Override
    public int hashCode() {
        return Objects.hash(playlist_id, room, videos);
    }

    @Override
    public String toString() {
        return "Playlist{" +
                "playlist_id=" + playlist_id +
                ", room=" + room +
                ", videos=" + videos +
                '}';
    }
}
