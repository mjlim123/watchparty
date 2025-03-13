package watchtogether.data;

import org.springframework.data.jpa.repository.JpaRepository;
import watchtogether.models.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
