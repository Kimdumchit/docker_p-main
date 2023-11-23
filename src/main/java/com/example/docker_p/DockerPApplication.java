package com.example.docker_p;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;

@SpringBootApplication
public class DockerPApplication {

    public static void main(String[] args) {
        SpringApplication.run(DockerPApplication.class, args);
    }

}
