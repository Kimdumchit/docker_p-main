package com.example.docker_p.Contact.Entity;

import com.example.docker_p.profile.Entity.Profile;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contactId;

    @Column
    private String contactName;

    @ManyToOne
    @JsonBackReference
    @JoinColumn(name = "profile_id")
    private Profile profile;
}
