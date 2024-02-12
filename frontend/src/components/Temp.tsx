import axios from 'axios';
  
function Temp(){

    const addProduct=(response:any)=>{
        axios.all(
            [
            axios.get(`https://fakestoreapi.com/products/`),
            axios.get(`https://dummyjson.com/products/`),
            axios.get('https://api.escuelajs.co/api/v1/products'),
            axios.get('https://fake-coffee-api.vercel.app/api')
          ]
          )
          .then(axios.spread((obj1,obj2,obj3,obj4)=>{
            
              let array1:any=[]
              obj1.data.map((product:any)=>{
      
                  let categoryId=0
                  response.data.map((category:any)=>{
                      product.category==category.category_name && (categoryId=category.category_id)
                  })
      
                array1.push({...product,
                //   id:key,
              
                  images:[product.image],
                  category_id:categoryId
                })
              })
        
              let array2:any=[]
              obj2.data.products.map((product:any)=>{

                
      
                  let categoryId=0
                  response.data.map((category:any)=>{
                      product.category==category.category_name && (categoryId=category.category_id)
                  })
      
      
                array2.push({...product,
                //   id:obj1.data.length+key,
                  category_id:categoryId
                })
              })


              let array3:any=[]
              obj3.data.map((product:any)=>{

                if(product.id<=51){



                  let categoryId=0
                  response.data.map((category:any)=>{
                      product.category.name==category.category_name && (categoryId=category.category_id)
                  })
      
      
                array3.push({...product,
                //   id:obj1.data.length+key,
                  category_id:categoryId
                })

                }
      
              })


              let array4:any=[]

              let categoryIdCoffee=0
                  response.data.map((category:any)=>{
                      category.category_name=='Coffee' && (categoryIdCoffee=category.category_id)
                  })
              obj4.data.map((product:any)=>{

      
                array4.push({...product,
                //   id:obj1.data.length+key,
                  category_id:categoryIdCoffee,
                  images:[product.image_url],
                  title:product.name
                })

                
      
              })




              // axios.post('http://localhost:8080/product/addProductsToDB',[...array1,...array2,...array3,...array4]
              axios.post('http://localhost:8080/product/addProductsToDB',{data1:array1,data2:array2,data3:array3,data4:array4})
                  .then((res:any)=>{
                  console.log("product added",res.data)
                  })
            
          }))
    }


    const onclick=()=>{

    axios.all([
      axios.get(`https://fakestoreapi.com/products/categories/`),
      axios.get(`https://dummyjson.com/products/categories/`),
      axios.get('https://api.escuelajs.co/api/v1/categories')
    ]).then(axios.spread((obj1,obj2,obj3)=>{
        console.log("categories1",obj1.data)
        console.log("categories2",obj2.data)
        console.log("categories3",obj3.data)

        let obj3New=obj3.data.map((category:any)=>{
          return category.name
        })

        console.log("obj3",obj3New)

        axios.post('http://localhost:8080/product/addCategoriesToDB',[...obj1.data,...obj2.data,...obj3New,'Coffee'])
        
        .then((res:any)=>{
        console.log("cate added",res.data)

        addProduct(res)

        })

    }))

    

    // axios.get('https://fake-coffee-api.vercel.app/api')
    // .then((res:any)=>{
    //   console.log("res",res.data)
    // })


    
}

    return (
        <div onClick={onclick} style={{position:'absolute',top:'50px', left:0}}>
            Temp
        </div>
    )

}

export default Temp