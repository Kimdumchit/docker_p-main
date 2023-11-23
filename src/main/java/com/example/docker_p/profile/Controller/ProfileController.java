package com.example.docker_p.profile.Controller;

import com.example.docker_p.profile.Entity.Profile;
import com.example.docker_p.profile.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileRepository profileRepository;

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> doLogin(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");
        Optional<Profile> optionalProfile = profileRepository.findByUserName(username);

        if (optionalProfile.isPresent() && password.equals(optionalProfile.get().getPassword())) {
            return ResponseEntity.ok(createSuccessResponse());
        } else {
            return ResponseEntity.ok(createErrorResponse());
        }
    }

    @GetMapping()
    public ResponseEntity getMember(){
        return new ResponseEntity<>(profileRepository.findAll(), HttpStatus.OK);
    }

    private Map<String, String> createSuccessResponse() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "success");
        return response;
    }

    private Map<String, String> createErrorResponse() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "error");
        response.put("message", "Invalid username or password");
        return response;
    }
}


