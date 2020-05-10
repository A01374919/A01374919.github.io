import productsdb,{ bulkcreate,getData,createEle,Sortobj } from './module.js';


let db =productsdb("Productdb",{
   products:`++id,bookName,editorial,encargado,matricula`
});

const Rentaid = document.getElementById("Rentaid");
const bookName = document.getElementById("bookName");
const editorial = document.getElementById("editorial");
const Encargado = document.getElementById("Encargado");
const matricula = document.getElementById("matricula");


const btnRegistrar = document.getElementById("btn-register");
const btnShow = document.getElementById("btn-show");
const btnupdate = document.getElementById("btn-update");
const btndelete = document.getElementById("btn-delete");

const notfound =document.getElementById("notfound");

btnRegistrar.onclick = () =>{
   bulkcreate(db.products,{
      bookName: bookName.value,
      editorial: editorial.value,
      encargado: Encargado.value,
      matricula: matricula.value

   })
   bookName.value=editorial.value=Encargado.value=matricula.value= "";
   getData(db.products,(data)=>{
      Rentaid.value = data.id +1 || 1;
   });
}

btnShow.onclick = table;
function table(){
   const tbody = document.getElementById("tbody");
   while(tbody.hasChildNodes()){
      tbody.removeChild(tbody.firstChild);
   }
   getData(db.products,(data)=>{
      if(data){
         createEle("tr",tbody, tr =>{
            for (const value in data) {
               createEle("td",tr, td=>{
                  td.textContent = data.matricula === data[value]? `${data[value]}`: data[value];
               })
               
            }
            createEle("td",tr,td=>{
               createEle("i",td,i=>{
                  i.className += "fas fa-edit btnedit";
                  i.setAttribute(`data-id`,data.id);
                  i.onclick=editbtn;

               })
            })

            createEle("td",tr,td=>{
               createEle("i",td,i=>{
                  i.className += "fas fa-trash-alt btndelete";
                  i.setAttribute(`data-id`,data.id);
                  i.onclick= deletebtn;
               })
            })
            
         })
      }
      else{
         notfound.textContent=" No se encontro nada en su base de datos"
      }
   })
}

const editbtn = (event) => {
   let id = parseInt(event.target.dataset.id);
   db.products.get(id, function (data) {
     let newdata = Sortobj(data);
     Rentaid.value = newdata.id || 0;
     bookName.value = newdata.bookName || "";
     editorial.value = newdata.editorial || "";
     Encargado.value = newdata.encargado || "";
     matricula.value = newdata.matricula || "";
   });
 }

btnupdate.onclick=()=>{
   const id =parseInt(Rentaid.value || 0);
   if(id){
      db.products.update(id,{
         bookName: bookName.value,
         editorial: editorial.value,
         encargado: Encargado.value,
         matricula: matricula.value
      })
      .then((updated)=>{
         let get = updated ? `Datos actualizados correctamente` : `No se actualizo correctamente`;
         console.log(get);
      })
   }
}

function deletebtn(event){
    let id=parseInt(event.target.dataset.id);
    db.products.delete(id);
    table();
}

btndelete.onclick=()=>{
   db.delete();
   db =productsdb("Productdb",{
      products:`++id,bookName,editorial,encargado,matricula`
   });
   db.open();
   table();
}

window.onload=()=>{
   textID(Rentaid);
}

function textID(textboxid){
   getData(db.products,data=>{
      textboxid.value=data.id || 1;
   })
}