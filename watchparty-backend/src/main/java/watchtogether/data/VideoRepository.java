package watchtogether.data;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import watchtogether.models.Video;

public interface VideoRepository extends JpaRepository<Video, Long> {


}
