package watchtogether.mappers;


import org.springframework.stereotype.Component;
import watchtogether.dtos.RoomDTO;
import watchtogether.models.Room;

@Component
public class RoomMapper {

    private final VideoMapper videoMapper;

    public RoomMapper(VideoMapper videoMapper) {
        this.videoMapper = videoMapper;
    }


    public RoomDTO toDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setRoom_id(room.getRoom_id());
        dto.setRoom_name(room.getRoom_name());
        dto.setRoom_code(room.getRoom_code());
        dto.setPlaylistId(room.getPlaylist().getPlaylist_id());
        if (room.getCurrent_video() != null) {
            dto.setCurrent_video(videoMapper.toDTO(room.getCurrent_video()));
        }
        dto.setCurrent_video_time(room.getCurrent_video_time());
        dto.setUsing_playlist(room.getUsing_playlist());
        return dto;
    }

    public Room toEntity(RoomDTO dto) {
        Room room = new Room();
        room.setRoom_id(dto.getRoom_id());
        room.setRoom_name(dto.getRoom_name());
        return room;
    }
}
