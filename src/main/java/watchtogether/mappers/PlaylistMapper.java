package watchtogether.mappers;

import org.springframework.stereotype.Component;
import watchtogether.dtos.PlaylistDTO;
import watchtogether.models.Playlist;


@Component
public class PlaylistMapper {
    public PlaylistDTO toDTO(Playlist playlist) {
        PlaylistDTO dto = new PlaylistDTO();
        dto.setPlaylist_id(playlist.getPlaylist_id());
        dto.setRoom_id(playlist.getRoom().getRoom_id());
        return dto;
    }
}
