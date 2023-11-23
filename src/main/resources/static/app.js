document.addEventListener('DOMContentLoaded', function () {
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectList = document.getElementById('projectList');
    const addBlogBtn = document.getElementById('addBlogBtn');
    const blogList = document.getElementById('blogList');
    const addEducationBtn = document.getElementById('addEducationBtn');
    const educationList = document.getElementById('educationList');
    const addContactBtn = document.getElementById('addContactBtn');
    const contactList = document.getElementById('contactList');
    const editProfileBtn = document.getElementById('editProfileBtn');


// 초기 상태는 로그아웃
    let isLoggedIn = false;

    // 함수 추가: 삭제 버튼 숨기기
    function hideDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.btn-text.ml-2');
        deleteButtons.forEach(button => {
            button.style.display = 'none';
        });
    }

    // 함수 추가: 삭제 버튼 표시
    function showDeleteButtons() {
        const deleteButtons = document.querySelectorAll('.btn-text.ml-2');
        deleteButtons.forEach(button => {
            button.style.display = isLoggedIn ? 'inline-block' : 'none';
        });
    }

// 함수 추가: 로그인 상태 갱신
    function updateLoginStatus() {
        const loginButton = document.getElementById("loginButton");

        if (isLoggedIn) {
            loginButton.textContent = '로그아웃';
            showDeleteButtons();
        } else {
            loginButton.textContent = '로그인';
            hideDeleteButtons();
        }
    }

// 함수 추가: 모든 버튼 숨기기
    function hideAllButtons() {
        const buttons = document.querySelectorAll('.btn-text');
        buttons.forEach(button => {
            button.style.display = 'none';
        });
    }

// 함수 추가: 모든 버튼 보이기
    function showAllButtons() {
        const buttons = document.querySelectorAll('.btn-text');
        buttons.forEach(button => {
            button.style.display = 'inline-block';
        });
    }

// 쿠키에 로그인 정보 저장
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString();
    }

// 쿠키에서 로그인 정보 가져오기
    function getCookie(name) {
        const keyValue = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : null;
    }

// 로그인 버튼 클릭 시
    const loginButton = document.getElementById("loginButton");
    loginButton.addEventListener("click", async () => {
        // 현재 로그인 상태 확인
        if (isLoggedIn) {
            // 이미 로그인 상태인 경우, 로그아웃 처리
            logout();
        } else {
            // 로그아웃 상태인 경우, 로그인 처리
            const username = prompt("아이디를 입력하세요.");
            const password = prompt("비밀번호를 입력하세요.");

            const response = await fetch('localhost:8081/member/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                }),
            });

            const result = await response.json();

            if (result.status === "success") {
                isLoggedIn = true;
                alert("로그인 성공!");
                showAllButtons();

                // 쿠키에 로그인 정보 저장
                setCookie('isLoggedIn', 'true', 1); // 30일 동안 유지
            } else {
                alert("로그인 실패: " + result.message);
            }
        }

        // 로그인 상태 갱신
        updateLoginStatus();
    });

// 초기 상태 설정 시 로그인 상태 확인
    if (getCookie('isLoggedIn') === 'true') {
        isLoggedIn = true;
        showAllButtons();
        showDeleteButtons();
    }

// 로그아웃 시
    function logout() {
        isLoggedIn = false;
        hideAllButtons();
        hideDeleteButtons()

        // 쿠키에서 로그인 정보 삭제
        setCookie('isLoggedIn', 'false', -1);
    }
// 초기 상태 설정
    hideAllButtons();
    hideDeleteButtons()
    updateLoginStatus();

    // 함수 추가: 버튼 초기화
    function initializeButtons() {
        hideAllButtons();
        hideDeleteButtons();
        updateLoginStatus();
    }

    // 링크 여부를 확인하는 함수
    function isLink(text) {
        // 링크의 형식을 더 정확히 체크하도록 수정
        const urlPattern = /^(https?:\/\/)?(www\.)?[a-z0-9-]+\.[a-z]{2,}(\.[a-z]{2,})?/i;
        return urlPattern.test(text);
    }

    // 프로젝트 목록을 불러와서 화면에 추가하는 함수
    function loadProjects() {
        fetch('localhost:8081/project', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(data => {
                projectList.innerHTML = ''; // 기존 목록 비우기

                data.forEach(project => {
                    const projectItem = document.createElement('li');

                    // project.projectName이 링크인 경우
                    if (isLink(project.projectName)) {
                        const link = document.createElement('a');
                        link.href = project.projectName;
                        link.textContent = project.projectName;
                        projectItem.appendChild(link);
                    } else {
                        // project.projectName이 링크가 아닌 경우
                        projectItem.textContent = project.projectName;
                    }

                    // 추가: 삭제 버튼 (x)
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'x';
                    deleteButton.className = 'btn-text ml-2';
                    deleteButton.addEventListener('click', function () {
                        deleteProject(project.projectId);
                    });

                    projectItem.appendChild(deleteButton);
                    projectList.appendChild(projectItem);
                });
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
            });
    }


// 초기에 프로젝트 목록 로드
    loadProjects();

    function deleteProject(projectId) {
        // 현재 로그인 상태 확인
        const isLoggedIn = getCookie('isLoggedIn') === 'true';

        if (isLoggedIn) {
            console.log('ID가', projectId, '인 프로젝트를 삭제합니다.');

            // 삭제 요청 전에 목록을 먼저 갱신
            loadProjects();

            fetch('localhost:8081/project/' + encodeURIComponent(projectId), {
                method: 'DELETE',
                mode: 'cors',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('프로젝트 삭제에 실패했습니다.');
                    }
                })
                .then(data => {
                    console.log('프로젝트를 삭제했습니다:', data);
                    // 삭제 요청이 완료된 후에 목록을 다시 불러오기
                    loadProjects();
                })
                .catch(error => {
                    console.error('프로젝트 삭제 중 오류가 발생했습니다:', error);
                });
        } else {
            alert('로그인이 필요한 기능입니다.');
        }
    }



    if (addProjectBtn) {
        addProjectBtn.addEventListener('click', function () {
            const projectName = prompt('Enter project name:');

            if (projectName) {
                fetch('localhost:8081/project', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        projectName: projectName,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Added project:', data);
                        loadProjects(); // 성공적으로 추가된 경우 프로젝트 목록 다시 로드
                    })
                    .catch(error => {
                        console.error('Error adding project:', error);
                    });
            }
        });
    }

    // 블로그 목록을 불러와서 화면에 추가하는 함수
    function loadBlogs() {
        fetch('localhost:8081/blog', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(data => {
                blogList.innerHTML = ''; // 기존 목록 비우기

                data.forEach(blog => {
                    const blogItem = document.createElement('li');

                    if (isLink(blog.blogName)) {
                        // 링크인 경우 <a> 태그로 감싸서 클릭 가능하게
                        const blogLink = document.createElement('a');
                        blogLink.href = blog.blogName;
                        blogLink.target = '_blank'; // 새 창에서 열기
                        blogLink.textContent = blog.blogName;
                        blogItem.appendChild(blogLink);
                    } else {
                        // 일반 텍스트인 경우 그대로 추가
                        blogItem.textContent = blog.blogName;
                    }

                    // 추가: 삭제 버튼 (x)
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'x';
                    deleteButton.className = 'btn-text ml-2';
                    deleteButton.addEventListener('click', function () {
                        deleteBlog(blog.blogId);
                    });

                    blogItem.appendChild(deleteButton);
                    blogList.appendChild(blogItem);
                });
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
            });
    }


    // 초기에 블로그 목록 로드
    loadBlogs();

    function deleteBlog(blogId) {
        // 현재 로그인 상태 확인
        const isLoggedIn = getCookie('isLoggedIn') === 'true';

        if (isLoggedIn) {
            console.log('ID가', blogId, '인 블로그를 삭제합니다.');

            // 삭제 요청 전에 목록을 먼저 갱신
            loadBlogs();

            fetch('localhost:8081/blog/' + encodeURIComponent(blogId), {
                method: 'DELETE',
                mode: 'cors',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('블로그 삭제에 실패했습니다.');
                    }
                })
                .then(data => {
                    console.log('블로그를 삭제했습니다:', data);
                    // 삭제 요청이 완료된 후에 목록을 다시 불러오기
                    loadBlogs();
                })
                .catch(error => {
                    console.error('블로그 삭제 중 오류가 발생했습니다:', error);
                });
        } else {
            alert('로그인이 필요한 기능입니다.');
        }
    }



    if (addBlogBtn) {
        addBlogBtn.addEventListener('click', function () {
            const blogName = prompt('Enter blog name:');

            if (blogName) {
                fetch('localhost:8081/blog', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        blogName: blogName, // 수정된 부분
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Added blog:', data);
                        loadBlogs(); // 성공적으로 추가된 경우 블로그 목록 다시 로드
                    })
                    .catch(error => {
                        console.error('Error adding blog:', error);
                    });
            }
        });
    }// 교육 목록을 불러와서 화면에 추가하는 함수
    function loadEducation() {
        fetch('localhost:8081/edu', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(data => {
                educationList.innerHTML = ''; // 기존 목록 비우기

                data.forEach(edu => {
                    const eduItem = document.createElement('li');
                    eduItem.textContent = edu.education;

                    // 추가: 삭제 버튼 (x)
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'x';
                    deleteButton.className = 'btn-text ml-2';
                    deleteButton.addEventListener('click', function () {
                        deleteEducation(edu.eduId);
                    });

                    eduItem.appendChild(deleteButton);
                    educationList.appendChild(eduItem);
                });
            })
            .catch(error => {
                console.error('Error fetching education:', error);
            });
    }

// 초기에 교육 목록 로드
    loadEducation();

    function deleteEducation(eduId) {
        const isLoggedIn = getCookie('isLoggedIn') === 'true';

        if (isLoggedIn) {
            console.log('ID가', eduId, '인 교육 정보를 삭제합니다.');

            // 삭제 요청 전에 목록을 먼저 갱신
            loadEducation();

            fetch('localhost:8081/edu/' + encodeURIComponent(eduId), {
                method: 'DELETE',
                mode: 'cors',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('교육 정보 삭제에 실패했습니다.');
                    }
                })
                .then(data => {
                    console.log('교육 정보를 삭제했습니다:', data);
                    // 삭제 요청이 완료된 후에 목록을 다시 불러오기
                    loadEducation();
                })
                .catch(error => {
                    console.error('교육 정보 삭제 중 오류가 발생했습니다:', error);
                });
        } else {
            alert('로그인이 필요한 기능입니다.');
        }
    }



    if (addEducationBtn) {
        addEducationBtn.addEventListener('click', function () {
            const educationName = prompt('Enter education name:');

            if (educationName) {
                fetch('localhost:8081/edu', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        educationName: educationName, // 수정된 부분
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Added education:', data);
                        loadEducation(); // 성공적으로 추가된 경우 교육 목록 다시 로드
                    })
                    .catch(error => {
                        console.error('Error adding education:', error);
                    });
            }
        });
    }
    // 연락처 목록을 불러와서 화면에 추가하는 함수
    function loadContacts() {
        fetch('localhost:8081/contact', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
            .then(response => response.json())
            .then(data => {
                contactList.innerHTML = ''; // 기존 목록 비우기

                data.forEach(contact => {
                    const contactItem = document.createElement('li');
                    contactItem.textContent = contact.contactName;

                    // 추가: 삭제 버튼 (x)
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'x';
                    deleteButton.className = 'btn-text ml-2';
                    deleteButton.addEventListener('click', function () {
                        deleteContact(contact.contactId);
                    });

                    contactItem.appendChild(deleteButton);
                    contactList.appendChild(contactItem);
                });
            })
            .catch(error => {
                console.error('Error fetching contacts:', error);
            });
    }

// 초기에 연락처 목록 로드
    loadContacts();

    function deleteContact(contactId) {
        // 현재 로그인 상태 확인
        const isLoggedIn = getCookie('isLoggedIn') === 'true';

        if (isLoggedIn) {
            console.log('ID가', contactId, '인 연락처를 삭제합니다.');

            // 삭제 요청 전에 목록을 먼저 갱신
            loadContacts();

            fetch('localhost:8081/contact/' + encodeURIComponent(contactId), {
                method: 'DELETE',
                mode: 'cors',
            })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('연락처 삭제에 실패했습니다.');
                    }
                })
                .then(data => {
                    console.log('연락처를 삭제했습니다:', data);
                    // 삭제 요청이 완료된 후에 목록을 다시 불러오기
                    loadContacts();
                })
                .catch(error => {
                    console.error('연락처 삭제 중 오류가 발생했습니다:', error);
                });
        } else {
            alert('로그인이 필요한 기능입니다.');
        }
    }



    if (addContactBtn) {
        addContactBtn.addEventListener('click', function () {
            const contactName = prompt('Enter contact name:');

            if (contactName) {
                fetch('localhost:8081/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contactName: contactName, // 수정된 부분
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Added contact:', data);
                        loadContacts(); // 성공적으로 추가된 경우 연락처 목록 다시 로드
                    })
                    .catch(error => {
                        console.error('Error adding contact:', error);
                    });
            }
        });
    }
});
