package com.example.docker_p;

import com.example.docker_p.profile.Entity.Profile;
import com.example.docker_p.profile.Repository.ProfileRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class TestDataInitializer implements ApplicationRunner {

    private final ProfileRepository profileRepository;

    public TestDataInitializer(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        // 테스트 데이터 생성
        if(profileRepository.findByUserName("Koronba").isEmpty()){
            Profile testProfile = new Profile();
            testProfile.setUserName("Koronba");
            testProfile.setPassword("1234");
            profileRepository.save(testProfile);

        }

    }
}


