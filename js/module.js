 const productsdb = (dbname, table) => {
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();
  
    return db;
  };
  
  const bulkcreate = (dbtable, data) => {
    let flag = empty(data);
    if (flag) {
      dbtable.bulkAdd([data]);
      console.log("se ha ingresado de manera correcta");
    } else {
      console.log("completa los campos de informacion");
    }
    return flag;

  };
 
const empty = object => {
    let flag = false;

    for (const value in object) {
      if (object[value] != "" && object.hasOwnProperty(value)) {
        flag = true;
      } else {
        flag = false;
      }
    }
    return flag;
  };

 const getData = (dbtable,fn) =>{

    let index = 0;
    let obj={};
 
    dbtable.count((count)=>{
       if(count){
          dbtable.each(table =>{
            obj =Sortobj(table);

            fn(obj,index++);
            
          })
       }
       else{
           fn(0);
       }
    })
 }
 
 const Sortobj = sortobj =>{
    let obj = {};
    obj={
       id: sortobj.id,
       bookName: sortobj.bookName,
       editorial: sortobj.editorial,
       encargado: sortobj.encargado,
       matricula: sortobj.matricula
        
    }
 
    return obj;
 }

 const createEle=(tagname,appendTo,fn)=>{
     const element =document.createElement(tagname);
     if(appendTo)appendTo.appendChild(element);
     if(fn)fn(element);

 }
export default productsdb;
 
export {
  bulkcreate,
  getData,
  createEle,
  Sortobj
 }
 