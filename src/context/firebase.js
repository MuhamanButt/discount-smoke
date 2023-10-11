import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  deleteDoc,
  setDoc,
  collectionGroup,
  orderBy,
  limit,
} from "firebase/firestore";
import {
  Auth,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from "firebase/storage";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin, logoutAdmin } from "../redux/Admin/adminAction";
const firebaseConfig = {
  apiKey: "AIzaSyD-9RCWCREi46zbrVAdasj0TxSW3yzP_rg",
  authDomain: "discount-smoke.firebaseapp.com",
  projectId: "discount-smoke",
  storageBucket: "discount-smoke.appspot.com",
  messagingSenderId: "179825521904",
  appId: "1:179825521904:web:f084fd0bbf2cb3c9b3fe35",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseContext = createContext(null);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export const useFirebase = () => useContext(firebaseContext);

const flavorsCollectionRef = collection(firestore, "flavors");
const brandsCollectionRef = collection(firestore, "brands");

export const FirebaseProvider = (props) => {
  const dispatch = useDispatch();
  //!--------------------------------------------------------AUTHENTICATION
  const loginAdminWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, password);
      dispatch(loginAdmin());
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const signoutAdmin = async () => {
    firebaseAuth
      .signOut()
      .then(() => {
        dispatch(logoutAdmin());
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  //!--------------------------------------------------------SEND MESSAGE

  const addMessage = async (Name, Email, ContactNo, Description) => {
    const nowDate = Date.now();
    const id = `${nowDate}-${Email}`;
    const messageCollectionRef = collection(firestore, "Messages");
    try {
      const customDocRef = doc(messageCollectionRef, id);
      await setDoc(customDocRef, {
        id: id,
        Name,
        Email,
        ContactNo,
        Description,
        TimeStamp: nowDate,
        Status: "new",
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const getNewMessages = async () => {
    let dataArray = [];
    const messageCollectionRef = collection(firestore, "Messages");
    const q = query(messageCollectionRef, where("Status", "==", "new"));
    const results = await getDocs(q);
    results.forEach((doc) => {
      dataArray.push(doc.data());
    });
    return dataArray;
  };
  const markMessageAsViewed = async (identity) => {
    const messageCollectionRef = collection(firestore, "Messages");
    const docRef = doc(messageCollectionRef, identity);
    setDoc(docRef, { Status: "viewed" }, { merge: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };
  const markMessageAsNew = async (identity) => {
    const messageCollectionRef = collection(firestore, "Messages");
    const docRef = doc(messageCollectionRef, identity);
    setDoc(docRef, { Status: "new" }, { merge: true })
      .then(() => {
        return true;
      })
      .catch((error) => {
        return false;
      });
  };
  const getViewedMessages = async () => {
    let dataArray = [];
    const messageCollectionRef = collection(firestore, "Messages");
    const q = query(messageCollectionRef, where("Status", "==", "viewed"));
    const results = await getDocs(q);

    results.forEach((doc) => {
      dataArray.push(doc.data());
    });
    return dataArray;
  };
  const deleteMessageByIdentity = async (identity) => {
    const messageCollectionRef = collection(firestore, "Messages");
    const q = query(messageCollectionRef, where("id", "==", identity));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docs) => {
        const documentRef = doc(firestore, "Messages", identity);
        try {
          deleteDoc(documentRef);
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      });
    }
  };
  //!--------------------------------------------------------GET DOC
  const getBrands = async () => {
    let dataArray = [];
    try {
      const results = await getDocs(brandsCollectionRef);
      results.forEach((doc) => {
        dataArray.push(doc.data());
      });
    } catch (error) {
      console.error("Error fetching brands: ", error);
    }
    return dataArray;
  };
  const getFlavors = async () => {
    let dataArray = [];
    try {
      const results = await getDocs(flavorsCollectionRef);

      results.forEach((doc) => {
        // Access the data of each document using doc.data()
        dataArray.push(doc.data());
      });
    } catch (error) {
      console.error("Error fetching flavors: ", error);
    }
    return dataArray;
  };
  const getImageURL = (imageName) => {
    const imagePath = `uploads/images/${imageName}`;
    return getDownloadURL(ref(storage, imagePath));
  };
  const getProductsByCategory = async (category) => {
    const productsCollectionRef = collection(firestore, "products");
    const newDocRef = doc(productsCollectionRef, category);
    try {
      const subCollectionRef = collection(newDocRef, category);
      const querySnapshot = await getDocs(subCollectionRef);
      const products = querySnapshot.docs.map((doc) => doc.data());
      return products;
    } catch (error) {
      console.error("Error getting products by category: ", error);
      return [];
    }
  };
  const getLatest8ProductsByCategory = async (category) => {
    const productsCollectionRef = collection(firestore, "products");
    const newDocRef = doc(productsCollectionRef, category);
    try {
      const subCollectionRef = collection(newDocRef, category);
      const querySnapshot = await getDocs(subCollectionRef);
      let products = querySnapshot.docs.map((doc) => doc.data());
      products = products.sort((a, b) => b.listingDate - a.listingDate);
      products = products.slice(0, 8);
      return products;
    } catch (error) {
      console.error("Error getting products by category: ", error);
      return [];
    }
  };
  const getProductByIdentity = async (identity, category) => {
    const productsCollectionRef = collection(firestore, "products");
    const newDocRef = doc(productsCollectionRef, category);
    try {
      const subCollectionRef = collection(newDocRef, category);
      const querySnapshot = await getDocs(subCollectionRef);
      const products = querySnapshot.docs.map((doc) => doc.data());
      const selectedProduct = products.find(
        (product) => product.identity === identity
      );
      return selectedProduct;
    } catch (error) {
      console.error("Error getting products by category: ", error);
      return [];
    }
  };
  const getOffers = async () => {
    let dataArray = [];
    const offerCollectionRef = collection(firestore, "offer");
    try {
      const results = await getDocs(offerCollectionRef);

      results.forEach((doc) => {
        // Access the data of each document using doc.data()
        dataArray.push(doc.data());
      });
    } catch (error) {
      console.error("Error fetching flavors: ", error);
    }
    return dataArray;
  };
  const getAllData = async () => {
    console.log("hello")
    try {
      const categories = [
        "Starter Devices",
        "Vape Juice",
        "Pods",
        "Coils",
        "Cigars",
        "Hookah",
        "Kratom",
        "Cigarettes",
        "CBD Gummies",
        "Roll Your Own",
        "Glass Cleaners",
        "Hookah Flavors",
        "Chewing Tobacco",
        "Disposable Vapes",
        "Candles And Incense",
        "Cigarette Machines"
      ];
  
      // Fetch data for all categories concurrently
      const categoryData = await Promise.all(
        categories.map(async (category) => {
          return await getProductsByCategory(category);
        })
      );
  
      // Merge all category data into a single array
      const AllData = categoryData.reduce((acc, data) => {
        return acc.concat(data);
      }, []);
  
      return AllData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };
  //!--------------------------------------------------------ADDING DOC
  const addNewFlavor = async (flavorName) => {
    try {
      await addDoc(flavorsCollectionRef, {
        flavorName: flavorName,
      });
      console.log("Flavor added");
    } catch (error) {
      console.error("Error adding flavor: ", error);
    }
  };
  const addNewBrand = async (brandName) => {
    try {
      await addDoc(brandsCollectionRef, {
        brandName: brandName,
      });
      console.log("brands added");
    } catch (error) {
      console.error("Error adding brands: ", error);
    }
  };
  const addNewProduct = async (
    ProductName,
    Description,
    Features = "",
    selectedBrand,
    selectedFlavors,
    Image,
    category
  ) => {
    const nowDate = Date.now();
    const id = `${nowDate}-${ProductName}`;
    const productsCollectionRef = collection(firestore, "products");
    const newDocRef = doc(productsCollectionRef, category); //add new doc named category
    const subCollectionRef = collection(newDocRef, category);
    try {
      const imageRef = ref(storage, `uploads/images/${id}`);
      const uploadResult = await uploadBytes(imageRef, Image);
      const pictureURL = await getDownloadURL(uploadResult.ref);
      const customDocRef = doc(subCollectionRef, id);
      await setDoc(customDocRef, {
        identity: id,
        listingDate: nowDate,
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        pictureURL,
        category,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  const addNewOffer = async (
    ProductName,
    Description,
    Features = "",
    selectedBrand,
    selectedFlavors,
    OfferDescription,
    ExpirationTime,
    Image
  ) => {
    const nowDate = Date.now();
    const id = `${nowDate}-${ProductName}`;
    const offerCollectionRef = collection(firestore, "offer");
    try {
      const imageRef = ref(storage, `uploads/images/${id}`);
      const uploadResult = await uploadBytes(imageRef, Image);
      const pictureURL = await getDownloadURL(uploadResult.ref);
      const customDocRef = doc(offerCollectionRef, id);
      await setDoc(customDocRef, {
        identity: id,
        listingDate: nowDate,
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        OfferDescription,
        ExpirationTime,
        pictureURL,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  //!--------------------------------------------------------UPDATE DOC
  const updateProduct = async (
    ProductName,
    Description,
    Features = "",
    selectedBrand,
    selectedFlavors,
    category,
    identity,
    Image
  ) => {
    const nowDate = Date.now();
    const id = identity; // Use provided identity or generate a new one
    const productsCollectionRef = collection(firestore, "products");
    const newDocRef = doc(productsCollectionRef, category);
    const subCollectionRef = collection(newDocRef, category);

    try {
      let pictureURL = ""; // Initialize pictureURL

      if (Image) {
        // If a new image is provided, upload it and get the URL

        await deleteImage(id);
        const imageRef = ref(storage, `uploads/images/${id}`);
        const uploadResult = await uploadBytes(imageRef, Image);
        pictureURL = await getDownloadURL(uploadResult.ref);
      }

      const productData = {
        identity: id,
        listingDate: nowDate,
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        pictureURL,
        category,
      };

      // Get the document reference
      const docRef = doc(subCollectionRef, id);

      // Update the document
      await setDoc(docRef, productData, { merge: true });

      return true;
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  };
  const updateOffer = async (
    ProductName,
    Description,
    Features = "",
    selectedBrand,
    selectedFlavors,
    OfferDescription,
    ExpirationTime,
    identity,
    Image
  ) => {
    const offerCollectionRef = collection(firestore, "offer");
    const id = identity; // Use provided identity or generate a new one
    try {
      let pictureURL = ""; // Initialize pictureURL

      if (Image) {
        // If a new image is provided, upload it and get the URL
        const imageRef = ref(storage, `uploads/images/${id}`);
        const uploadResult = await uploadBytes(imageRef, Image);
        pictureURL = await getDownloadURL(uploadResult.ref);
      }

      const offerData = {
        identity: id,
        ProductName,
        Description,
        Features,
        selectedBrand,
        selectedFlavors,
        OfferDescription,
        ExpirationTime,
        pictureURL,
      };
      const docRef = doc(offerCollectionRef, id);
      // Use setDoc with merge: true to update the existing document
      await setDoc(docRef, offerData, { merge: true });

      return true;
    } catch (error) {
      console.error("Error updating offer:", error);
      return false;
    }
  };

  //!--------------------------------------------------------DELETE DOC
  const deleteProduct = async (identity, category) => {
    const id = identity; // Use provided identity or generate a new one
    const productsCollectionRef = collection(firestore, "products");
    const newDocRef = doc(productsCollectionRef, category);
    const subCollectionRef = collection(newDocRef, category);

    try {
      const docRef = doc(subCollectionRef, id);

      await deleteDoc(docRef);
      deleteImage(id);
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    // Reference to the document you want to delete
    const documentRef = doc(
      firestore,
      "products",
      category,
      category,
      identity
    );

    // Delete the document
    deleteDoc(documentRef)
      .then(() => {
        console.log("Document successfully deleted!");
        return true;
      })
      .catch((error) => {
        console.error("Error deleting document: ", error);
        return false;
      });
  };
  const deleteOffer = async (identity) => {
    const offerCollectionRef = collection(firestore, "offer");
    const q = query(offerCollectionRef, where("identity", "==", identity));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      querySnapshot.forEach((docs) => {
        const documentRef = doc(firestore, "offer", docs.id);
        try {
          deleteDoc(documentRef);
          deleteImage(docs.id);
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      });
    }
  };
  const deleteImage = async (imageName) => {
    const imagePath = `uploads/images/${imageName}`;
    const imageRef = ref(storage, imagePath);

    // Delete the image
    deleteObject(imageRef)
      .then(() => {
        console.log("Image successfully deleted.");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };

  //!--------------------------------------------------------DOWNLOAD DOC
  const firebaseFunctions = {
    loginAdminWithEmailAndPassword,
    signoutAdmin,
    addNewFlavor,
    addNewBrand,
    addNewProduct,
    getFlavors,
    getBrands,
    addNewOffer,
    updateProduct,
    updateOffer,
    deleteProduct,
    deleteOffer,
    deleteImage,
    getProductsByCategory,
    getImageURL,
    getProductByIdentity,
    getOffers,
    getLatest8ProductsByCategory,
    addMessage,
    getNewMessages,
    getViewedMessages,
    markMessageAsViewed,
    markMessageAsNew,
    deleteMessageByIdentity,
    getAllData,
  };

  return (
    <firebaseContext.Provider value={firebaseFunctions}>
      {props.children}
    </firebaseContext.Provider>
  );
};
