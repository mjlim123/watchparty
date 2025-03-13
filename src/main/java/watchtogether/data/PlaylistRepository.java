package watchtogether.data;

import org.springframework.data.jpa.repository.JpaRepository;
import watchtogether.models.Playlist;



public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
}
