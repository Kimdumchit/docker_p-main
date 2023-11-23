package com.example.docker_p.profile.Entity;

import com.example.docker_p.Blog.Entity.Blog;
import com.example.docker_p.Contact.Entity.Contact;
import com.example.docker_p.Edu.Entity.Edu;
import com.example.docker_p.project.Entity.Project;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long profile_id;

    @Column(nullable = false, unique = true)
    private String userName;

    @Column(nullable = false)
    private String password;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile")
    @JsonManagedReference
    private List<Edu> education;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile")
    @JsonManagedReference
    private List<Project> projects;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile")
    @JsonManagedReference
    private List<Contact> contact;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "profile")
    @JsonManagedReference
    private List<Blog> blogs;
}



//    public void setEducationName(String educationName) {
//        Edu education = new Edu();
//        education.setEducation(educationName);
//
//        if (this.education == null) {
//            this.education = new ArrayList<>();
//        }
//
//        this.education.add(education);
//    }
//
//    public void setProjectName(String projectName) {
//        Project project = new Project();
//        project.setProjectName(projectName);
//
//        if (this.projects == null) {
//            this.projects = new ArrayList<>();
//        }
//
//        this.projects.add(project);
//    }
//
//    public void setContactName(String contactName) {
//        Contact contact = new Contact();
//        contact.setContactName(contactName);
//
//        if (this.contact == null) {
//            this.contact = new ArrayList<>();
//        }
//
//        this.contact.add(contact);
//    }
//
//    public void setBlogName(String blogName) {
//        Blog blog = new Blog();
//        blog.setBlogName(blogName);
//
//        if (this.blogs == null) {
//            this.blogs = new ArrayList<>();
//        }
//
//        this.blogs.add(blog);
//    }

