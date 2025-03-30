package watchtogether.dtos;

public class RoomDTO {


    private Long room_id;
    private String room_name;
    private String room_code;
    private Long playlistId;
    private VideoDTO current_video;
    private Double current_video_time;
    private Boolean using_playlist;

    public RoomDTO() {
    }

    public Boolean getUsing_playlist() {
        return using_playlist;
    }

    public void setUsing_playlist(Boolean using_playlist) {
        this.using_playlist = using_playlist;
    }

    public Double getCurrent_video_time() {
        return current_video_time;
    }

    public void setCurrent_video_time(Double current_video_time) {
        this.current_video_time = current_video_time;
    }

    public VideoDTO getCurrent_video() {
        return current_video;
    }

    public void setCurrent_video(VideoDTO current_video) {
        this.current_video = current_video;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
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
}
