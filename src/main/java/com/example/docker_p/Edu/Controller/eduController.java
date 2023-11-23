package com.example.docker_p.Edu.Controller;

import com.example.docker_p.Edu.Entity.Edu;
import com.example.docker_p.Edu.Repository.eduRepository;
import com.example.docker_p.profile.Entity.Profile;
import com.example.docker_p.profile.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/edu")
@RequiredArgsConstructor
public class eduController {
    private final eduRepository EduRepository;
    private final ProfileRepository profileRepository;

    @PostMapping()
    public ResponseEntity postEdu(@RequestBody Map<String, String> requestBody) {
        String educationName = requestBody.get("educationName");

        if (educationName != null && !educationName.isEmpty()) {
            Optional<Profile> optionalProfile = profileRepository.findById(1L);

            if (optionalProfile.isPresent()) {
                Edu edu = new Edu();
                edu.setEducation(educationName);
                edu.setProfile(optionalProfile.get()); // 연결된 사용자 설정
                EduRepository.save(edu);
                return new ResponseEntity(edu, HttpStatus.CREATED);
            } else {
                return new ResponseEntity("profile_id가 1에 해당하는 사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity("교육 이름은 null이거나 비어 있을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping()
    public ResponseEntity getEdu() {
        return new ResponseEntity(EduRepository.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/{eduId}")
    public void deleteEdu(@PathVariable("eduId") Long eduId) {
        EduRepository.deleteById(eduId);
    }
}
