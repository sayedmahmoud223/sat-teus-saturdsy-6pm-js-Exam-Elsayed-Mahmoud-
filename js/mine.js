let data = [];
let dataCat = [];
let dataAny = [];
let dataMeal = [];
let dataMealCat = [];
let dataMealArea = [];
let dataMealIntag = [];


/////////////////////////////////////////////
// Get meal
async function getMeal(){
    let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let dataready = await Response.json();
    data = dataready.meals;
    //console.log(data);
    display();
}
//display meal
function display() {
    // $(".second").css({display: none});
    let cartona = ``;
    for (let i = 0; i < data.length; i++) {
        cartona += `
            <div class="col-md-3 main position-relative rounded-4">
                <img class="img-fluid" src="${data[i].strMealThumb}">
                <div class="hoverLay d-flex align-items-center">
                    <p>${data[i].strMeal}</p>
                </div>
            </div>
        `
    }
    document.getElementById("disp").innerHTML = cartona;
    $(".theMain").click(function (e) {
        async function getMeal(meal) {
            let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
            let dataready = await Response.json();
            dataMeal = dataready.meals;
            //console.log(data);
            displayMeal();
            console.log(e.target.innerText)
        }
        getMeal(e.target.innerText)
        function displayMeal() {
            let cartona = `<div class="col-md-3 py-5 text-white">
                <img class="img-fluid" src="${dataMeal[0].strMealThumb}">
                <p>${dataMeal[0].strMeal}</p>
            </div>
            <div class="col-md-9 py-5 text-white">
                <h3>instruction</h3>
                <p>${dataMeal[0].strInstructions}</p>
                <h3>Area : <span>${dataMeal[0].strArea}</span></h3>
                <h3>Category : <span>${dataMeal[0].strCategory}</span></h3>
                <h2>Tags</h2>
                <button class="btn btn-success"><a class="text-decoration-none text-light" href="${dataMeal[0].strSource}">Source</a></button>
                <button class="btn btn-danger"><a class="text-decoration-none text-light" href="${dataMeal[0].strYoutube}">Youtube</a></button>
                
            </div>`
            document.getElementById("disp").innerHTML = cartona;
        }

    })
}
getMeal();
///////////////////////////////////////////////
// onClick function meal

// end
///////////////////////////////////////////////
// getCat

// call Cat 
$(".menus_list .Cat").click(function(){
    async function getCat() {
        let Response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        let dataready = await Response.json();
        dataCat = dataready.categories;
        //console.log(dataCat);
        displayCat();
    }

    // display Cat
    function displayCat() {
        let cartona = ``;
        for (let i = 0; i < 14; i++) {
            cartona += `
            <div class="col-md-3 main position-relative rounded-4">
                <img class="img-fluid" src="${dataCat[i].strCategoryThumb}">
                <div class="hoverLay d-flex align-items-center">
                    <p>${dataCat[i].strCategory}</p>
                </div>
            </div>
        `
        }
        document.getElementById("disp").innerHTML = cartona;
        $("#mealDisp").empty();
        $(".theMain").click(function (e) {
            async function getMeal(mealCat) {
                let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${mealCat}`);
                let dataready = await Response.json();
                dataMealCat = dataready.meals;
                console.log(dataMealCat);
                displayMeal();
                console.log(e.target.innerText)
            }
            getMeal(e.target.innerText)
            function displayMeal() {
                let cartona = ``;
                for (let i = 0; i < dataMealCat.length; i++) {
                cartona += `
                <div class="col-md-3 main position-relative rounded-4">
                <img class="img-fluid" src="${dataMealCat[i].strMealThumb}">
                <div class="hoverLay d-flex align-items-center">
                    <p>${dataMealCat[i].strMeal}</p>
                </div>
                </div>
                `
                }
                document.getElementById("disp").innerHTML = cartona;
            }

        })
        // $(".theMain").click(function(e){
        //     async function getCat(anyCat) {
        //         let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${anyCat}`);
        //         let dataready = await Response.json();
        //         dataCat = dataready.categories;
        //         //console.log(dataCat);
        //         displayCat();
        //     }
        //     function display()
        // })

    }
    getCat() 
})
/////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////
$(".menus_list p").click(function(e){
    async function getAreaAndIngredients(any) {
        let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?${any}=list`);
        let responseReady = await Response.json();
        dataAny = responseReady.meals;
        console.log(dataAny);
        if (e.target.getAttribute("dataWillDisplay") == "i"){
            displayIngredient();

        } else if (e.target.getAttribute("dataWillDisplay") == "a"){
            displayArea();
        }
    }
    function displayIngredient(){
        let cartona = ``;
        for (let i = 0; i < 20; i++) {
            cartona += `
            <div class="col-md-3 main position-relative text-white rounded-4">
                <i meal="${dataAny[i].strIngredient}" class="fa-solid text-success fa-bowl-food fa-3x"></i>
                <p>${dataAny[i].strIngredient}</p>
                <p>${dataAny[i].strDescription.split(" ").slice(0, 10).join(" ")}</p>
            </div>
        `
        }
        document.getElementById("disp").innerHTML = cartona;
        $(".theMain").click(function (e) {
            async function getMealIntag(mealIntag) {
                console.log(e.target.getAttribute("meal"))
                let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mealIntag}`);
                let dataready = await Response.json();
                dataMealIntag = dataready.meals;
                console.log(dataMealIntag);
                displayMeal();
                console.log(e.target.innerText)
            }
            getMealIntag(e.target.getAttribute("meal"))
            function displayMeal() {
                let cartona = ``;
                for (let i = 0; i < dataMealIntag.length; i++) {
                    cartona += `
                <div class="col-md-3 main position-relative rounded-4">
                <img class="img-fluid" src="${dataMealIntag[i].strMealThumb}">
                <div class="hoverLay d-flex align-items-center">
                    <p>${dataMealIntag[i].strMeal}</p>
                </div>
                </div>
                `
                }
                document.getElementById("disp").innerHTML = cartona;
                $("#mealDisp").empty();
            }

        })

    }

    ///////////////////////////////////////////////////////////////
    function displayArea(){
        let cartona = ``;
        for (let i = 0; i < 20; i++) {
            cartona += `
            <div class="col-md-3 main position-relative text-white rounded-4">
                <i country="${dataAny[i].strArea}"class="fa-solid text-danger fa-city fa-3x d-block"></i>
                <p class="city">${dataAny[i].strArea}</p>
            </div>
        `
        }
        document.getElementById("disp").innerHTML = cartona;
        $(".theMain").click(function (e) {
            async function getMealArea(mealArea) {
                console.log(e.target.getAttribute("country"))
                let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${mealArea}`);
                let dataready = await Response.json();
                dataMealArea = dataready.meals;
                console.log(dataMealArea);
                displayMeal();
                console.log(e.target.innerText)
            }
            getMealArea(e.target.getAttribute("country"))
            function displayMeal() {
                let cartona = ``;
                for (let i = 0; i < dataMealArea.length; i++) {
                    cartona += `
                <div class="col-md-3 main position-relative rounded-4">
                <img class="img-fluid" src="${dataMealArea[i].strMealThumb}">
                <div class="hoverLay d-flex align-items-center">
                    <p>${dataMealArea[i].strMeal}</p>

                </div>
                </div>
                `
                }
                document.getElementById("disp").innerHTML = cartona;
                $("#mealDisp").empty();
            }

        })

    }
    getAreaAndIngredients(e.target.getAttribute("dataWillDisplay"))
    
})
//////////////////////////////////////////////////////

$(".searchMeal").click(function () {
    let container = `
       <div class="col-md-6"><input id="input1" data="s" class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby " placeholder="Search By Name" type="text"></div>
       <div class="col-md-6"> <input id="input2" data="f" class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby" placeholder="Search By First letter" type="text"></div>
 `

    document.querySelector("#mealDisp").innerHTML = container;
    $(".theMain").empty()
    $("#input1 ,#input2").keyup(function () {
        console.log("hiii")
        let char = $(this).attr("data");
        console.log(char)
        let variabledata = $(this).val()
        console.log(variabledata);
        async function getMeal() {
            let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?${char}=${variabledata}`);
            let kdata = await apiResponse.json();
            data = kdata.meals

            display();
        }
        getMeal()
        function display() {
            let container = ``;
            for (let i = 0; i < data.length; i++) {
                container += ` <div class=" col-md-3 shadow  contain">
       <div class=" member shadow  "> <img src="${data[i].strMealThumb}" class="img-fluid " alt="">
       <div class="overLay  ">
         <h2 class="dataValue" dataval="${data[i].strMeal}" >${data[i].strMeal}</h2>
       </div></div>
      </div>`


            }
            document.querySelector(".theMain").innerHTML = container;
            let dataMeal = []


            $(".contain").click(function (e) {
                console.log("qqqqqqqqqqqqqqqqqqqqqqqqq")

                async function getMeal(meal) {
                    let Response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
                    let dataready = await Response.json();
                    dataMeal = dataready.meals;
                    console.log(dataMeal);
                    displayMeal();
                    console.log(e.target.innerText)
                }
                getMeal(e.target.innerText)
                function displayMeal() {
                    let cartona = `<div class="col-md-4 py-5 text-white">
              <img class="img-fluid" src="${dataMeal[0].strMealThumb}">
              <h3>${dataMeal[0].strMeal}</h3>
          </div>
          <div class="col-md-8 py-5 text-white">
              <h3>Instruction</h3>
              <p>${dataMeal[0].strInstructions}</p>
              <p><span class="fs-3">Area : </span>${dataMeal[0].strArea} </p>
              <p><span class="fs-3">Category : </span> ${dataMeal[0].strCategory}</p>

              <p><span class="d-block fs-3">Recipes : </span>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient1}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient2}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient3}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient4}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient5}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strIngredient6}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure1}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure2}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure3}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure4}</button>
                       <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure5}</button>
                        <button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strMeasure6}</button>
                      
                      
                      
                      </p>
                      <p><span class="fs-3">Tags : </span><button class="p-2 bg-secondary rounded-3 my-3 me-1">${dataMeal[0].strTags}</button> </p>

              
              <button class="btn btn-success"><a  href="${dataMeal[0].strSource}">Source</a></button>
              <button class="btn btn-danger"><a class="text-decoration-none text-light" href="${dataMeal[0].strYoutube}">Youtube</a></button>
              
          </div>`

                    document.querySelector(".theMain").innerHTML = cartona;
                }
            })
        }

    })

})

////////////////////////////////////////////////////////////////////////


$(".Contact").click(function () {
    console.log("Contact");
    let container = ` <section class="d-flex justify-content-center align-items-center bg-black  ">

      
       
  <div class="container">
    <div class="row g-0">
      <h2 class="text-center text-white mb-5">ContactUS........</h2>
        <div class="name col-md-6 mb-4"><input class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby   " placeholder="Enter Your Name" type="text"></div>
        <div class="email col-md-6 mb-4"> <input class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby"  placeholder="Enter Email" type="email"></div>
        <div class="phone col-md-6 mb-4"><input class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby   " placeholder="Enter Phone" type="tel"></div>
        <div class="age col-md-6 mb-4"> <input class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby  " placeholder="Enter Age" type="text"></div>
        <div class="password col-md-6 mb-4"><input class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby   " placeholder="Enter Password" type="password"></div>
        <div class="repasswoed col-md-6 mb-4"> <input class=" text-white w-75 mx-auto bg-transparent form-control text-center searchby  " placeholder="Enter Repassword" type="password"></div>
        
    </div>
    <div class=" d-flex justify-content-center align-items-center mt-3"><button class="text-center btn btn-outline-danger sub mx-auto  bg-transparent py-1 px-2" type="submit">Submit</button></div>
   </div>
</section>`
    document.querySelector(".row").innerHTML = container;
    $("#disp").empty();
})


function reg(){
    
}









//////////////////////////////////////////////////////
// sideBar Animation
let menuWidth = $(".menu").innerWidth();
console.log(menuWidth);
$(".sidebar").css({ left: `-${menuWidth}px` })
$(".close").click(function(){
    if ($(".sidebar").css("left") == "0px"){
        $(".sidebar").animate({ left: `-${menuWidth}px` })

    } else{
        $(".sidebar").animate({ left: "0px" });
    }
    
    // 
    // console.log("hello")
})
/////////////////////////////////////////////////////////

