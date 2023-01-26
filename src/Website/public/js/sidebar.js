let sidebar = document.querySelector(".sidebar");
  let closeBtn = document.querySelector("#btn");

  closeBtn.addEventListener("click", ()=>{
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
   if(sidebar.classList.contains("open")){
     closeBtn.classList.replace("fa-bars", "fa-chevron-left");
   } else {
     closeBtn.classList.replace("fa-chevron-left","fa-bars");
   }
  }