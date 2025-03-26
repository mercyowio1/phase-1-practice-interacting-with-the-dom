document.addEventListener("DOMContentLoaded", () => {
  let counter = document.getElementById("counter");
  let plusBtn = document.getElementById("plus");
  let minusBtn = document.getElementById("minus");
  let heartBtn = document.getElementById("heart");
  let pauseBtn = document.getElementById("pause");
  let commentForm = document.getElementById("comment-form");
  let commentInput = document.getElementById("comment-input");
  let commentList = document.getElementById("list");
  let likesList = document.querySelector(".likes");

  let count = 0;
  let isPaused = false;
  let interval = setInterval(updateCounter, 1000);

  function updateCounter() {
    if (!isPaused) {
      count++;
      counter.innerText = count;
    }
  }

  plusBtn.addEventListener("click", () => {
    count++;
    counter.innerText = count;
  });

  minusBtn.addEventListener("click", () => {
    count--;
    counter.innerText = count;
  });

  heartBtn.addEventListener("click", () => {
    let existingLike = document.getElementById(`like-${count}`);
    if (existingLike) {
      let likeCount = parseInt(existingLike.dataset.count) + 1;
      existingLike.dataset.count = likeCount;
      existingLike.innerText = `${count} has been liked ${likeCount} times`;
    } else {
      let li = document.createElement("li");
      li.id = `like-${count}`;
      li.dataset.count = 1;
      li.innerText = `${count} has been liked 1 time`;
      likesList.appendChild(li);
    }
  });

  pauseBtn.addEventListener("click", () => {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(interval);
      pauseBtn.innerText = "resume";
      plusBtn.disabled = true;
      minusBtn.disabled = true;
      heartBtn.disabled = true;
    } else {
      interval = setInterval(updateCounter, 1000);
      pauseBtn.innerText = "pause";
      plusBtn.disabled = false;
      minusBtn.disabled = false;
      heartBtn.disabled = false;
    }
  });

  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let commentText = commentInput.value.trim();
    if (commentText !== "") {
      let p = document.createElement("p");
      p.innerText = commentText;
      commentList.appendChild(p);
      commentInput.value = "";
    }
  });
});
