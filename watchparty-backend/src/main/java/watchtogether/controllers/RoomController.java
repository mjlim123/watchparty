package watchtogether.controllers;


import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import watchtogether.domain.RoomService;
import watchtogether.dtos.RoomDTO;
import watchtogether.mappers.RoomMapper;
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

    @Autowired
    public RoomController(RoomService roomService, RoomMapper roomMapper) {
        this.roomService = roomService;
        this.roomMapper = roomMapper;
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
        return ResponseEntity.ok(roomMapper.toDTO(savedRoom));
    }
}
