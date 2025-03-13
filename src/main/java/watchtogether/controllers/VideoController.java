package watchtogether.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchtogether.domain.VideoService;
import watchtogether.dtos.VideoDTO;
import watchtogether.models.Video;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/video")
public class VideoController {

    private final VideoService videoService;

    @Autowired
    public VideoController(VideoService videoService) {
        this.videoService = videoService;
    }

    @PostMapping("/add/{playlistId}")
    public ResponseEntity<VideoDTO> addVideoToPlaylist(@PathVariable Long playlistId, @RequestBody Video video) {
        Video savedVideo = videoService.addVideoToPlaylist(video, playlistId);
        VideoDTO dto = new VideoDTO();
        dto.setVideo_id(video.getVideo_id());
        dto.setVideo_url(video.getVideo_url());
        dto.setTitle(video.getTitle());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

}
