package watchtogether.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import watchtogether.models.Playlist;



public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query("SELECT p FROM Playlist p WHERE p.room.id = :room_id")
    Playlist findByRoomId(@Param("room_id") Long roomId);

    @Modifying
    @Transactional
    @Query("DELETE FROM Video v WHERE v.video_id = :videoId AND v.playlist.id = :playlistId")
    void deleteByPlaylistId(@Param("videoId") Long videoId, @Param("playlistId")Long playlistId);
}
