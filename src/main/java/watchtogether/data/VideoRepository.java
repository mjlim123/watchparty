package watchtogether.data;

import org.springframework.data.jpa.repository.JpaRepository;
import watchtogether.models.Video;

public interface VideoRepository extends JpaRepository<Video, Integer> {
}
