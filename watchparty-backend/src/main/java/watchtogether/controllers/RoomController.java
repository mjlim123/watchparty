package watchtogether.controllers;


import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchtogether.domain.RoomService;
import watchtogether.dtos.RoomDTO;
import watchtogether.dtos.VideoDTO;
import watchtogether.mappers.RoomMapper;
import watchtogether.mappers.VideoMapper;
import watchtogether.models.Room;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/room")
public class RoomController {

    private final RoomService roomService;
    private final RoomMapper roomMapper;
    private final VideoMapper videoMapper;

    @Autowired
    public RoomController(RoomService roomService, RoomMapper roomMapper, VideoMapper videoMapper) {
        this.roomService = roomService;
        this.roomMapper = roomMapper;
        this.videoMapper = videoMapper;
    }

    @GetMapping()
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        List<RoomDTO> rooms = roomService.getAllRooms().stream()
                .map(roomMapper::toDTO)
                .toList();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/{roomCode}")
    public ResponseEntity<RoomDTO> getRoomByCode(@PathVariable String roomCode) {
        Room room = roomService.getRoomByCode(roomCode);
        RoomDTO dto = roomMapper.toDTO(room);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/create")
    public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomDTO roomDTO) {
        Room room = roomMapper.toEntity(roomDTO);
        Room savedRoom = roomService.createRoom(room);
        RoomDTO dto = roomMapper.toDTO(room);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update/{id}/video")
    public ResponseEntity<VideoDTO> updateCurrentVideo(@PathVariable Long id, @RequestParam Long videoId) {
        Room roomToUpdate = roomService.updateCurrentVideo(id, videoId);
        VideoDTO dto = videoMapper.toDTO(roomToUpdate.getCurrent_video());
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update/{id}/time")
    public ResponseEntity<RoomDTO> updateCurrentTime(@PathVariable Long id, @RequestParam Double videoTime) {
        Room roomToUpdate = roomService.updateCurrentTime(id, videoTime);
        RoomDTO dto = roomMapper.toDTO(roomToUpdate);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/update/{id}/usingPlaylist")
    public ResponseEntity<RoomDTO> updateIsUsingPlaylist(@PathVariable Long id, @RequestParam Boolean isUsingPlaylist) {
        Room roomToUpdate = roomService.updateIsUsingPlaylist(id, isUsingPlaylist);
        RoomDTO dto = roomMapper.toDTO(roomToUpdate);
        return ResponseEntity.ok(dto);

    }

}
