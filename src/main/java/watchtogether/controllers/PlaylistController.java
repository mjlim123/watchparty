package watchtogether.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import watchtogether.domain.PlaylistService;
import watchtogether.dtos.PlaylistDTO;
import watchtogether.mappers.PlaylistMapper;
import watchtogether.models.Playlist;

import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/playlist")
public class PlaylistController {

    private final PlaylistService playlistService;
    private final PlaylistMapper playlistMapper;

    @Autowired
    public PlaylistController(PlaylistService playlistService, PlaylistMapper playlistMapper) {
        this.playlistService = playlistService;
        this.playlistMapper = playlistMapper;
    }

    @GetMapping()
    public ResponseEntity<List<PlaylistDTO>> getAllPlaylists() {
        List<PlaylistDTO> playlists = playlistService.getAllPlaylists().stream()
                .map(playlistMapper::toDTO)
                .toList();
        return ResponseEntity.ok(playlists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PlaylistDTO> getPlaylistById(Long id) {
        Playlist playlist = playlistService.getPlaylistById(id);
        PlaylistDTO dto = playlistMapper.toDTO(playlist);
        return ResponseEntity.ok(dto);
    }

//      @GetMapping()
//    public ResponseEntity<List<Playlist>> getAllPlaylists() {
//        return ResponseEntity.ok(playlistService.getAllPlaylists());
//      }

}
