package com.example.docker_p.Blog.Repository;

import com.example.docker_p.Blog.Entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog,Long> {
}
