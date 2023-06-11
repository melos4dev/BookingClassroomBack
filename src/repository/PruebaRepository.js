import { db, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from '@/config/firebase'

const COLLECTION_NAME = 'pruebas'

export default {
   
    async upDate(pruebaData) {
      try {
        const docRef = doc(db, COLLECTION_NAME, pruebaData.id);
        await updateDoc(docRef, pruebaData);
      } catch (error) {
        console.error('Error updating machine: ', error);
      }
    },
  
 
    async delete(pruebaData) {
      try {
        const docRef = doc(db, COLLECTION_NAME, pruebaData.id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
    },
  
 
    async getAll() {
      try {
        const snapshot = await getDocs(collection(db, COLLECTION_NAME));
        const pruebas = [];
  
        snapshot.forEach((doc) => {
          let pruebaData = doc.data();
          pruebaData.id = doc.id;
          pruebas.push(pruebaData);
        });
  
        return pruebas;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  
   
    async save(pruebaData) {
      try { 
      await addDoc(collection(db, COLLECTION_NAME), pruebaData);   
      


      } catch (error) {
        console.log(error);
      }
    },
  };

