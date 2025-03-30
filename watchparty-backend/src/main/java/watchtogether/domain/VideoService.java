package watchtogether.domain;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import watchtogether.data.PlaylistRepository;
import watchtogether.data.VideoRepository;

import watchtogether.models.Playlist;
import watchtogether.models.Video;

import java.util.List;

@Service
public class VideoService {

    private final VideoRepository videoRepository;
    private final PlaylistRepository playlistRepository;

    @Autowired
    public VideoService(VideoRepository videoRepository, PlaylistRepository playlistRepository) {
        this.videoRepository = videoRepository;
        this.playlistRepository = playlistRepository;
    }

    public List<Video> getAllVideos() {
        return videoRepository.findAll();
    }

    public Video addVideoToPlaylist(Video video, long playlistId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found"));

        video.setPlaylist(playlist);
        return videoRepository.save(video);
    }

    public void deleteVideoByPlaylistId(Long videoId, Long playlistId) {
        playlistRepository.deleteByPlaylistId(videoId, playlistId);
    }

    public Video createVideo(Video video) {
        return videoRepository.save(video);
    }

    public Video getVideoById(Long id) {
        return videoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Video with id: " + id + "not found"));
    }

}
