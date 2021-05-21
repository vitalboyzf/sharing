export function formatDate(date, tag) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, 0);
    const day = d.getDate().toString().padStart(2, 0);
    const hour = d.getHours().toString().padStart(2, 0);
    const minute = d.getMinutes().toString().padStart(2, 0);
    const second = d.getSeconds().toString().padStart(2, 0);
    if (!tag) {
        return `${year}-${month}-${day}`;
    }
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function getDifferenceTimer(date) {
    const d = +new Date(date);
    const cur = Date.now();
    const dis = cur - d;
    const second = dis / 1000; // 秒
    const minute = second / 60; // 分钟
    const hour = minute / 60;
    const day = hour / 24;
    const month = day / 30;
    const year = month / 12;
    if (year > 1) return Math.floor(year) + "年";
    if (month > 1) return Math.floor(month) + "月";
    if (day > 1) return Math.floor(day) + "天";
    if (hour > 1) return Math.floor(hour) + "小时";
    if (minute > 1) return Math.floor(minute) + "分钟";
    return "刚刚";
}