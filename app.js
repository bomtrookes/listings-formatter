const Fri = {}
const Sat = {}
const Sun = {}
const Mon = {}
const Tue = {}
const Wed = {}
const Thu = {}

let textbox = document.querySelector('#times')
let cinema = document.querySelector("#cinema")

let config = () => {
  let fri = JSON.stringify(Fri)
  let sat = JSON.stringify(Sat)
  let sun = JSON.stringify(Sun)
  let mon = JSON.stringify(Mon)
  let tue = JSON.stringify(Tue)
  let wed = JSON.stringify(Wed)
  let thu = JSON.stringify(Thu)
  textbox.innerText = `
  ${cinema.value} Weekly Listings: ${dates[0]} - ${dates[6]}\n\n
  ${dates[0]}\n\n${clean(fri)}\n\n
  ${dates[1]}\n\n${clean(sat)}\n\n
  ${dates[2]}\n\n${clean(sun)}\n\n
  ${dates[3]}\n\n${clean(mon)}\n\n
  ${dates[4]}\n\n${clean(tue)}\n\n
  ${dates[5]}\n\n${clean(wed)}\n\n
  ${dates[6]}\n\n${clean(thu)}`
  copy.style.display = "block"
}

let btn_upload = document.getElementById('btn-upload-csv')
let upload_csv = document.getElementById('upload-csv')

let checkboxes = document.querySelectorAll(".tickbox")

btn_upload.addEventListener("click", ()=> {
  Papa.parse(upload_csv.files[0], {
    download: true,
    header: false,
    complete: function(rows) {
      rows.data.forEach((row) => {
        if(row[57] != "") { Fri[row[32]] = addAsterix(row[57], checkboxes[0]) }
        if(row[58] != "") { Sat[row[32]] = addAsterix(row[58], checkboxes[1]) }
        if(row[59] != "") { Sun[row[32]] = addAsterix(row[59], checkboxes[2]) }
        if(row[60] != "") { Mon[row[32]] = addAsterix(row[60], checkboxes[3]) }
        if(row[61] != "") { Tue[row[32]] = addAsterix(row[61], checkboxes[4]) }
        if(row[62] != "") { Wed[row[32]] = addAsterix(row[62], checkboxes[5]) }
        if(row[63] != "") { Thu[row[32]] = addAsterix(row[63], checkboxes[6]) }

        // if(row[57] != "") { Fri[row[32]] = row[57] }
        // if(row[58] != "") { Sat[row[32]] = row[58] }
        // if(row[59] != "") { Sun[row[32]] = row[59] }
        // if(row[60] != "") { Mon[row[32]] = row[60] }
        // if(row[61] != "") { Tue[row[32]] = row[61] }
        // if(row[62] != "") { Wed[row[32]] = row[62] }
        // if(row[63] != "") { Thu[row[32]] = row[63] }
      })
      config()
    }
  })
  btn_upload.style.display = "none"
})

let clean = (day) => {
  return day
      .replaceAll("=>", " ")
      .replaceAll('"', " ")
      .replaceAll('{', "")
      .replaceAll('}', "")
      .replaceAll("�", "'")
      .replaceAll(", undefined", "")
      .replaceAll(/\s\:/g, "")
      .replaceAll(/\s\,\s(?=[A-Z])/g, '\n')
}

const weekStart = document.getElementById('week-start');
const startDateInput = document.getElementById('date-select');

const dates = [];

startDateInput.addEventListener('change', function() {

  const startDate = new Date(startDateInput.value);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateString = date.toDateString();
    const parts = dateString.split(' ');
    dates.push(`${parts[0]} ${parts[2]} ${parts[1]}`);
  }

  weekStart.innerHTML += ` ${dates[0]}`
  startDateInput.style.display = "none";
});

function addAsterix(str, param) {
  if (str === undefined) { return ''; }
  console.log("line 98", str, param.checked)
  const match = str.match(/\d{2}:\d{2}/g);
  if (!match || match.length === 0) { return str };


  const times = match;
  const threshold = new Date();
  threshold.setHours(17, 0, 0, 0);
  const date = new Date();
  const formatted = []

  times.map((time) => {
    date.setHours(...time.split(":"));
    if (date < threshold && param.checked == true) {
      formatted.push(`*${time}`);
      console.log("line 114 - if formatted", time, param.checked)
    } else {
      formatted.push(time.toString())
      console.log("line 117 - else formatted", time, param.checked)
    }
  })
  console.log("line 120 - formatted", formatted)
  return formatted.filter(Boolean).join(", ");
}

const copy = document.querySelector("#copy")

const copyText = () => {
  const textToCopy = textbox.innerText;
  const textArea = document.createElement("textarea");
  textArea.value = textToCopy;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
  copy.innerHTML = '<p><i class="bi bi-clipboard-check"></i> Copied to clipboard</p>'
}
