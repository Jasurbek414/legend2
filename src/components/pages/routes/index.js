import React from 'react'
import { Routes, Route } from 'react-router-dom'; 


import Home from '../home/Home'
import Admins from '../admins/Admins'
import Products from '../products/Products'
import Materials from '../materials/Materials'
import ItemsPage from '../items_page/Items'
import NotFound from '../notfound/Not_found';
import AddMaterials from '../addmaterials/AddMaterials';
import AddProducts from '../AddProducts/AddProducts';
import Addtablem from '../addmaterials/Addtablem';
import Addtablep from '../AddProducts/Addtablep';
import Loginpage from '../loginpage/Loginpage';
import Mahsulotnomi from '../mahsulotnomi/Mahsulotnomi';
import Productmahsu from '../mahsulotnomi/Productmahsu';

function Pagess() {

  const token = sessionStorage.getItem("token")
  return(
      <>
      {
        token ? 
         <Routes>
            <Route path="*" element={<NotFound/>}/>
            <Route exact path="/" element={<Home/>} />
            <Route path="/admins" element={<Admins/>}  />
            <Route path="/product" element={<Products/>} />
            <Route path="/materials" element={<Materials/>} />
            <Route path="/addmaterials" element={<AddMaterials/>} />
            <Route path="addproducts" element={<AddProducts/>} />
            <Route path="/mahsulotnomi" element={<Mahsulotnomi/>} />
            <Route path="/productmahsulot" element={<Productmahsu/>} />
            <Route path="/items/:id" element={<ItemsPage/>} />
            <Route path="/material/:id" element={<Addtablem/>} />
            <Route path="/product/:id" element={<Addtablep/>} />
        </Routes>
        :
        <Routes>
          <Route path='/loginpage' element={<Loginpage/>}/>
        </Routes>
      }
      </>
  )
}

export default Pagess