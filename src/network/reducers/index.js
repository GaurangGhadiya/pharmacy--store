import { combineReducers } from 'redux'
import getCode from './getCode'
import addCategory from './addCategory'
import getCategory from './getCategory'
import getCategoryList from './getCategoryList'
import addSubCategory from './addSubCategory'
import getSubCategory from './getSubCategory'
import getSubCategoryList from './getSubCategoryList'
import getProducts from './getProducts'
import getUnit from './getUnit'
import addProduct from './addProduct'
import getProductById from './getProductById'
import addSeller from './addSeller'
import getSeller from './getSeller'
import getSellerById from './getSellerById'
import login from './login'
import getMenufacturer from './getMenufacturer'
import addMenufacturer from './addMenufacturer'
import deleteMenufacturer from './deleteMenufacturer'
import getBrand from './getBrand'
import addBrand from './addBrand'
import deleteBrand from './deleteBrand'
import addPharmaGroup from './addPharmaGroup'
import getPharmaGroup from './getPharmaGroup'
import deletePharmaGroup from './deletePharmaGroup'
import getSupplierType from './getSupplierType'
import addSupplierType from './addSupplierType'
import deleteSupplierType from './deleteSupplierType'
import addUnit from './addUnit'
import getTax from './getTax'
import addTax from './addTax'
import deleteTax from './deleteTax'
import getSupplierTypeMaster from './getSupplierTypeMaster'
import getSupplier from './getSupplier'
import addSupplier from './addSupplier'
import deleteSupplier from './deleteSupplier'
import getPharmaGroupMaster from './getPharmaGroupMaster'
import getMenufacturerMaster from './getMenufacturerMaster'
import getDrug from './getDrug'
import addDrug from './addDrug'
import deleteDrug from './deleteDrug'
import getSupplierMasters from './getSupplierMaster'
import getUnitMaster from './getUnitMaster'
import getTaxMaster from './getTaxMaster'

const rootReducer = combineReducers({
  getCode,
  addCategory,
  getCategory,
  getCategoryList,
  addSubCategory,
  getSubCategory,
  getSubCategoryList,
  getProducts,
  getUnit,
  addProduct,
  getProductById,
  addSeller,
  getSeller,
  getSellerById,
  login,
  getMenufacturer,
  addMenufacturer,
  deleteMenufacturer,
  getBrand,
  addBrand,
  deleteBrand,
  addPharmaGroup,
  getPharmaGroup,
  deletePharmaGroup,
  getSupplierType,
  addSupplierType,
  deleteSupplierType,
  addUnit,
  getTax,
  addTax,
  deleteTax,
  getSupplierTypeMaster,
  getSupplier,
  addSupplier,
  deleteSupplier,
  getPharmaGroupMaster,
  getMenufacturerMaster,
  getDrug,
  addDrug,
  deleteDrug,
  getSupplierMasters,
  getUnitMaster,
  getTaxMaster
})

export default rootReducer
