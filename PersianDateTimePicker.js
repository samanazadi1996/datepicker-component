//repositories in github.com
//https://github.com/samanazadi1996/PersianDatePicker
//more component https://github.com/samanazadi1996

jQuery.fn.extend({
    SA_DatePicker: function (model = false) 
    {
        return this.each(function () {
            this.style.display = "none";
            this.parentElement.setAttribute("dir", "ltr");
            var SA_Element = "S_A_" + new_guid().replace(/[()-\s]+/g, '_');
            this.setAttribute("sa_date", SA_Element);

            var select_year = document.createElement("select");
            var select_month = document.createElement("select");
            var select_day = document.createElement("select");

            var maxyear = getPersianYear();
            var minyear = getPersianYear() - 80;

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
                if (this.value.includes("/")) {
                    var IVal = this.value.split("/");
                }
                if (this.value.includes("-")) {

                    var IVal = GregorianDateToPersianDate(this.value, "shortdate").toString().split("/");
                }
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
            if (model.type && String(model.type).toLowerCase().trim() == "gregorian") {
                table.setAttribute("onchange", "Sa_Date_change_jalaliToGregorian('" + SA_Element + "')");

            } else {
                table.setAttribute("onchange", "Sa_Date_change_jalali('" + SA_Element + "')");
            }

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
    }
});
jQuery.fn.extend({
    ToPersianDateTime:function (model = false)
        {
            return this.each(function () 
            {
                var ElementText = this.innerHTML;
                var NewDate = new Date(ElementText);
                var typeDate = "ShortDate";
                if (model && model.trim().toLowerCase()=="longdate") {
                    var typeDate = "LongDate";
                }
                var PersianDate = GregorianDateToPersianDate(NewDate, typeDate);
                this.innerHTML = PersianDate;
            });
        }
});
function Sa_Date_change_jalali(inp) {
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
function Sa_Date_change_jalaliToGregorian(inp) {
    var elements = document.querySelectorAll('[sa_date="' + inp + '"]');
    var y = document.getElementById(inp + "_Sa_Date_Select_year").value;
    var m = document.getElementById(inp + "_Sa_Date_Select_month").value;
    var d = document.getElementById(inp + "_Sa_Date_Select_day").value;
    if (y == "سال" || m == "ماه" || d == "روز") {
        elements[0].value = "";
    } else {
        var GregoriangDate = jalaliToGregorian(y, m, d);

        var data = String(GregoriangDate[0]) + "-" + String(GregoriangDate[1]) + "-" + String(GregoriangDate[2]);
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
function PersianDateToGregorianDate(date) {
    var year="";
    var Month="";
    var day="";
    if (date.includes('-')) {
        year=date.split('-')[0];
        Month=date.split('-')[1];
        day=date.split('-')[2];
    }else{
        year=date.split('/')[0];
        Month=date.split('/')[1];
        day=date.split('/')[2];

    }   
    return (jalaliToGregorian(
        year,
        Month,
        day
      ).join("/")).toString();
}
function GregorianDateToPersianDate(date, typeDate) {
    let PDate;
    if (typeDate.toLowerCase() == "shortdate") {
        PDate = new Date(date).toLocaleDateString("fa-IR");
    } else {
        PDate = new Date(date).toLocaleString("fa-IR");
    }
    return PDate.toString()
        .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
        .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}
function getPersianYear() {
    let today = new Date().toLocaleDateString("fa-IR");
    var getNowPersianNumber = today.split("/")[0];
    return parseInt(
        getNowPersianNumber
            .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
            .replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d))
    );
}
function getGregorianYear() {
    let year = new Date().getFullYear();
    return year;
}
function new_guid() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
        (
            c ^
            (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
}
function jalaliToGregorian(j_y, j_m, j_d) {
    j_y = parseInt(j_y);
    j_m = parseInt(j_m);
    j_d = parseInt(j_d);
    var jy = j_y - 979;
    var jm = j_m - 1;
    var jd = j_d - 1;

    var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
    for (var i = 0; i < jm; ++i) j_day_no += JalaliDate.j_days_in_month[i];

    j_day_no += jd;

    var g_day_no = j_day_no + 79;

    var gy = 1600 + 400 * parseInt(g_day_no / 146097); /* 146097 = 365*400 + 400/4 - 400/100 + 400/400 */
    g_day_no = g_day_no % 146097;

    var leap = true;
    if (g_day_no >= 36525) /* 36525 = 365*100 + 100/4 */ {
        g_day_no--;
        gy += 100 * parseInt(g_day_no / 36524); /* 36524 = 365*100 + 100/4 - 100/100 */
        g_day_no = g_day_no % 36524;

        if (g_day_no >= 365) g_day_no++;
        else leap = false;
    }

    gy += 4 * parseInt(g_day_no / 1461); /* 1461 = 365*4 + 4/4 */
    g_day_no %= 1461;

    if (g_day_no >= 366) {
        leap = false;

        g_day_no--;
        gy += parseInt(g_day_no / 365);
        g_day_no = g_day_no % 365;
    }

    for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
        g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
    var gm = i + 1;
    var gd = g_day_no + 1;

    gm = gm < 10 ? "0" + gm : gm;
    gd = gd < 10 ? "0" + gd : gd;

    return [gy, gm, gd];
}
JalaliDate = {
    g_days_in_month: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    j_days_in_month: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};
