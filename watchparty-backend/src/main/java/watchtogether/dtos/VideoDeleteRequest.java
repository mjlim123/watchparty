package watchtogether.dtos;

public class VideoDeleteRequest {

    private Long videoId;
    private Long playlistId;

    public VideoDeleteRequest() {}

    public VideoDeleteRequest(Long videoId, Long playlistId) {
        this.videoId = videoId;
        this.playlistId = playlistId;
    }

    public Long getVideoId() {
        return videoId;
    }

    public void setVideoId(Long videoId) {
        this.videoId = videoId;
    }

    public Long getPlaylistId() {
        return playlistId;
    }

    public void setPlaylistId(Long playlistId) {
        this.playlistId = playlistId;
    }
}
