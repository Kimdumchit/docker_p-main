package com.example.docker_p.project.Controller;

import com.example.docker_p.profile.Entity.Profile;
import com.example.docker_p.profile.Repository.ProfileRepository;
import com.example.docker_p.project.Entity.Project;
import com.example.docker_p.project.Repository.projectRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/project")
@RequiredArgsConstructor
public class projectController {
    private final projectRepository projectRepository;
    private final ProfileRepository profileRepository;

    @PostMapping()
    public ResponseEntity postProject(@RequestBody Map<String, String> requestBody) {
        String projectName = requestBody.get("projectName");

        if (projectName != null && !projectName.isEmpty()) {
            Optional<Profile> optionalProfile = profileRepository.findById(1L);

            if (optionalProfile.isPresent()) {
                Project project = new Project();
                project.setProjectName(projectName);
                project.setProfile(optionalProfile.get()); // 연결된 사용자 설정
                projectRepository.save(project);
                return new ResponseEntity(project, HttpStatus.CREATED);
            } else {
                return new ResponseEntity("profile_id가 1에 해당하는 사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity("프로젝트 이름은 null이거나 비어 있을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity getProject(){
        return new ResponseEntity(projectRepository.findAll(),HttpStatus.OK);
    }

    @DeleteMapping("/{projectId}")
    public void deleteProject(@PathVariable("projectId") Long projectId){
         projectRepository.deleteById(projectId);
    }
}
