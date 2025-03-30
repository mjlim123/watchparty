package watchtogether.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import watchtogether.models.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r WHERE r.room_code = :roomCode")
    Room getRoomByCode(@Param("roomCode") String roomCode);
}
