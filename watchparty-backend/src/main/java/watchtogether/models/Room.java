package watchtogether.models;


import com.fasterxml.jackson.annotation.JsonIgnore;


import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Room {

    //test
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long room_id;

    @Column(nullable = false)
    private String room_name;

    @JsonIgnore
    @Column(nullable = false)
    private String room_code;

    @OneToOne(mappedBy = "room", cascade = CascadeType.ALL, orphanRemoval = true)
    private Playlist playlist;

    @OneToOne
    @JoinColumn(name = "current_video_id") // Ensures it references the Video entity
    private Video current_video;

    private Double current_video_time;

    private Boolean using_playlist;

    public Room() {
    }

    public Boolean getUsing_playlist() {
        return using_playlist;
    }

    public void setUsing_playlist(Boolean using_playlist) {
        this.using_playlist = using_playlist;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }

    public String getRoom_name() {
        return room_name;
    }

    public void setRoom_name(String room_name) {
        this.room_name = room_name;
    }

    public String getRoom_code() {
        return room_code;
    }

    public void setRoom_code(String room_code) {
        this.room_code = room_code;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public Video getCurrent_video() {
        return current_video;
    }

    public void setCurrent_video(Video current_video) {
        this.current_video = current_video;
    }

    public Double getCurrent_video_time() {
        return current_video_time;
    }

    public void setCurrent_video_time(Double current_video_time) {
        this.current_video_time = current_video_time;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Room room = (Room) o;
        return Objects.equals(room_id, room.room_id) && Objects.equals(room_name, room.room_name) && Objects.equals(room_code, room.room_code) && Objects.equals(playlist, room.playlist) && Objects.equals(current_video, room.current_video);
    }

    @Override
    public int hashCode() {
        return Objects.hash(room_id, room_name, room_code, playlist, current_video);
    }
}
