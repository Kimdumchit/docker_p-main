package com.example.docker_p.project.Repository;

import com.example.docker_p.project.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface projectRepository extends JpaRepository<Project,Long> {
    void deleteByProjectName(String projectName);
}
