let loadDataCount = 4;

function loadData(data) {
    console.log(data);
    const container = document.querySelector(".layout-container");
    const filteredData = data.slice(0, loadDataCount);

    const html = filteredData.map(item => {
        if (item.source_type === 'instagram') {
        return `
        <div class="layout ${document.body.classList.contains("dark-mode") ? "dark-layout" : ""} ">
            <div class="layout-header">
                <div id="ProfileImage" ${document.body.classList.contains("dark-mode") ? 'class="dark-layout"' : ""} >
                    <img src=${item.profile_image}>
                </div>
                <div id="ProfileName">
                    <span>${item.name}</span>
                </div>
            </div>
            <div id="PostImage">
                <img src="${item.image}" />
                <div class="PostImageOverlay${document.body.classList.contains("dark-mode") ? "dark-layout" : ""}">
                    <a href="${item.source_type === 'instagram' ? 'https://instagram.com/embedsocial/' : 'https://www.facebook.com/EmbedSocial/'}"> <img width="50" src="${item.source_type === 'facebook' ? 'https://cdn.cdnlogo.com/logos/f/74/facebook-3.svg' : 'https://tcoyd.org/wp-content/uploads/2020/12/instagram-circle-logo-transparent-hd-png-download-1024x1024-instagram-circle-png-840_880.jpg'}"> </a>
                </div>
            </div>
            <div class="PostFooter" >
            <div class="LikeShare" > <span id="InstaLike" > <img src="https://cdn.discordapp.com/attachments/1042219113189216320/1119237555326558278/heartBlack.png" width="30" > </span> <span id="InstaShare" > <img src="https://cdn.discordapp.com/attachments/1042219113189216320/1119237555926347776/commentBlack.png" width="30" > </span> </div>
                <strong id="Likes" >${FormatNumber(item.likes)} likes </strong>
                <br>
                <br>
                <span id="InstaCaption" > <strong>${item.name.split(" ")[0]}: </strong> ${item.caption}</span>
                <p id="date" >${FormatDate(item.date)}</p>
            </div>
        </div>
        `;
        }
        else{
            return `
            <div class="layout ${document.body.classList.contains("dark-mode") ? "dark-layout" : ""}">
                <div class="layout-header">
                    <div id="ProfileImage" ${document.body.classList.contains("dark-mode") ? 'class="dark-layout"' : ""}>
                        <img src=${item.profile_image}>
                    </div>
                    <div id="ProfileName">
                        <span>${item.name}</span>
                        <p id="date" >${FormatDate(item.date, "fb")}</p>
                    </div>
                </div>
                    <div class="PostFooter" >
                        <span id="FbCaption"> ${item.caption}</span>
                    </div>
                    <div id="PostImage">
                        <img src="${item.image}" />
                        <div class="PostImageOverlay ${document.body.classList.contains("dark-mode") ? "dark-layout" : ""}">
                            <a href="https://www.facebook.com/EmbedSocial/"> <img width="50" src="https://cdn.cdnlogo.com/logos/f/74/facebook-3.svg"> </a>
                        </div>
                    </div>
                    <div id="TopHr" ${document.body.classList.contains("dark-mode") ? 'class="dark-lines"' : ""} ></div>
                    <div class="LikeComment" > <span id="FbLike" > <img ${document.body.classList.contains("dark-mode") ? 'src="https://cdn.discordapp.com/attachments/1042219113189216320/1119355781444272159/pngegg.png" width="20"' : 'src="https://clipart-library.com/images_k/facebook-like-transparent-background/facebook-like-transparent-background-14.png"'} width="15" > Like </span> <span id="FbComment" > <img ${document.body.classList.contains("dark-mode") ? 'src="https://cdn.discordapp.com/attachments/1042219113189216320/1119237556299636757/commentWhite.png" width="20"' : 'src="https://cdn.discordapp.com/attachments/1042219113189216320/1119237555926347776/commentBlack.png"'} width="20" > Comment </span> </div>
                    <div id="BottomHr" ${document.body.classList.contains("dark-mode") ? 'class="dark-lines"' : ""} ></div>
                    <strong id="Likes" >${FormatNumber(item.likes)} likes </strong>
            </div>
            `;
        }
    }).join("");

  container.innerHTML = html;
  console.log("Data loaded");

  if (loadDataCount < data.length) {
    let loadbtn = false;
    document.addEventListener("scroll",  () => {
        if (IsBottom() && !loadbtn) {
            const button = "<div class='arrow'></div>"
            container.innerHTML += button;
            loadbtn = true;
            document.querySelector(".arrow").addEventListener("click", () => {
                loadDataCount += 4;
                loadData(data);
                Scale();
            });
        }
    })
  }
}


function IsBottom() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return scrollTop + windowHeight >= documentHeight;
}

function Scale () {
    console.log("Waiting");
    document.querySelectorAll("#PostImage img").forEach((item) => {
        item.addEventListener("click", () => {
            item.classList.toggle("scale");
        });
    });
}

function FormatNumber(likes) {
    if (likes > 999 && likes < 1000000) {
        return (likes / 1000).toFixed(1) + "K";
    }
    if (likes > 1000000) {
        return (likes / 1000000).toFixed(2) + "M";
    }
    return likes;
}

function FormatDate(date, media){
    const monthNames = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const compare = new Date();
    let format = date.split(" ")
    var SplitedDate = format[0].split("-");
    var FullDate = SplitedDate[2] + " " + monthNames[parseInt(SplitedDate[1])] + ", " + SplitedDate[0];
    var today = compare.getDay() + " " + monthNames[compare.getMonth() + 1] + ", " + compare.getFullYear();
    if (media == "fb") {
        return FullDate + " at " + format[1].split(":")[0] + ":" + format[1].split(":")[1];
    }
    else{
        return FullDate;
    }
}

async function fetchData() {
  try {
    const response = await fetch("data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}

async function getDataAndLoad() {
  try {
    const data = await fetchData();
    loadData(data);
  } catch (error) {
    console.log(error);
  }
}

getDataAndLoad().then( () => {
    Scale();
}).catch( (error) => {
    console.log(error);
});

document.querySelector('.slider').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll(".layout").forEach(item => {
        item.classList.toggle('dark-layout');
    });
    document.querySelectorAll("#ProfileImage").forEach(item => {
        item.classList.toggle('dark-layout');
    })
    document.querySelectorAll(".PostImageOverlay").forEach(item => {
        item.classList.toggle('dark-layout');
    }) 
    document.querySelectorAll("#FbLike img").forEach(item => {
        if (item.attributes.src.value === "https://cdn.discordapp.com/attachments/1042219113189216320/1119355781444272159/pngegg.png"){
            item.attributes.src.value = "https://clipart-library.com/images_k/facebook-like-transparent-background/facebook-like-transparent-background-14.png";
        }
        else{
            item.attributes.src.value = "https://cdn.discordapp.com/attachments/1042219113189216320/1119355781444272159/pngegg.png";
            item.attributes.width.value = "20";
        }
    });
    document.querySelectorAll("#FbComment img").forEach(item => {
        if (item.attributes.src.value === "https://cdn.discordapp.com/attachments/1042219113189216320/1119237556299636757/commentWhite.png"){
            item.attributes.src.value = "https://cdn.discordapp.com/attachments/1042219113189216320/1119237555926347776/commentBlack.png";
        }
        else{
            item.attributes.src.value = "https://cdn.discordapp.com/attachments/1042219113189216320/1119237556299636757/commentWhite.png";
        }
    });
    document.querySelectorAll("#TopHr, #BottomHr").forEach(item => {
        item.classList.toggle('dark-lines');
    });
});