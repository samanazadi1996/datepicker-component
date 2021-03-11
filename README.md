<div dir="rtl">
   <center>
   <h1>
   انتخابگر تاریخ
   </h1>

<img src="https://raw.githubusercontent.com/samanazadi1996/datepicker-component/master/Images/Image1.png">
</center>

.با سلام خدمت برنامه نویسان عزیز
از انجایی که این انتخابگر تاریخ برای انتخاب تاریخ های شمسی طراحی شده است ما این مقاله را با زبان فارسی برای شما تهیه کردیم
از جمله مشکلاتی که ما برنامه نویسان  با آن مواجه هستیم وارد کردن تاریخ شمسی با یک فرمت مناسب  بدون وابسته کردن پروژه به پکیج های تبدیل تاریخ در صفحات وب است .
در اینجا ما به کلی این مشکل را برطرف خاهیم کرد.


## ویژگی ها
- انتخاب تاریخ شمسی بدون دسکاری شدن فرمت و ارسال ان به سمت سرور
- انتخاب تاریخ شمسی که در زمان پست کردن فرم تاریخ به صورت میلای به سمت سرور ارسال می شود
- تبدیل تاریخ های شمسی به میلادی و بلعکس در قسمت هایی که لازم به نمایش تاریخ با فرمت دلخواه برنامه نویس

برای استفاده از این پروژه کافیست فایل      PersianDateTimePicker.js  رابه پروژه خود اضافه کنید
> لازم به ذکر است که ما برای استفاده از این کامپوننت باید اسکریپت  
jquery
را هم در کنار  انتخابگر تاریخ اضافه کنیم که پیشنهاد من برای اضافه کردن آن استفاده از
cdn jquery
است
</div>

```sh
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
```
<div dir="rtl">
 در ساده ترین حال میتوانید میتوانید به صورت زیر از انتخابگر تاریخ استفاده کنید 
</div>

```sh
<input type="text" id="date" />
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script src="PersianDateTimePicker.js"></script>
<script>
    $("#date").SA_DatePicker(); 
</script>
```
<div dir="rtl">
 برای شخصی سازی انتخابگر میتواند از خاصیت های زیر استفاده کنید
</div>

| خاصیت | توضیحات |
| ------ | ------ |
| maxyear  | با افزودن این ویژگی حداکثر سال انتخابی را مشخص میکنید  |
| minyear  | این ویژگی حداقل سال انتخابی را برای ما مشخص میکند |
| required | اجباری کردن تاریخ |
| class    | افزودن کلاس به لیست کشویی که معمولا برای طرح دادن به آن استفاده میشود |
| bodyClass  |برای افزودن طرح به جدول اصلی استفاده میشود  |
| type   |نوع تاریخ هنگام ارسال فرم را مشخص میکند  |

<div dir="rtl">
برای انتخاب تاریخ به صورت شمسی و ثبت شدن آن به صورت میلادی هنگام ارسال فرم 
type
را برابر با  
"Gregorian"
قرار بدهید

 به صورت کلی میتوانید به صورت زیر از  انتخابگر تاریخ استفاده کنید
</div>

```sh
<input type="text" id="date" />
<script src="https://code.jquery.com/jquery-3.5.0.js"></script>
<script src="PersianDateTimePicker.js"></script>
<script>
$("#date").SA_DatePicker({
        maxyear: 1399
        minyear: 1375,
        required: true,
        class: "class1 class2 Class3",
        bodyClass: "class1,
        type: "Gregorian",
      });
</script>
```
<div dir="rtl">
 در ادامه برای  تبدیل تاریخ های میلادی به شمسی برای نمایش در جداول  خود میتوانید به صورت زیر این کار را به راحتی انجام دهید که تاریخ میلادی داخل ان المنت را گرفته و به فارسی تبدیل میکند و در همان جا آن را به نمایش می گذارد
</div>

```sh
<p class="date">1996-07-04T12:00:00-06:30</p> 
<script>
      $(".date").ToPersianDateTime();
</script>
```
<div dir="rtl">
 و همچنین شما میتوانید از توابع به کاربرده شده برای دیگر کار های خود به صورت مستقیم در پروژه خود استفاده کنید
</div>


|تابع ها | توضیحات |
| ------ | ------ |
| getPersianYear()   | سال جاری را به صورت شمصی برمیگرداند  |
| getGregorianYear() | سال جاری را به صورت میلادی برمیگرداند |
| PersianDateToGregorianDate("1375/4/14")   | تاریخ درج شده را به صورت میلادی برمیگرداند |
| GregorianDateToPersianDate("2020-10-19","shortdate")| تاریخ را به صورت شمسی به فرمت کوتاه برمیگرداند |
| GregorianDateToPersianDate("2020-10-19","longdate")| برای برگرداندن تاریخ و ساعت به صورت کامل استفاده میشود|
