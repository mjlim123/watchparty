package watchtogether.domain;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import watchtogether.data.RoomRepository;
import watchtogether.data.UserRepository;
import watchtogether.dto.UserDTO;
import watchtogether.mapper.UserRoomMapper;
import watchtogether.models.User;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoomRepository roomRepository;
    private final UserRoomMapper userRoomMapper;


    @Autowired
    public UserService(UserRepository userRepository, RoomRepository roomRepository, UserRoomMapper userRoomMapper) {
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
        this.userRoomMapper = userRoomMapper;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(userRoomMapper::toUserDTO)
                .collect(Collectors.toList());
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }



}
