package watchtogether.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import watchtogether.data.PlaylistRepository;
import watchtogether.data.RoomRepository;
import watchtogether.models.Playlist;
import watchtogether.models.Room;

import java.security.SecureRandom;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final PlaylistRepository playlistRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, PlaylistRepository playlistRepository) {
        this.roomRepository = roomRepository;
        this.playlistRepository = playlistRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }


    public Room createRoom(Room room) {
        room.setRoom_code(generateRoomCode());
        Playlist playlist = new Playlist();
        playlist.setRoom(room);
        room.setPlaylist(playlist);
        return roomRepository.save(room);
    }

    public Room getRoomByCode(String roomCode) {
        return roomRepository.getRoomByCode(roomCode);
    }

    public String generateRoomCode() {
        final String ALPHANUMERIC = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        final SecureRandom RANDOM = new SecureRandom();
        final int LENGTH = 10;

        StringBuilder sb = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            int randomIndex = RANDOM.nextInt(ALPHANUMERIC.length());
            sb.append(ALPHANUMERIC.charAt(randomIndex));
        }
        return sb.toString();

    }
}
