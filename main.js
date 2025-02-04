let taskList = [];
let filterList = [];
let list = [];
let mode = "all";

let userValue = document.getElementById("user-input");
let addBtn = document.getElementById("add-btn");
let underLine = document.querySelector("#under-line");

//탭 메뉴 클릭시 선택한 탭에 이벤트 발생
let tabs = document.querySelectorAll(".tab-items div");
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addBtn.addEventListener("click", addTask);
userValue.addEventListener("focus", function () {
  userValue.value = "";
});

// 항목 추가
function addTask() {
  if (userValue.value === "") {
    alert("내용을 입력해주세요.");
    return;
  }

  //입력한 값을 taskList 배열에 담아줌
  // let taskContent = userValue.value;
  // taskList.push(taskContent);

  //입력한 값 외에 추가정보의 입력이 필요할 경우 객체 이용
  let taskContent = {
    id: renderId(),
    task: userValue.value,
    isComplete: false,
  };
  taskList.push(taskContent);

  //추가된 항목을 task-board 에 뿌려줌
  render();
}

// ui 변경
function render() {
  let resultHtml = "";
  //선택한 탭에 따라서 리스트를 달리 보여줘야함
  list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHtml += `<div class="task">
            <div class="task-done">${list[i].task}</div>
            <div class="btn-area">
              <button id="done-btn" onClick="doneTask('${list[i].id}')">완료</button>
              <button id="delete-btn" onClick="deleteTask('${list[i].id}')">삭제</button>
            </div>
          </div>`;
    } else {
      resultHtml += `<div class="task">
            <div>${list[i].task}</div>
            <div class="btn-area">
              <button id="done-btn" onClick="doneTask('${list[i].id}')">완료</button>
              <button id="delete-btn" onClick="deleteTask('${list[i].id}')">삭제</button>
            </div>
          </div>`;
    }
  }

  document.querySelector(".task-board").innerHTML = resultHtml;
}

// 완료 토글
function doneTask(id) {
  //id값을 찾기
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      //현재 값의 반대값으로 바꿔줌
      taskList[i].isComplete = !taskList[i].isComplete;
      break; //for문 끝내기
    }
  }
  //값변경 후 ui도 바꾸기 위해 render 함수 호출(★잊지말기)
  render();
}

//랜덤 아이디 생성 : 어떤 item을 선택했는지 알수없어서 고유한 키를 생성해줌
function renderId() {
  return Math.random().toString(36).substring(2, 18);
}

// 삭제
function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      //해당 인덱스부터 1개의 요소를 제거
      taskList.splice(i, 1);
    }
  }
  //render()에서 mode의 값을 받는데 mode는 filter()에서 받아옴
  filter();
}

//탭 메뉴 클릭시 선택한 탭에 따라 필터링
function filter(event) {
  // 탭 메뉴에 따른 slide 효과
  if (event) {
    mode = event.target.id;
    underLine.style.left = event.target.offsetLeft + "px";
    underLine.style.width = event.target.offsetWidth + "px";
  }

  filterList = [];

  if (mode === "onGoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}
