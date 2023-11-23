package com.example.docker_p.Edu.Repository;

import com.example.docker_p.Edu.Entity.Edu;
import org.springframework.data.jpa.repository.JpaRepository;

public interface eduRepository extends JpaRepository<Edu,Long> {
}
