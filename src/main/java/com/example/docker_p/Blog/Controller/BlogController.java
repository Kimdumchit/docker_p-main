package com.example.docker_p.Blog.Controller;

import com.example.docker_p.Blog.Entity.Blog;
import com.example.docker_p.Blog.Repository.BlogRepository;
import com.example.docker_p.profile.Entity.Profile;
import com.example.docker_p.profile.Repository.ProfileRepository;
import com.example.docker_p.project.Entity.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogRepository blogRepository;
    private final ProfileRepository profileRepository;

    @PostMapping()
    public ResponseEntity postBlogForUser(@RequestBody Map<String, String> requestBody) {
        String blogName = requestBody.get("blogName");

        if (blogName != null && !blogName.isEmpty()) {
            Optional<Profile> optionalProfile = profileRepository.findById(1L);

            if (optionalProfile.isPresent()) {
                Blog blog = new Blog();
                blog.setBlogName(blogName);
                blog.setProfile(optionalProfile.get());
                blogRepository.save(blog);
                return new ResponseEntity(blog, HttpStatus.CREATED);
            } else {
                return new ResponseEntity("해당 profileId에 해당하는 사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity("블로그 이름은 null이거나 비어 있을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity getBlog(){
        return new ResponseEntity(blogRepository.findAll(),HttpStatus.OK);
    }

    @DeleteMapping("/{blogId}")
    public void deleteBlog(@PathVariable("blogId") Long blogId){
        blogRepository.deleteById(blogId);
    }
}





