import $ from 'jquery'
export default function updateDonutChart(el, percent, donut) {
    percent = Math.round(percent);
    if (percent > 100) {
        percent = 100;
    } else if (percent < 0) {
        percent = 0;
    }
    var deg = Math.round(360 * (percent / 100));

    if (percent > 50) {
        $(el + " .DonutProgressBar_pie").css("clip", "rect(auto, auto, auto, auto)");
        $(el + " .DonutProgressBar_right-side").css("transform", "rotate(180deg)");
    } else {
        $(el + " .DonutProgressBar_pie").css("clip", "rect(0, 1em, 1em, 0.5em)");
        $(el + " .DonutProgressBar_right-side").css("transform", "rotate(0deg)");
    }
    if (donut) {
        $(el + " .DonutProgressBar_right-side").css("border-width", "0.08em");
        $(el + " .DonutProgressBar_left-side").css("border-width", "0.08em");
        $(el + " .DonutProgressBar_shadow").css("border-width", "0.08em");
    } else {
        $(el + " .DonutProgressBar_right-side").css("border-width", "0.5em");
        $(el + " .DonutProgressBar_left-side").css("border-width", "0.5em");
        $(el + " .DonutProgressBar_shadow").css("border-width", "0.5em");
    }
    // $(el + " .num").text(percent);
    $(el + " .DonutProgressBar_left-side").css("transform", "rotate(" + deg + "deg)");
}