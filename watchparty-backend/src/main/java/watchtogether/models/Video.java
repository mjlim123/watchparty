package watchtogether.models;


import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long video_id;

    @ManyToOne
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    private String title;

    private String video_url;

    private String thumbnail_url;

    public String getThumbnail_url() {
        return thumbnail_url;
    }

    public void setThumbnail_url(String thumbnail_url) {
        this.thumbnail_url = thumbnail_url;
    }

    public long getVideo_id() {
        return video_id;
    }

    public void setVideo_id(long video_id) {
        this.video_id = video_id;
    }

    public Playlist getPlaylist() {
        return playlist;
    }

    public void setPlaylist(Playlist playlist) {
        this.playlist = playlist;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getVideo_url() {
        return video_url;
    }

    public void setVideo_url(String video_url) {
        this.video_url = video_url;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Video video = (Video) o;
        return video_id == video.video_id && Objects.equals(playlist, video.playlist) && Objects.equals(title, video.title) && Objects.equals(video_url, video.video_url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(video_id, playlist, title, video_url);
    }

    @Override
    public String toString() {
        return "Video{" +
                "video_id=" + video_id +
                ", playlist=" + playlist +
                ", title='" + title + '\'' +
                ", video_url='" + video_url + '\'' +
                '}';
    }
}
