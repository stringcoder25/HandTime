export const getCategories = (data)=>{
let arr = []
for(let item of data){
    arr.push(item.category)
}
 let get = arr.filter((item,index,arr)=>arr.indexOf(item)===index)

return get
}