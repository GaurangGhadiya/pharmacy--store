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
  login
})

export default rootReducer
