var closedHours = [];
var openHours = {};
var m = moment();
var newDay = moment().hour(0);
var currentTime = m.hour();

function clock() {
  var dateString = moment().format("MMMM Do YYYY, h:mm:ss a");
  $("#currentDay").html(dateString);
}

setInterval(clock, 1000);

for (var hour = 9; hour < 18; hour++) {
  closedHours.push(moment({ hour }).format("h  a"));
  $(".container").append(`<div class='row time-block' data-time='${hour}'>
       
           <div class='col-sm col-md-2 hour'>
             <p>${moment({ hour }).format("h  a")}</p>
           </div>
        
           <div class='col-sm col-md-10 d-flex description'>
              <div class='input-group'>
                <textarea class="form-control text-area"></textarea>
                <div class='input-group-append'>
                  <button class='save-button d-flex justify-center align-center'>
                    <i class='far fa-save fa-2x save-icon'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`);
}

$.each($(".time-block"), function (index, value) {
  let dateHour = $(value).attr("data-time");
  if (Number(dateHour) === m.hour()) {
    $(this).find("textarea").addClass("present");
  } else if (Number(dateHour) < m.hour()) {
    $(this).find("textarea").addClass("past").attr("disabled", "disabled");
    $(this).find(".save-button").addClass("disabled").attr("disabled", true);
  } else {
    $(this).find("textarea").addClass("future");
  }
});

if (currentTime >= 0 && currentTime < 9) {
  localStorage.clear();
}

if (localStorage.getItem("openHours")) {
  openHours = JSON.parse(localStorage.getItem("openHours"));
} else {
  openHours = {
    9: {
      time: "9",
      value: "",
    },
    10: {
      time: "10",
      value: "",
    },
    11: {
      time: "11",
      value: "",
    },
    12: {
      time: "12",
      value: "",
    },
    13: {
      time: "13",
      value: "",
    },
    14: {
      time: "14",
      value: "",
    },
    15: {
      time: "15",
      value: "",
    },
    16: {
      time: "16",
      value: "",
    },
    17: {
      time: "17",
      value: "",
    },
  };
}

$(".time-block").each(function () {
  $(this).find(".text-area").val(openHours[$(this).attr("data-time")].value);
});

$(".save-button").on("click", function (event) {
  event.preventDefault();

  var timeValue = $(this).closest(".time-block").attr("data-time");

  var textValue = $(this).closest(".time-block").find(".text-area").val();
  openHours[timeValue].value = textValue;

  localStorage.setItem("openHours", JSON.stringify(openHours));
});
