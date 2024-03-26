// alert("js wokred")

const credentialspage_btn = () => {
  const credentialspage = (document.getElementById(
    "credentialspage"
  ).style.display = "none");
  const mainpage = document.getElementById("mainpage");
  mainpage.style.display = "flex";
  mainpage.style.flexDirection = "column";
  mainpage.style.alignItems = "center";

  //   mainpage.style.justifyContent = "center";
};
// read more function->
// function toggleContent() {
//     var container = document.getElementById("container");
//     var btnText = document.getElementById("readMoreBtn");

//     if (container.classList.contains("showContent")) {
//       container.classList.remove("showContent");
//       btnText.innerHTML = "Read More";
//     } else {
//       container.classList.add("showContent");
//       btnText.innerHTML = "Read Less";
//     }
//   }
//ends
