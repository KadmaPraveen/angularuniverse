// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {  production: false,
  // delte
  /* Production/Beta URL End points */

  //  api:'https://kaiduapis.azurewebsites.net/api/',
  api: 'https://kaiduapis.azurewebsites.net/api/',
  // api:'http://localhost:13866/api/',
  //imgUrl: 'http://localhost:13866/Images/',

  ProductUrl: 'https://kaidu.blob.core.windows.net/fmsimages/',
  azureimgUrl: ' https://kaidu.blob.core.windows.net/fmsimages/',
  videoUrl: 'https://kaidu.blob.core.windows.net/fmsvideos/',
 imgUrl: 'https://kaiduapis.azurewebsites.net/Images/',
  fileUrl: 'https://kaiduapis.azurewebsites.net/',
  messageFileUrl: 'https://kaiduapis.azurewebsites.net/Uploads/Messages/',
  // messageFileUrl:"http://localhost:13866/Uploads/Messages/",
  documentUrl: 'https://kaiduapis.azurewebsites.net/VerifyDocuments/',
  azureblobImgUrl: 'https://kaidu.blob.core.windows.net/fmsimages/',
  sas: 'sp=racwdli&st=2022-12-18T17:24:12Z&se=2024-02-01T01:24:12Z&sv=2021-06-08&sr=c&sig=O0JQT18XZ0wQQ%2Fgf0fWhCQ6exDcgB6CW2U%2BcPPKPN9c%3D',
  videosas:
    'sp=racwdli&st=2022-12-14T05:39:47Z&se=2023-07-06T13:39:47Z&sv=2021-06-08&sr=c&sig=r6crGkNWga8DRc%2B%2Fz3SoEtnwenMyBGh2pnA82wHhH%2B0%3D',

  /* Local host URL end points  */

  // ProductUrl:"http://localhost:13866/Uploads/Products",
  //  imgUrl:"http://localhost:13866/Images/",
  // azureblobUrl:'https://audiencestreetcreatives.blob.core.windows.net/videos/'x`
  azure_storageContainerName: 'fmsvideos', // Put your own Azure storage container name here
  azure_storageImageName: 'fmsimages', // Put your own Azure storage container name here
  azure_storageAccountName: 'kaidu', //Put your own Azure storage account name here
  azure_sasToken:
    'sp=racwdli&st=2022-12-14T05:39:47Z&se=2023-07-06T13:39:47Z&sv=2021-06-08&sr=c&sig=r6crGkNWga8DRc%2B%2Fz3SoEtnwenMyBGh2pnA82wHhH%2B0%3D',
  azure_video_sasToken:
    'sp=racwdli&st=2022-12-14T05:39:47Z&se=2023-07-06T13:39:47Z&sv=2021-06-08&sr=c&sig=r6crGkNWga8DRc%2B%2Fz3SoEtnwenMyBGh2pnA82wHhH%2B0%3D',
  firebase: {
    apiKey: 'AIzaSyCWftwFxv4UJ9XJLxs_rk64u9RY5iyHJMo',
    authDomain: 'kaidutest.firebaseapp.com',
    projectId: 'kaidutest',
    storageBucket: 'kaidutest.appspot.com',
    messagingSenderId: '888176955851',
    appId: '1:888176955851:web:a6f82fa832757ff630e64e',
    measurementId: 'G-7EG6SNQKQZ',
    vapidKey:
      'BBQIpKfjm1qiZD6l1xNs4Np5OgIbDUpVES4GPtSJjvfp97DV6YRkbox92leTrBvTo5tXgSjSogJuf2UL7ji6jyM',
  },
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */

