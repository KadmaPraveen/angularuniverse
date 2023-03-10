import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeStamp } from 'console';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FmsService {
 
  baseURL = environment.api;
  userdetails: any;
  isGuest: boolean = false;
  prodList: any;
  orderID: any;
  comentList!:postcomments[]


  constructor(private http: HttpClient) {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    // this.orderID = JSON.parse(localStorage.getItem('orderID') || '{}');
    if (this.userdetails) {
      this.isGuest = true;
      this.prodList = JSON.parse(localStorage.getItem('prodList') || '{}');
    }
  }

  //double
  userLogin(object: any) {
    return this.http.post(`${this.baseURL}UserLogin`, object);
  }
  //old one remove
  // saveaddress(form: Address) {
  //   return this.http.get(`${this.baseURL}ProductMasters`)
  // }
  getBreeds() {
    return this.http.get(`${this.baseURL}Breeds/` + this.userdetails.userId);
  }

  saveWishList(payload: any) {
    payload.memberId = this.userdetails.userId;
    payload.isGuest = this.isGuest;
    //payload.quantity = this.prodList.stockQty;
    payload.quantity = 1;
    return this.http.post(`${this.baseURL}WishLists/saveWhishlist`, payload);
  }
  Payment(payload: any) {
    payload.memberId = this.userdetails.userId;
    payload.addressID = this.userdetails.userId;

    return this.http.post(`${this.baseURL}OrderPayments/confirmOrder`, payload);
  }
  saveDeliveryAddress(payload: any) {
    return this.http.post(`${this.baseURL}DeliveryAddress`, payload);
  }
  SavePayment(payload: any) {
    // payload.memberId = this.userdetails.userId;
    // payload.addressID = this.userdetails.userId;

    return this.http.post(
      `${this.baseURL}OrderPayments/SaveOrderPayment`,
      payload
    );
  }
  verifyUpload(payload: any) {
    return this.http.post(`${this.baseURL}Profile/verfiyDocument`, payload);
  }
  getdocuments() {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.get(`${this.baseURL}Profile/verfiyDocument/${this.userdetails.userId}`);
  }
  saveNotifications(payload: any) {
    // payload.memberId = this.userdetails.userId
    payload.senderId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}Notifications`, payload);
  }


  getconformOrder(orderid: any) {
    return this.http.get(`${this.baseURL}OrderDetails/orderHeader/` + orderid);
  }
  // produtList() {
  //   return this.http.get(`${this.baseURL}productMasters/productSearch`)
  // }

  productSearch(payload: any) {
    return this.http.post(
      `${this.baseURL}productMasters/productSearch`,
      payload
    );
  }
  getStockList() {
    return this.http.get(`${this.baseURL}Lookups/StockType`);
  }
  getProductImages(productId: any) {
    return this.http.get(`${this.baseURL}ProductImages/List/` + productId);
  }
  produtListById(productId: any, formid: any,lng:string) {
    lng='th'
    return this.http.get(
      `${this.baseURL}ProductMasters/${productId}/${formid}/${lng}`
    );
  }
  userAddressList() {
    return this.http.get(
      `${this.baseURL}uspAddresses/` + this.userdetails.userId
    );
  }
  NotificationList() {
    return this.http.get(`${this.baseURL}Notifications`);
  }
  updateNotification(notyid: number) {
    return this.http.get(
      `${this.baseURL}NotificationListSP/UpdateNotificationstatus/` + notyid
    );
  }
  //filter by memberID

  cartList() {
    return this.http.get(
      `${this.baseURL}Carts/List/` + this.userdetails.userId
    );
  }
  saveCartList(payload: any) {
    payload.memberID = this.userdetails.userId;
    return this.http.post(`${this.baseURL}Carts`, payload);
  }
  moveToCart(productid: number,wishid:number,payload:any) {
    const memberID = this.userdetails.userId;
    return this.http.post(`${this.baseURL}Carts/movetoCart/${productid}/${wishid}`,payload);
  }
  productidforcart(productid: number) {
    const memberID = this.userdetails.userId;
    return this.http.get(`${this.baseURL}ProductMasters/${productid}`,);
  }
  deleteCartList(cartId: number) {
    return this.http.delete(`${this.baseURL}Carts/` + cartId);
  }
  addressList() {
    return this.http.get(`${this.baseURL}Addresses/` + this.userdetails.userId);
  }
  addressByID() {
    return this.http.get(`${this.baseURL}Addresses/` + this.userdetails.userId);
  }

  //formappend
  //get result true

  saveAddress(payload: any) {
    payload.linkId = this.userdetails.userId; //linkid as userid
    return this.http.post(`${this.baseURL}Addresses`, payload);
  }
  deleteAddress(payload: any) {
    payload.linkId = this.userdetails.userId; //linkid as userid
    return this.http.post(
      `${this.baseURL}Addresses/api/DeleteAddress`,
      payload
    );
  }
  saveSeller(payload: any) {
    ;
    payload.SellerId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}Seller`, payload);
  }
  saveImagename(id: any) {
    ;
    return this.http.get(`${this.baseURL}Seller/saveImgName/${id}`);
  }
  postcomment(payload: any) {
    return this.http.post(`${this.baseURL}MessageDetails`, payload);
  }
  getpostcomment(productId: any) {
    return this.http.get(
      `${this.baseURL}MessageDetails/ProductComments/${productId}`
    );
  }
  getpostcommentobs(productId: any) :Observable<postcomments[]>{
    return this.http.get<postcomments[]>(`${this.baseURL}MessageDetails/ProductComments/${productId}`).
    pipe(tap(data => console.log('All: ' + JSON.stringify(data))) );
  }
  getFollowersList():Observable<any>  {
    return this.http.get(
      `${this.baseURL}MemberFollowings/FollowedList/` + this.userdetails.userId
    );
  }
  getFollowingList():Observable<any>  {
    return this.http.get(
      `${this.baseURL}MemberFollowings/FollowingList/` + this.userdetails.userId
    );
  }
  saveFollowers(sellerid:number,userid:number,followingid:number):Observable<any>  {

    return this.http.get(
      `${this.baseURL}MemberFollowings/saveFollow/${sellerid}/${userid}/${followingid}`);
  }
  getOrderHistory() {
    return this.http.get(
      `${this.baseURL}Profile/OrderHistory/` +
        this.userdetails.userId +
        '/' +
        'en'
    );
  }
  // getOrderHistory() {
  //   return this.http.get(
  //     `${this.baseURL}OrderDetails/orderHeaderList/` +
  //       this.userdetails.userId +
  //       '/' +
  //       'en'
  //   );
  // }
  //USERID?USERID=11020
  getSellerList() {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("userID", this.userdetails.userId);
    return this.http.get(`${this.baseURL}Seller/SellingList/11020/2180/en`);
    // return this.http.get(`${this.baseURL}Seller/SellingList/` + this.userdetails.userId + '/' + 'en')
  }
  getimgListbyProductId(productId: number) {
    // let queryParams = new HttpParams();
    // queryParams = queryParams.append("userID", this.userdetails.userId);
    return this.http.get(`${this.baseURL}ProductImages/List/${productId}`);
    // return this.http.get(`${this.baseURL}Seller/SellingList/` + this.userdetails.userId + '/' + 'en')
  }
  getSellerListLatest(OrderStatusID: any) {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.get(
      `${this.baseURL}Seller/SellingList/` +
        this.userdetails.userId +
        `/${OrderStatusID}/en`
    );
  }
  soldOutList() {
    return this.http.get(
      `${this.baseURL}Seller/SoldOutList/` +this.userdetails.userId +`/en`
    );
  }
  getReadyToSellList() {
    //return this.http.get(`${this.baseURL}Seller/List/en/userID`, { params: queryParams })
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http.get(
      `${this.baseURL}Seller/RedytoSellList/` +
        this.userdetails.userId +
        '/' +
        'en'
    );
  }
  getSellerListType() {
    return this.http.get(`${this.baseURL}Lookups/OrderStatus`);
  }
  getNotifications(userid: any) {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    
    return this.http.get(`${this.baseURL}NotificationListSP/` + userid + '/50');
  }
  getNotificationCount() {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.get(`${this.baseURL}NotificationListSP/NotificationsCount/userid?userid=` + this.userdetails.userId);
  }
  updateAllNotifications() {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.get(`${this.baseURL}NotificationListSP/UpdateAllNotifications/${this.userdetails.userId}`);
  }

  getWishList() {
    return this.http.get(
      `${this.baseURL}WishLists/wishlist/${this.userdetails.userId}`
    );
  }
  deleteWishList(wishid:number) {
    return this.http.delete(
      `${this.baseURL}WishLists/${wishid}`
    );
  }
  ///senderID/memberType
  getInboxCount() {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');

    return this.http.get(
      `${this.baseURL}Profile/Inbox/` + this.userdetails.userId
    );
  }
  getInbox() {
    return this.http.get(
      `${this.baseURL}Profile/Inbox/` +
        this.userdetails.userId +
        '/' +
        this.userdetails.memberType
    );
  }
  getInboxdetails(messageid: any,membertype: any) {
    return this.http.get(
      `${this.baseURL}Profile/InboxDetail/`+messageid+'/'+membertype+'/' +this.userdetails.userId 
    );
  }
  ////LookUps
  getSellCurrencyDropList() {
    return this.http.get(`${this.baseURL}Lookups/Currency`);
  }
  getSellGenderDropList() {
    return this.http.get(`${this.baseURL}Lookups/Gender`);
  }
  getSellBreedTypeDropList() {
    return this.http.get(`${this.baseURL}Lookups/BreedType`);
  }
  getSellingBreed() {
    return this.http.get(`${this.baseURL}Breeds/` + this.userdetails.userId);
  }
  getSellAgeDropList() {
    return this.http.get(`${this.baseURL}Lookups/AgeFormat`);
  }
  getSellStockTypeDropList() {
    return this.http.get(`${this.baseURL}Lookups/StockType`);
  }
  getSellAddressTypeDropList() {
    return this.http.get(`${this.baseURL}Lookups/AddressType`);
  }
  getSellPaymentTypeDropList() {
    return this.http.get(`${this.baseURL}Lookups/PaymentType`);
  }
  getSellOrderStatusDropList() {
    return this.http.get(`${this.baseURL}Lookups/OrderStatus`);
  }
  getSellWeightDropList() {
    return this.http.get(`${this.baseURL}Lookups/UnitType`);
  }

  getShopList(memberTypeId: any) {
    return this.http.get(`${this.baseURL}Members/` + memberTypeId);
  }
  getShopDetails(shopId: any) {
    return this.http.get(`${this.baseURL}Seller/sellerDetails/${shopId}`);
  }
  // getShopDetails(){
  //  return this.http.get(`${this.baseURL}Seller/sellerDetails/`+this.userdetails.userId)
  // }
  getTransportList(memberTypeId: any) {
    return this.http.get(`${this.baseURL}Members/` + memberTypeId);
  }
  getInboxList(usertype: number, memberTypeId: any) {
    return this.http.get(
      `${this.baseURL}Profile/Inbox/` + usertype + '/' + memberTypeId
    );
  }
  saveBreadList(payload: any) {
    payload.farmId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}Breeds`, payload);
  }
 
  postfiles(payload: any,productid:any,sellerId:any,isnew:boolean) {
   // payload.farmId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}seller/postblob/${productid}/${sellerId}/${isnew}`, payload);
  }
  ediitimagesupdate(payload: any) {
   // payload.farmId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}seller/editImgsave`, payload);
  }
  onlyremoveimages(payload: any) {
   // payload.farmId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}seller/onlyremoveimages`, payload);
  }
  removeallImages(productID: any) {
   // payload.farmId = this.userdetails.userId;
    return this.http.get(`${this.baseURL}Seller/deleteimagesforupdate/${productID}`);
  }
  updatepostblob(payload: any) {
   // payload.farmId = this.userdetails.userId;
    return this.http.post(`${this.baseURL}seller/updatepostblob`, payload);
  }
  saveVideos(filename:any,productid:any,sellerId:any,isnew:boolean) {
    return this.http.get(`${this.baseURL}seller/SaveVideo/${filename}/${productid}/${sellerId}/${isnew}`);
  }
  updateSaveVideo(filename:any,productid:any,sellerId:any,imageid:any) {
    return this.http.get(`${this.baseURL}seller/updateSaveVideo/${filename}/${productid}/${sellerId}/${imageid}`);
  }
  upload(payload:any){
    return this.http.post(`${this.baseURL}seller/Savevideoblob`, payload)
  }
  
  DeleteProduct(id: any) {
    return this.http.get(`${this.baseURL}Seller/DeleteProduct/${id}`);
  }
  updateStock(productID: any, quantity: number) {
    const stockFlag = -1;

    return this.http.get(
      `${this.baseURL}OrderPayments/updateStock/${productID}/${quantity}/${stockFlag}`
    );
  }
  postCommnets(payload: any) {
    payload.memberId=this.userdetails.userId;
    //api/MessageDetails/saveMessageDetails
    return this.http.post(
      `${this.baseURL}MessageDetails/saveMessageDetails`,
      payload
    );
  }
  sendMessageToseller(payload: any) {
    //api/MessageDetails/sendMessageToseller
    return this.http.post(
      `${this.baseURL}MessageDetails/sendMessageToseller`,
      payload
    );
  }
  orderconfirmPayment(orderId: any) {
    ///api/OrderDetails/orderConfirmDelivery/{orderId}
   const id=this.userdetails.userId

    return this.http.get(
      `${this.baseURL}OrderDetails/confirmPayment/${orderId}/${id}`
    );
  }
  orderConfirmDelivery(orderId: any) {
    ///api/OrderDetails/orderConfirmDelivery/{orderId}
   const id=this.userdetails.userId

    return this.http.get(
      `${this.baseURL}OrderDetails/orderConfirmDelivery/${orderId}/${id}`
    );
  }
  orderCancel(orderId: any, cancelBy: any,orderno:string) {
    ///OrderDetails/orderCancel/{orderId}/{cancelBy}
    cancelBy=this.userdetails.userId
   const username=this.userdetails.userName
    return this.http.get(
      `${this.baseURL}OrderDetails/orderCancel/${orderId}/${cancelBy}/${username}/${orderno}`
    );
  }
  orderClose(orderId: any) {
    ///OrderDetails/orderCancel/{orderId}/{cancelBy}
    return this.http.get(
      `${this.baseURL}OrderDetails/orderClose/${orderId}/${this.userdetails.userId}`
    );
  }
  saveOrderCOD(payload: any) {
    //api/OrderPayments/saveOrderCOD
    payload.userId=this.userdetails.userId;
    return this.http.post(`${this.baseURL}OrderPayments/saveOrderCOD`, payload);
  }
  saveOrderOnline(payload: any) {
    payload.userId=this.userdetails.userId;
    return this.http.post(`${this.baseURL}OrderPayments/confirmOrder`, payload);
  }
  viewOrderByNumber(orderno: string) {
    return this.http.get(`${this.baseURL}OrderDetails/viewOrder/` + orderno);
  }
  cartOrderList() {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');

   return this.http.get(`${this.baseURL}Carts/cartOrderDetails/`+this.userdetails.userId)
  }
}


export interface postcomments {
  senderName: string;
  createdOn: string;
  messageID: any;
  productID: any;
  senderID: any;
  comment?:any
}
