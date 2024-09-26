let product = []
let core = document.getElementById("data-list-wrapper");
function just(){
    fetch("http://localhost:3000/pitches").
    then((res) => {
        return res.json()
        // console.log(res.json());
        
    }).then((data) => {
        product = data
        return card(data)
        console.log(productdata);
        
        // console.log(card(data));
        
    }).catch((err) => {
        console.log(err);
    });
}
function card(data){
    let Doc = data.map((el)=> {
       
        return force(el.id,el.image,el.title,el.founder,el.category,el.price) 
    })
    core.innerHTML = Doc.join()
}

function force(id,img,title,founder,category,price){
    return `
    <div class="card" data-id="${id}">
                <div class="card-img">
                <a href="cart.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(img)}&founder=${encodeURIComponent(founder)}&category=${encodeURIComponent(category)}&price=${encodeURIComponent(price)}" id="just">
                  <img src="${img}" alt="pitch">
                </a>  
                </div>
              
                <div class="card-body">
                  <h4 class="card-title">${title}</h4>
                  <p class="card-founder">${founder}</p>
                  <p class="card-category">${category}</p>
                  <p class="card-price">${price}</p>
                  <a href="#" class="card-link" data-id="${id}">Edit</a>
                  <button class="card-button" data-id="${id}">Delete</button>
                </div>
              </div>
    `
}
just()

let inputofadd = document.getElementById("pitch-title");
let inputofimage = document.getElementById("pitch-image");
let inputofcate = document.getElementById("pitch-category");
let inputprice = document.getElementById("pitch-price");
let addbotton = document.getElementById("add-pitch");

addbotton.addEventListener("click",fars)
function fars() {
        let funs = {
            title : inputofadd.value,
            image : inputofimage.value,
            category : inputofcate.value,
            price : inputprice.value
        }
        fetch("http://localhost:3000/pitches", {
            method : 'POST',
            headers: {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(funs)
        }).then((response) => response.json()).
        then(data => console.log("Success",data)).
        catch((err) => console.log("Error:",err))           
}


document.addEventListener("click", (el) => {
    if (el.target.classList.contains("card-button")) {
        alert("Are you sure Do you want to delete this method")
        deltesof(el.target.dataset.id)
    }
})

function deltesof(id){
   fetch(`http://localhost:3000/pitches/${id}`, {
    method : "DELETE"
    })
}
let inputupdateid = document.getElementById("update-pitch-id");
let inputupdatetitle = document.getElementById("update-pitch-title");
let inputupdateimage = document.getElementById("update-pitch-image");
let inputudatefounder = document.getElementById("update-pitch-founder");
let inputupdatecate = document.getElementById("update-pitch-category");
let inputupdateprice = document.getElementById("update-pitch-price");
let pots = document.getElementById("update-pitch");

document.addEventListener("click", (el) => {
    if(el.target.classList.contains("card-link")){
        ProJect(el.target.dataset.id)
        console.log(el.target.dataset.id);
        // alert("hello")  
    }
})
function USEoffine(data){
    console.log(inputupdateid.value = data.id, inputupdatetitle.value = data.title,inputupdateimage.value = data.image, inputudatefounder.value = data.founder, 
        inputupdatecate.value = data.category, inputupdateprice.value = data.price);
}
function ProJect(id){
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res) => {
        // console.log(res.json());
        return res.json()  
    }).then(data => { USEoffine(data)}).
    catch((err) => console.log("Error",err))
}
pots.addEventListener("click", () => {
    let ObjEdit = {
        id : inputupdateid.value,
        title : inputupdatetitle.value,
        image : inputupdateimage.value,
        founder : inputudatefounder.value,
        category : inputupdatecate.value,
        price : inputupdateprice.value
    }
    console.log(ObjEdit);
    fetch(`http://localhost:3000/pitches/${ObjEdit.id}`, {
        method : 'PUT',
            headers: {
                'Content-Type' : "application/json",
            },
            body : JSON.stringify(ObjEdit)     
    }) 
    .then((response) => response.json()).
    then(data => console.log("Success",data)).
    catch((err) => console.log("Error:",err))   
})

let AtoZ = document.getElementById("sort-low-to-high");
let ZtoA = document.getElementById("sort-high-to-low");
let foodFill = document.getElementById("filter-Food");
let ElectroFill = document.getElementById("filter-Electronics");
let PersonalFill = document.getElementById("filter-Personal-Care");

AtoZ.addEventListener("click", () => {
    let setData = product.sort((a,b) => {
        return a.price - b.price
    })
    card(setData); 
})


ZtoA.addEventListener("click", () => {
    let highDataset = product.sort((a,b) => {
        return b.price - a.price
    })
    card(highDataset)
}) 

foodFill.addEventListener("click", () => {
   let filters = product.filter((el) => {
    return el.category === "Food"
   })
   console.log(filters);
   
   card(filters)
})
ElectroFill.addEventListener("click", () => {
    let filters = product.filter((el) => {
     return el.category === "Electronics"
    })
    console.log(filters);
    
    card(filters)
 })
 PersonalFill.addEventListener("click", () => {
    let filters = product.filter((el) => {
     return el.category === "Personal Care"
    })
    console.log(filters);
    
    card(filters)
 })
