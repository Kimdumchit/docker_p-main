package com.example.docker_p.profile.Repository;

import com.example.docker_p.profile.Entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserName(String name);
}
