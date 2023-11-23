package com.example.docker_p.Contact.Repository;

import com.example.docker_p.Contact.Entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact,Long> {
}
