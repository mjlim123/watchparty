package watchtogether.dtos;

import java.util.List;

public class PlaylistDTO {

    private Long playlist_id;
    private Long room_id;
    private List<VideoDTO> videos;
    private Integer position;

    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

    public List<VideoDTO> getVideos() {
        return videos;
    }

    public void setVideos(List<VideoDTO> videos) {
        this.videos = videos;
    }

    public Long getPlaylist_id() {
        return playlist_id;
    }

    public void setPlaylist_id(Long playlist_id) {
        this.playlist_id = playlist_id;
    }

    public Long getRoom_id() {
        return room_id;
    }

    public void setRoom_id(Long room_id) {
        this.room_id = room_id;
    }
}
