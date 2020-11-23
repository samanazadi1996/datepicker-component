//repositories in github.com
//https://github.com/samanazadi1996/datepicker-component
//moore component https://github.com/samanazadi1996

jQuery.fn.extend({
  SA_DedePicker: function (model = false) {
    return this.each(function () {
      this.style.display = "none";
      this.parentElement.setAttribute("dir", "ltr");
      var SA_Element = "S_A_" + new_guid().replaceAll("-", "_");
      this.setAttribute("sa_date", SA_Element);

      var select_year = document.createElement("select");
      var select_month = document.createElement("select");
      var select_day = document.createElement("select");

      var maxyear = getYearPersian();
      var minyear = getYearPersian() - 80;
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
      for (let index = 1; index <= 12; index++) {
        select_month.innerHTML += namInitializationValue(
          index,
          this.value ? IVal[1] : 0
        );
      }
      for (let index = 1; index <= 31; index++) {
        select_day.innerHTML += namInitializationValue(
          index,
          this.value ? IVal[2] : 0
        );
      }

      var table = document.createElement("table");
      table.setAttribute("onchange", "Sa_Date_change('" + SA_Element + "')");

      var td_year = document.createElement("td");
      var td_month = document.createElement("td");
      var td_day = document.createElement("td");
      td_year.appendChild(select_year);
      td_month.appendChild(select_month);
      td_day.appendChild(select_day);

      if (model.class) {
        select_year.setAttribute("class", model.class);
        select_month.setAttribute("class", model.class);
        select_day.setAttribute("class", model.class);
      }

      if (model.bodyClass) {
        table.setAttribute("class", model.bodyClass);
      }

      select_year.setAttribute("id", SA_Element + "_Sa_Date_Select_year");
      select_month.setAttribute("id", SA_Element + "_Sa_Date_Select_month");
      select_day.setAttribute("id", SA_Element + "_Sa_Date_Select_day");

      table.appendChild(td_year);
      table.appendChild(td_month);
      table.appendChild(td_day);

      this.insertAdjacentHTML("afterEnd", table.outerHTML);
    });
  },
});
function Sa_Date_change(inp) {
  var elements = document.querySelectorAll('[sa_date="' + inp + '"]');
  var y = document.getElementById(inp + "_Sa_Date_Select_year").value;
  var m = document.getElementById(inp + "_Sa_Date_Select_month").value;
  var d = document.getElementById(inp + "_Sa_Date_Select_day").value;
  if (y == "سال" || m == "ماه" || d == "روز") {
    elements[0].value = "";
  } else {
    var data = String(y) + "/" + String(m) + "/" + String(d);
    elements[0].value = data;
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
function getYearPersian() {
  let today = new Date().toLocaleDateString("fa-IR");
  var getNowPersianNumber = today.split("/")[0];
  return parseInt(
    getNowPersianNumber
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
  );
}
function new_guid() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}
