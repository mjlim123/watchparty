package watchtogether.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchtogether.domain.VideoService;
import watchtogether.dtos.VideoDTO;
import watchtogether.mappers.VideoMapper;
import watchtogether.models.Video;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/video")
public class VideoController {

    private final VideoService videoService;
    private final VideoMapper videoMapper;

    @Autowired
    public VideoController(VideoService videoService, VideoMapper videoMapper) {
        this.videoService = videoService;
        this.videoMapper = videoMapper;
    }

    @PostMapping("/create/{playlistId}")
    public ResponseEntity<VideoDTO> addVideoToPlaylist(@PathVariable Long playlistId, @RequestBody Video video) {
        Video savedVideo = videoService.addVideoToPlaylist(video, playlistId);
        VideoDTO dto = new VideoDTO();
        dto.setVideo_id(video.getVideo_id());
        dto.setVideo_url(video.getVideo_url());
        dto.setTitle(video.getTitle());
        dto.setThumbnail_url(video.getThumbnail_url());
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @DeleteMapping("/delete/{videoId}/{playlistId}")
    public ResponseEntity<Void> deleteVideoFromPlaylist(@PathVariable Long videoId, @PathVariable Long playlistId) {
        try {
            videoService.deleteVideoByPlaylistId(videoId, playlistId);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<VideoDTO> getVideoById(@PathVariable Long id) {
        Video video = videoService.getVideoById(id);
        VideoDTO dto = videoMapper.toDTO(video);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/create")
    public ResponseEntity<VideoDTO> createVideo(@RequestBody Video video) {
        Video videoToCreate = videoService.createVideo(video);
        VideoDTO dto = videoMapper.toDTO(videoToCreate);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/create/batch/{playlistId}")
    public ResponseEntity<List<VideoDTO>> createVideos(@RequestBody List<Video> videos, @PathVariable Long playlistId) {
        List<Video> createdVideos = videoService.createVideos(videos, playlistId);
        List<VideoDTO> dtos = createdVideos.stream().map(videoMapper::toDTO).toList();
        return ResponseEntity.ok(dtos);
    }
}
