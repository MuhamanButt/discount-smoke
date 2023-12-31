
import * as Yup from "yup";

export const CONTACT_US_SEND_MESSAGE_SCHEMA = Yup.object({
    email: Yup.string().email().when('contactNo', {
      is: (contactNo) => !contactNo,
      then: ()=>Yup.string().required("Please enter valid email..."),
    }),
    contactNo: Yup.number().required("Enter valid Contact No...").typeError("Enter valid Contact No..."),
    description: Yup.string().required("Enter valid description...").max(600, "Description must be less than 600 characters"),
    name: Yup.string().required("Enter valid name...").max(20, "Name must be less than 20 characters"),
});
  
export const LOGIN_PAGE_SCHEMA=Yup.object({
    email: Yup.string().required("Enter valid email..."),
    password: Yup.string().required("Enter valid password..."),
});

export const BRAND_NAME_SCHEMA=Yup.object({
  brandName:Yup.string().required("Please enter a brand name ")
})
export const FLAVOR_NAME_SCHEMA=Yup.object({
  flavorName:Yup.string().required("Please enter a flavor name ")
})

export const ADD_PRODUCT_SCHEMA=Yup.object({
  productName:Yup.string().required("Please enter product name...").max(50,"Name must be less than 50 characters"),
  description:Yup.string().required("Please enter description...").max(300,"Description must be less than 300 characters"),
})
export const ADD_OFFER_SCHEMA=Yup.object({
  offerDescription:Yup.string().required("Please enter offer description...").max(100,"Description must be less than 100 characters"),
  productName:Yup.string().required("Please enter product name...").max(50,"Name must be less than 50 characters"),
  description:Yup.string().required("Please enter description...").max(300,"Description must be less than 300 characters"),
  remainingDays:Yup.number().min(0,"Please enter valid number of days").required("Please enter valid number of days"),
  remainingHours:Yup.number().min(0,"Please enter valid number of hours").required("Please enter valid number of hours")
})