var token = sessionStorage.getItem('accstoken');

if (token === null){
  window.location.href = "../index.html";
}

const SUPABASE_URL = "https://yspyqlodogzmrqsifbww.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcHlxbG9kb2d6bXJxc2lmYnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgwOTMxNTYsImV4cCI6MjAxMzY2OTE1Nn0.YjQ-8W-UKbg5JPOO0q3aWT2eXjXe593IlxhkZVSAqkk";

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//////////////////////////////////// user display
async function fetchUsername() {
    var id1 = sessionStorage.getItem("uid1");
    var type = sessionStorage.getItem("z");
  
    const { data, error } = await _supabase
      .from("user_accs")
      .select("username")
      .eq("id", id1);
  
    if (error) {
      console.error("Error fetching username:", error.message);
      return;
    }
  
    // Check if data is not empty
    if (data && data.length > 0) {
      const username = data[0].username;
  
      const usertab = document.querySelector(".username");
  
      if (usertab) {
        h4 = document.createElement("h4");
        h4.innerHTML = username;
  
        h6 = document.createElement("h6");
        h6.innerHTML = `${id1} (${type})`;
  
        usertab.appendChild(h4);
        usertab.appendChild(h6);
      } else {
        console.error("Element with class 'vfile' not found.");
      }
  
      // Now, you can use the 'username' variable as needed.
    } else {
      console.log("User not found with ID:", id);
    }
  }
  
  ////////// display corresponding user pic
  async function fetchUserPic() {
    var id1 = sessionStorage.getItem("uid1");
    const piclink = id1 + ".png";
  
    const userpiclink = `${SUPABASE_URL}/storage/v1/object/public/userimages/${piclink}`;
  
    const userTab = document.querySelector(".user");
    const usernameDiv = document.querySelector(".username");
  
  
    const img = document.createElement("img");
    img.setAttribute("src", userpiclink);
  
    userTab.insertBefore(img, usernameDiv);
  }
  
  fetchUserPic();
  fetchUsername();


function cert02(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTybn7jCZKaiet2ZZDD91LUQpAx0b7X4D5xq27tXgLxWu0w1DfslolWqKA42Q2PJ4ueFYN8B9FYeTQ9/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
    const buttons = document.querySelectorAll(".formbutt, .activebuttform");

    buttons.forEach((btn) => {
        btn.classList.remove("activebuttform");
        btn.classList.add("formbutt");
    });

    button.classList.remove('formbutt');
    button.classList.add('activebuttform');

    
    ///managing section
    const filtersdiv = document.querySelector(".filters1");

    const sheetlink1 = "https://docs.google.com/spreadsheets/d/1uVqbtw1zskjAE-q4m4UXVQYTbG8ID3nrH3JW7Qu7450/edit?usp=sharing";

    //clear div
    filtersdiv.innerHTML = '';

    // create generate button
    const generate = document.createElement("button");
    generate.classList.add("addrecbutt");
    generate.setAttribute("onclick", "showp()");
    generate.innerHTML = 'GENERATE +';

    // create manage button
    const manage = document.createElement("a");
    manage.setAttribute("href", sheetlink1);
    manage.setAttribute("target", "blank");
    manage.innerHTML = 'Manage SpreadSheet >>';

    filtersdiv.appendChild(manage);
    filtersdiv.appendChild(generate);

}

function cert03(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQWZSQWaU4XFFVjVvGn_YVnGd_Uzi5m_GGa7gWkWd7BFwjh06OA3bOOCtavp8gteC58-Gz-kep5iJFj/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
    const filtersdiv = document.querySelector(".filters1");
    const sheetlink1 = "https://docs.google.com/spreadsheets/d/1BtQl7BKrm8YaP9ErymQ97itcYcMjrzOCD8WQSFE9TuY/edit?usp=sharing";

    //clear div
    filtersdiv.innerHTML = '';

    // create generate button
    const generate = document.createElement("button");
    generate.classList.add("addrecbutt");
    generate.setAttribute("onclick", "showp()");
    generate.innerHTML = 'GENERATE +';

    // create manage button
    const manage = document.createElement("a");
    manage.setAttribute("href", sheetlink1);
    manage.setAttribute("target", "blank");
    manage.innerHTML = 'Manage SpreadSheet >>';

    filtersdiv.appendChild(manage);
    filtersdiv.appendChild(generate);
}

function cert04(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR7B30WKNsUp1_1PyUuZqV2VjmVlDwnu1PBEM0q-ZD1OMZrrQ6_FPVjImo_HmzZNo0-6HGgefYMM5mx/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/1lkpjfAWUGLhkY-I2riz2wIFHxnBjf0FCKgd2oQi8Fxs/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function cert05(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQt-xM01oDkB3Gss480mAO8nBP03-CxSC_V_NsjD6OCyz4F9MAUVxrRnRt4pb6WXLb_hlYfVKttG7i3/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/1IJb6Xl4GwP-Xmym8FBdpJTWr50-f83nli4laaxnNpFY/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function cert06(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcQYjOnWIZjqdAffyrMzDbv2pBnfs-E27riRc-lkxsJ6Tdbfzw7RV4IQi2tWv2mjuYzRjg6V8UL6th/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/1e1QjZpj5MptIrWKuoS_RJaEMchVjtDV4SpS2yThuzic/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function cert07(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRLNFR7nMcIkg8p2lBFNxytfAcJCbTMqJK9JR2Ls-TGM_0_S312bnCQShuM9FNxE0B0EDbO7N6uJOxQ/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/1ZBxMJDJL7PhPyseMugB9lBhpJtixJBh_YFYmwLHQ7Xg/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function cert08(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQzBu3WfveA5YfMaITu3Cq4Y5PE3KZb0S-CBUo-53dZNpFZaE5FK3sXphdOO8TWKmqHs2mdYRg6xir4/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/1LIG0wx-NJDGu_aPH0CIuIC11axLUQXwW6WLox-fUtBQ/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function cert09(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTxYWqAjI6URyLPKCjjJj16kyvZ1MZmc1idry2G2Y48mwuSJiimfPDYQc9O95IXb9nXJT4uBF9gGlna/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/1mK_fymE99j9MYSHlaY8CrPXYyoOPlZODPENN4Z3dIzA/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function cert10(button){

    const certcont = document.getElementById('medcert-cont');
    certcont.innerHTML = '';

    const formlink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQMMgQlyCGC5GAYiooIQO-J74rzkLqPPI8RWvOv1TVwj3uIy5ildML6k0nCXc2D6YHabrSyeYRQXx9M/pubhtml?widget=true&amp;headers=false";

    const sheetlink = document.createElement('iframe');

    sheetlink.setAttribute("scrolling", "no");
    sheetlink.setAttribute("src", formlink);

    certcont.appendChild(sheetlink);

     // Remove the "activebuttform" class from all buttons
     const buttons = document.querySelectorAll(".formbutt, .activebuttform");

     buttons.forEach((btn) => {
         btn.classList.remove("activebuttform");
         btn.classList.add("formbutt");
     });
 
     button.classList.remove('formbutt');
     button.classList.add('activebuttform');
    
     ///managing section
     const filtersdiv = document.querySelector(".filters1");
     const sheetlink1 = "https://docs.google.com/spreadsheets/d/191u-2221YTCLfFSARGCU1K0_JZFrrcmOToy5G5ihG00/edit?usp=sharing";
 
     //clear div
     filtersdiv.innerHTML = '';
 
     // create generate button
     const generate = document.createElement("button");
     generate.classList.add("addrecbutt");
     generate.setAttribute("onclick", "showp()");
     generate.innerHTML = 'GENERATE +';
 
     // create manage button
     const manage = document.createElement("a");
     manage.setAttribute("href", sheetlink1);
     manage.setAttribute("target", "blank");
     manage.innerHTML = 'Manage SpreadSheet >>';
 
     filtersdiv.appendChild(manage);
     filtersdiv.appendChild(generate);    
}

function gcert02(){
    window.open('https://forms.gle/mLVr7KQ3WEhyomWu6', '_blank');
}
function gcert03(){
    window.open('https://forms.gle/kEssM3EXtvLyDRST7', '_blank');
}
function gcert04(){
    window.open('https://forms.gle/pwLWqymsR9zTbz3W7', '_blank');
}
function gcert05(){
    window.open('https://forms.gle/ocGJLn2wcEEp5C3K6', '_blank');
}
function gcert06(){
    window.open('https://forms.gle/hHGT2hV6VRJGyFE17', '_blank');
}
function gcert07(){
    window.open('https://forms.gle/xsfXf66nrjseCDML6', '_blank');
}
function gcert08(){
    window.open('https://forms.gle/gWAMarj6awgMH5iY6', '_blank');
}
function gcert09(){
    window.open('https://forms.gle/aR8ssYdVzfaLCw6M9', '_blank');
}
function gcert10(){
    window.open('https://forms.gle/YJiK6hVCrEzTEBkb8', '_blank');
}

access();

////////////// access initialization
function access(){
  var type = sessionStorage.getItem("z");

  if (type == "Doctor"){
    document.getElementById("vcert07").disabled = true;
    document.getElementById("vcert10").disabled = true;

    document.getElementById("gcert07").disabled = true;
    document.getElementById("gcert10").disabled = true;
  }
  if (type == "Nurse" || type == "Cert"){
    document.getElementById("vcert02").disabled = true;
    document.getElementById("vcert03").disabled = true;
    document.getElementById("vcert04").disabled = true;
    document.getElementById("vcert08").disabled = true;
    document.getElementById("vcert09").disabled = true;

    document.getElementById("gcert02").disabled = true;
    document.getElementById("gcert03").disabled = true;
    document.getElementById("gcert04").disabled = true;
    document.getElementById("gcert08").disabled = true;
    document.getElementById("gcert09").disabled = true;

    document.getElementById("formview").setAttribute('src', "https://docs.google.com/spreadsheets/d/e/2PACX-1vQt-xM01oDkB3Gss480mAO8nBP03-CxSC_V_NsjD6OCyz4F9MAUVxrRnRt4pb6WXLb_hlYfVKttG7i3/pubhtml?widget=true&amp;headers=false");

    document.getElementById('vcert02').classList.remove('activebuttform');
    document.getElementById('vcert02').classList.add('formbutt');

    document.getElementById('vcert05').classList.add('activebuttform');
    document.getElementById('vcert05').classList.remove('formbutt');

    document.getElementById('manageform').setAttribute('href', 'https://docs.google.com/spreadsheets/d/1IJb6Xl4GwP-Xmym8FBdpJTWr50-f83nli4laaxnNpFY/edit?usp=sharing');
  }

}