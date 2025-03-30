package watchtogether.domain;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import watchtogether.data.PlaylistRepository;
import watchtogether.models.Playlist;

import java.util.List;

@Service
public class PlaylistService {

    private final PlaylistRepository playlistRepository;

    @Autowired
    public PlaylistService(PlaylistRepository playlistRepository) {
        this.playlistRepository = playlistRepository;
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public Playlist getPlaylistById(Long id) {
        return playlistRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Playlist not found"));
    }

    public Playlist getPlaylistByRoomId(Long id) {
        return playlistRepository.findByRoomId(id);
    }

    public Playlist updatePlaylistPosition(Long id, Integer number) {
        Playlist playlist = playlistRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + id));
        playlist.setPosition(number);
        return playlistRepository.save(playlist);
    }

    public Playlist createPlaylist(Playlist playlist) {
        return playlistRepository.save(playlist);
    }

}
