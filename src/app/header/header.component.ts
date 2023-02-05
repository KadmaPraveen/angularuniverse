import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FmsService } from '../fms.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('video') myVideo: ElementRef | any;
  isplay=false;
  @Input() comment!: Comment;
  src!: Observable<any>;
  isEditing: boolean = false;
  newimageObject: any = [];
  
  product: any;
  userdetails: any;
  productID: any;
  productPicUrl = environment.ProductUrl;
  productvideoUrl = environment.videoUrl;
  images: any;
  fst: any;
  current: number = 0;
  // imgList: { name: string }[];
  prdId: any;
  sellerID: any;
  userid: any;
  breeddialogRef: any;
  members: any;
  message: any;
  selectedFiles: any;
  fileToUpload: any;
  imageUrl: any;
  messageId: any;
  model: any = {};
  uploadedFile: any;
  isHide: any;
  cartLst: any = [];
  comments: string = '';
  videoname: any;
  smallvideo: any;
  isoutOfStock: any = false;
  vedioCount: any;
  selectedItem: any;
  timeinterval: any=3000;
  isThai:boolean=true;
  constructor(
    private fms: FmsService,
    // private ls: LoginService,
    private route: Router,
    private router: ActivatedRoute,
    // public as: AuthService,
    private meta: Meta,
  ) {
    this.userdetails = JSON.parse(localStorage.getItem('user') || '{}');
    this.productID = this.router.snapshot.paramMap.get('productID');
    this.sellerID = this.router.snapshot.paramMap.get('sellerID');
    localStorage.setItem('productID', JSON.stringify(this.productID));
    localStorage.setItem('sellerID', JSON.stringify(this.sellerID));
    this.isThai=true;
    
    // this.imgList = [
    //   { name: 'assets/images/consult/c1.jpg' },
    //   { name: 'assets/images/consult/c2.jpg' },
    //   { name: 'assets/images/consult/c3.jpg' },
    //   { name: 'assets/images/consult/c4.jpg' },
    // ];
  }

  ngOnInit(): void {
   
    this.productList();


  }

  productList() {
    this.productID=1130
    this.sellerID=1001
    let lng='th'
    if(this.isThai){
      lng='th'
    }else{
      lng='en'
    }
    this.fms.produtListById(this.productID, this.sellerID,lng).subscribe((data: any) => {
      this.product = data.productMaster;
      //  this.product.isGuest = false;
      console.log(data);
      console.log(data);
      this.addMetaTags();
      if (data.productVideo) {
        data.productVideo

        this.smallvideo = data.productVideo;
        this.vedioCount = data.productVideo?.length;
        console.log(this.smallvideo)
        console.log(data.productVideo?.length)
        localStorage.setItem('smallvedio', JSON.stringify(this.smallvideo));
       
      }
      this.prdId = this.product.productId;
      this.images = data.productImages;
      this.selectedItem=this.images[0]
      if (this.product.stockQty <= 0) {

        this.isoutOfStock = true;
      }
      this.members = data.member;

      console.log(this.members)
      localStorage.removeItem('images');
      localStorage.setItem('images', JSON.stringify(this.images[0]?.imageName));
      
      localStorage.setItem('selectedProdutList', JSON.stringify(this.product));
      this.images.forEach((e: any) => {
        let imaglist = {
          "thumbImage": this.productPicUrl + e.imageName,
          "image": this.productPicUrl + e.imageName
        }
        this.newimageObject.push(imaglist)

      });
      if (data.productVideo != null) {
        const videourl = this.productvideoUrl + data.productVideo.imageName;
        this.newimageObject.push({ 'video': videourl })
      }
      console.log('checkthis', this.newimageObject)

      // localStorage.setItem('sellerName', JSON.stringify(this.members));
      //console.log('prdID', this.prdId);
      // localStorage.setItem('selectedProdut', JSON.stringify(this.product));
      // this.getgender();
      // this.getBreadType();
      // this.getPaymentType();
    });
  }
  listClick(event:any, newValue:any) {
    console.log(newValue);
    this.selectedItem = newValue;  // don't forget to update the model here
    // ... do other stuff here ...
}

  addCart() {
    
    
    } 
  

  byNow() {
   
  }

  Login() {
  }



  facebookUI(e: any) {
    const image=this.productPicUrl+this.images[0].imageName;
   // let pinterest = 'http://pinterest.com/pin/create/button/?url='+ this.url +'&media='+ this.image +'&description='+ this.name;
   // let facebook = 'https://facebook.com/dialog/share?app_id='+ this.fbid +'href='+ this.url +'&redirect_uri='+ this.url;
    //let twitter = 'http://twitter.com/share?text='+ this.name +'&url='+ this.url +'&hashtags='+ this.hashtags;
   var url = encodeURIComponent(window.location.href);
   //var url = 'http%3A%2F%2Fwww.kaiduaykan.com%2F%23%2Fcustomer%2FProdcutDetails%2F1007%2F1000';

    var fbpopup = window.open(
      'https://www.facebook.com/sharer/sharer.php?u=' + url+'pop','width=600, height=400, scrollbars=no'
    );
  }
  onFileSelect(event: any) {
    // this.message = [];
    // this.progressInfos = [];
    this.selectedFiles = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFiles);
    //console.log(this.selectedFiles);
    // this.previews = [];
    // if (this.selectedFiles && this.selectedFiles[0]) {
    //   const numberOfFiles = this.selectedFiles.length;
    //   for (let i = 0; i < numberOfFiles; i++) {
    //     const reader = new FileReader();

    //     reader.onload = (e: any) => {
    //       this.previews.push(e.target.result);
    //       //console.log(this.previews);
    //     };

    //     reader.readAsDataURL(this.selectedFiles[i]);
    //   }
    // }
  }
  // sendMessageToseller



  addMetaTags(){
    var url = encodeURIComponent(window.location.href);
    this.meta.updateTag( { property : 'og:type', content: 'www.kaiduaykan.com' },);
    this.meta.updateTag( { property : 'og:title', content: 'OOS-' + 'title'},);
    this.meta.updateTag(  { property : 'og:description', content: 'OOS-' + 'desc'},);
    this.meta.updateTag({ property : 'og:image:secure', content:this.productPicUrl+this.product.productImage},);
    // this.meta.updateTag({ name: 'og:url', content: url });
  }








  getImages() {
    this.fms.getProductImages(this.productID).subscribe((res: any) => {
      //console.log(res);
      this.images = res;
      // //console.log(this.images[0].imageName);
      localStorage.removeItem('images');
      localStorage.setItem('images', JSON.stringify(this.images[0].imageName));
      //this.fst = this.images[0].imageName;
      ////console.log('st', this.fst)
    });
    this.productPicUrl.concat();
  }

  addwish() {
    if (!this.userid) {
      this.Login()
      //alert('please login!');
    } else {
      
      this.fms.saveWishList(this.product).subscribe((res) => {
        console.log(res);
     
      });
    }
  }
  playVideo(){
    if(this.isplay){
        this.myVideo.nativeElement.pause();
    }
    else{
        this.myVideo.nativeElement.play();
    }  
    this.isplay=!this.isplay
  }

  //#endoldcode
}

