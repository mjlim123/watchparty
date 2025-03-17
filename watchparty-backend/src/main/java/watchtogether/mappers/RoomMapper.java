package watchtogether.mappers;


import org.springframework.stereotype.Component;
import watchtogether.dtos.RoomDTO;
import watchtogether.models.Room;

@Component
public class RoomMapper {
    public RoomDTO toDTO(Room room) {
        RoomDTO dto = new RoomDTO();
        dto.setRoom_id(room.getRoom_id());
        dto.setRoom_name(room.getRoom_name());
        dto.setRoom_code(room.getRoom_code());
        dto.setPlaylistId(room.getPlaylist().getPlaylist_id());
        return dto;
    }

    public Room toEntity(RoomDTO dto) {
        Room room = new Room();
        room.setRoom_id(dto.getRoom_id());
        room.setRoom_name(dto.getRoom_name());
        return room;
    }
}
