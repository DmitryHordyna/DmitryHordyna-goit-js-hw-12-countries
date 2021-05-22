class CountdownTimer {
  constructor({ selector, targetDate, day, hour, minute, second }) {
    this.element = document.querySelector(selector);
    this.targetDate = targetDate;

    this.dayRef = day;
    this.hourRef = hour;
    this.minuteRef = minute;
    this.secondRef = second;

    this.init();
  }

  init() {
    setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = this.targetDate - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.markupClockFace(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  markupClockFace({ days, hours, mins, secs }) {
    this.dayRef.textContent = days;
    this.hourRef.textContent = hours;
    this.minuteRef.textContent = mins;
    this.secondRef.textContent = secs;
  }
}

new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 20, 2022'),

  day: document.querySelector('span[data-value="days"]'),
  hour: document.querySelector('span[data-value="hours"]'),
  minute: document.querySelector('span[data-value="mins"]'),
  second: document.querySelector('span[data-value="secs"]'),
});
