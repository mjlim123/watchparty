package watchtogether.mappers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import watchtogether.dtos.PlaylistDTO;
import watchtogether.dtos.VideoDTO;
import watchtogether.models.Playlist;
import watchtogether.models.Video;

import java.util.List;
import java.util.stream.Collectors;


@Component
public class PlaylistMapper {

    private final VideoMapper videoMapper;

    @Autowired
    public PlaylistMapper(VideoMapper videoMapper) {
        this.videoMapper = videoMapper;
    }

    public PlaylistDTO toDTO(Playlist playlist) {
        PlaylistDTO dto = new PlaylistDTO();
        List<VideoDTO> videos = playlist.getVideos()
                .stream()
                .map(videoMapper::toDTO)
                .toList();

        dto.setPlaylist_id(playlist.getPlaylist_id());
        dto.setVideos(videos);
        dto.setRoom_id(playlist.getRoom().getRoom_id());
        return dto;
    }
}
