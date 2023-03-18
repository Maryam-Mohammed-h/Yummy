import {
  chooseType,
  displayCategoriesOnLoad,
} from "./modules/displayData.module.js";

$(function () {
  let sideBarWidth = $("#sideBarMenu").innerWidth();
  $("#sidebar").animate({ left: -sideBarWidth }, 1000);
  $(".loader").fadeOut(1000, function () {
    $(".loaderContainer").fadeOut(1000, function () {
      $("body").css("overflow", "auto");
      $(".loaderContainer").remove();
    });
  });
  $("#sideBarToggle").click(function () {
    if ($("#sidebar").css("left") == "0px") {
      $("#sidebar").animate({ left: -sideBarWidth }, 1000);
      $("#sidebarLinks  li").each(function (i) {
        $(this)
          .delay(100 * i)
          .animate({ opacity: 0, marginTop: 200 }, 500);
      });
    } else {
      $("#sidebar").animate({ left: "0px" }, 1000);
      $("#sidebarLinks  li")
        .delay(500)
        .each(function (i) {
          $(this)
            .delay(300 * i)
            .animate({ opacity: 1, marginTop: 0 }, 500);
        });
    }
  });

  let test = chooseType();
  let bodyCards = displayCategoriesOnLoad();
});
