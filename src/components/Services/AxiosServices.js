import axios from "axios";
const url = "http://192.168.3.61:8011";
let token = localStorage.getItem("token");
const headers = {
  Authorization: "Token " + token,
};
class AxiosServices {
  constructor() {}

  //Signup
  signup(data) {
    return axios.post(url + "/user/signup/", data);
  }

  //login
  login(data) {
    return axios.post(url + "/user/login/", data);
  }
  logout() {
    return axios.get(url + "/user/logout", {
      headers,
    });
  }

  //changePassword
  changePassword(data) {
    return axios.patch(url + "/user/changepas/", data, {
      headers,
    });
  }
  //feedback
  feedback(data) {
    return axios.post(url + "/user/feedback/", data, {
      headers,
    });
  }
  //contact
  contact(data) {
    return axios.post(url + "/user/contact/", data, {
      headers,
    });
  }
  //Stock
  getStock() {
    return axios.get(url + "/inventory/stock/", {
      headers,
    });
  }
  addStock(data) {
    return axios.post(url + "/inventory/stock/", data, {
      headers
    });
  }
  getStockById(id) {
    return axios.get(url + "/inventory/stock/" + id + "/", {
      headers,
    });
  }

  editStock(id, data) {
    return axios.patch(url + "/inventory/stock/" + id + "/", data, {
      headers,
    });
  }

  deleteStock(id) {
    return axios.delete(url + "/inventory/stock/" + id + "/", {
      headers,
    });
  }

  //Sales
  setSaleBill(data) {
    return axios.post(url + "/transactions/saleBill/", data, {
      headers,
    });
  }
  setSaleItem(data) {
    return axios.post(url + "/transactions/saleitem/", data, {
      headers,
    });
  }

  getSaleBillByBillNo(billno) {
    return axios.get(url + "/transactions/saleBill/" + billno + "/", {
      headers,
    });
  }

  getSaleItemById(id) {
    return axios.get(url + "/transactions/saleitem/" + id, {
      headers,
    });
  }

  getSaleItem() {
    return axios.get(url + "/transactions/saleitem/", {
      headers,
    });
  }

  getSaleBillDetails(data) {
    return axios.post(url + "/transactions/salebilldetails/", data, {
      headers,
    });
  }
  deleteSale(id) {
    return axios.delete(url + "/transactions/saleitem/" + id + "/", {
      headers,
    });
  }

  editSaleItem(id, data) {
    return axios.patch(url + "/transactions/saleitem/" + id + "/", data, {
      headers,
    });
  }

  editSaleBill(id, data) {
    return axios.patch(url + "/transactions/saleBill/" + id + "/", data, {
      headers,
    });
  }
  lowSale() {
    return axios.get(url + "/transactions/salelow/", {
      headers,
    });
  }
  highSale() {
    return axios.get(url + "/transactions/salehigh/", {
      headers,
    });
  }
  lowSale() {
    return axios.get(url + "/transactions/salelow/", {
      headers,
    });
  }
  leastQty(){
    return axios.get(url + "/transactions/salelow/", {
        headers,
      });
  }

  //Supplier

  addSupplier(data) {
    return axios.post(url + "/inventory/supplier/", data, {
      headers,
    });
  }
  getSupplier() {
    return axios.get(url + "/inventory/supplier/", {
      headers,
    });
  }
  getSupplierById(id) {
    return axios.get(url + "/inventory/supplier/" + id + "/", {
      headers,
    });
  }
  editSupplier(id,data) {
    return axios.patch(url + "/inventory/supplier/" + id + "/",data, {
      headers,
    });
  }
  deleteSupplier(id) {
    return axios.delete(url + "/inventory/supplier/" + id + "/", {
      headers,
    });
  }
}

export default new AxiosServices();
