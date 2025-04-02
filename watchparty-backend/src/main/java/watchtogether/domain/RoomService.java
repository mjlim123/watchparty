package watchtogether.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import watchtogether.data.PlaylistRepository;
import watchtogether.data.RoomRepository;
import watchtogether.data.VideoRepository;
import watchtogether.models.Playlist;
import watchtogether.models.Room;
import watchtogether.models.Video;

import javax.transaction.Transactional;
import java.security.SecureRandom;
import java.util.List;

@Service
public class RoomService {

    private final RoomRepository roomRepository;
    private final VideoRepository videoRepository;

    @Autowired
    public RoomService(RoomRepository roomRepository, VideoRepository videoRepository) {
        this.roomRepository = roomRepository;
        this.videoRepository = videoRepository;
    }

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }


    public Room createRoom(Room room) {
        room.setRoom_code(generateRoomCode());
        Playlist playlist = new Playlist();
        playlist.setRoom(room);
        room.setPlaylist(playlist);
        room.setCurrent_video(null);
        room.setUsing_playlist(false);
        return roomRepository.save(room);
    }

    @Transactional
    public Room updateCurrentVideo(Long roomId, Long videoId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        Video video = videoRepository.findById(videoId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + videoId));

        room.setCurrent_video(video);

        return roomRepository.save(room);
    }

    @Transactional
    public Room updateCurrentTime(Long roomId, Double videoTime) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));

        room.setCurrent_video_time(videoTime);
        return roomRepository.save(room);
    }

    @Transactional
    public Room updateIsUsingPlaylist(Long roomId, Boolean isUsingPlaylist) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        room.setUsing_playlist(isUsingPlaylist);
        return roomRepository.save(room);

    }

    @Transactional
    public Room updateShuffle(Long roomId, Boolean state) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        room.setToggle_shuffle(state);
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
