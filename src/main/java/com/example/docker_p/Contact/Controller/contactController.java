package com.example.docker_p.Contact.Controller;

import com.example.docker_p.Contact.Entity.Contact;
import com.example.docker_p.Contact.Repository.ContactRepository;
import com.example.docker_p.profile.Entity.Profile;
import com.example.docker_p.profile.Repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/contact")
@RequiredArgsConstructor
public class contactController {

    private final ContactRepository contactRepository;
    private final ProfileRepository profileRepository;

    @PostMapping()
    public ResponseEntity postContact(@RequestBody Map<String, String> requestBody) {
        String contactName = requestBody.get("contactName");

        if (contactName != null && !contactName.isEmpty()) {
            Optional<Profile> optionalProfile = profileRepository.findById(1L);

            if (optionalProfile.isPresent()) {
                Contact contact = new Contact();
                contact.setContactName(contactName);
                contact.setProfile(optionalProfile.get()); // 연결된 사용자 설정
                contactRepository.save(contact);
                return new ResponseEntity(contact, HttpStatus.CREATED);
            } else {
                return new ResponseEntity("profile_id가 1에 해당하는 사용자를 찾을 수 없습니다.", HttpStatus.NOT_FOUND);
            }
        } else {
            return new ResponseEntity("연락처는 null이거나 비어 있을 수 없습니다.", HttpStatus.BAD_REQUEST);
        }
    }


    @GetMapping()
    public ResponseEntity getContact() {
        List<Contact> contactList = contactRepository.findAll();
        return new ResponseEntity(contactList, HttpStatus.OK);
    }

    @DeleteMapping("/{contactId}")
    public void deleteContact(@PathVariable("contactId") Long contactId) {
        contactRepository.deleteById(contactId);
    }
}
