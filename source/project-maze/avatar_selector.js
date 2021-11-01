let avatar_urls = [
  "files/player6.svg",
  "files/player1.svg",
  "files/player2.svg",
  "files/player5.svg",
  "files/player9.png",
  "files/player8.svg",
  "files/player10.svg",
  "files/player4.svg",
  "files/player3.svg",
  "files/player7.svg",
  "files/player11.svg",
  "files/player12.svg"
];

// Form list of avatars on the page:
for (let avatar_url of avatar_urls) {
  
  let avatar = createAvatar(avatar_url);
  avatar.onclick = avatarProc;
  addAvatar(avatar); // Add avatar on the page
}

function avatarProc() {
  // Clear previous select:
  let selected = document.querySelector(".avatar.selected");
  selected?.classList.remove("selected");
  
  // Select new avatar:
  this.classList.add("selected");
  soundClick.play();
} 

function createAvatar(url) {
  let avatar = document.createElement("div");
  avatar.classList.add("avatar");
  
  let image = document.createElement("img");
  image.src = url;
  avatar.append(image);
  
  return avatar;
}

function addAvatar(avatar) {
  let avatarsList = document.querySelector(".avatars-list");
  
  avatarsList.append(avatar);
}

function getUrlAvatar() {
  let avatar = document.querySelector(".avatar.selected");
  
  return avatar?.firstChild.src || "files/player1.svg";
}
