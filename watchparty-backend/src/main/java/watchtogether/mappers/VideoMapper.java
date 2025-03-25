package watchtogether.mappers;


import org.springframework.stereotype.Component;
import watchtogether.dtos.VideoDTO;
import watchtogether.models.Video;

@Component
public class VideoMapper {
    public VideoDTO toDTO(Video video) {
        VideoDTO dto = new VideoDTO();
        dto.setTitle(video.getTitle());
        dto.setVideo_url(video.getVideo_url());
        dto.setVideo_id(video.getVideo_id());
        dto.setThumbnail_url(video.getThumbnail_url());
        return dto;
    }

}
