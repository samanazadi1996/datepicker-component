jQuery.fn.extend({
  check: function (model = false) {
    return this.each(function () {
      var elementId = this.getAttribute("id");
      var select_year = document.createElement("select");
      var select_month = document.createElement("select");
      var select_day = document.createElement("select");

      let today = new Date().toLocaleDateString("fa-IR");
      var getNowPersianNumber = today.split("/")[0];
      var getNow = getNowPersianNumber
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

      var maxyear = parseInt(getNow);
      var minyear = parseInt(getNow) - 80;
      if (!(String(model.required).toLowerCase() == "true")) {
        select_year.innerHTML = "<option>سال</option>";
        select_month.innerHTML = "<option>ماه</option>";
        select_day.innerHTML = "<option>روز</option>";
      }

      if (model) {
        if (model.maxyear) {
          maxyear = model.maxyear;
        }
        if (model.minyear) {
          minyear = model.minyear;
        }
      }

      if (this.value) {
        var IVal = this.value.split("/");
      }

      for (let index = minyear; index <= maxyear; index++) {
        select_year.innerHTML += namInitializationValue(
          index,
          this.value ? IVal[0] : 0
        );
      }
      for (let index = 1; index <= 31; index++) {
        select_day.innerHTML += namInitializationValue(
          index,
          this.value ? IVal[1] : 0
        );
      }
      for (let index = 1; index <= 12; index++) {
        select_month.innerHTML += namInitializationValue(
          index,
          this.value ? IVal[2] : 0
        );
      }

      var table = document.createElement("table");
      table.setAttribute("onchange", "Sa_Date_change(" + elementId + ")");

      var td_year = document.createElement("td");
      var td_month = document.createElement("td");
      var td_day = document.createElement("td");
      td_month.appendChild(select_month);
      td_year.appendChild(select_year);
      td_day.appendChild(select_day);

      // select_year.setAttribute("inp", elementId);
      // select_month.setAttribute("inp", elementId);
      // select_day.setAttribute("inp", elementId);

      if (model.class) {
        select_year.setAttribute("class", model.class);
        select_month.setAttribute("class", model.class);
        select_day.setAttribute("class", model.class);
      }

      select_year.setAttribute("id", elementId + "_Sa_Date_Select_year");
      select_month.setAttribute("id", elementId + "_Sa_Date_Select_month");
      select_day.setAttribute("id", elementId + "_Sa_Date_Select_day");

      table.appendChild(td_year);
      table.appendChild(td_month);
      table.appendChild(td_day);

      this.insertAdjacentHTML("afterEnd", table.outerHTML);
    });
  },
});
function Sa_Date_change(inp) {
  var elementId = inp.getAttribute("id");

  var y = document.getElementById(elementId + "_Sa_Date_Select_year").value;
  var m = document.getElementById(elementId + "_Sa_Date_Select_month").value;
  var d = document.getElementById(elementId + "_Sa_Date_Select_day").value;
  if (y == "سال" || m == "ماه" || d == "روز") {
    inp.value = "";
  } else {
    var d = String(y) + "/" + String(m) + "/" + String(d);
    inp.value = d;
  }
}
function namInitializationValue(number, IVal) {
  return (
    "<Option value='" +
    get2D(number) +
    "'" +
    (Number(number) == Number(IVal) ? " selected" : "") +
    ">" +
    get2D(number) +
    "</Option>"
  );
}
function get2D(num) {
  return (num.toString().length < 2 ? "0" + num : num).toString();
}
