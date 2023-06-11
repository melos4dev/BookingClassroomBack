import { db, collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from '@/config/firebase'

const COLLECTION_NAME = 'Notifications'

export default {
   
    async upDate(data) {
      try {
        const docRef = doc(db, COLLECTION_NAME, data.id);
        await updateDoc(docRef, data);
      } catch (error) {
        console.error('Error updating machine: ', error);
      }
    },
  
 
    async delete(data) {
      try {
        const docRef = doc(db, COLLECTION_NAME, data.id);
        await deleteDoc(docRef);
      } catch (error) {
        console.log(error);
      }
    },
  
 
    async getAll() {
      try {
        const snapshot = await getDocs(collection(db, COLLECTION_NAME));
        const datas = [];
  
        snapshot.forEach((doc) => {
          let data = doc.data();
          data.id = doc.id;
          datas.push(data);
        });
  
        return datas;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
   
    async save(data) {
      try { 
      await addDoc(collection(db, COLLECTION_NAME), data);   

      } catch (error) {
        console.log(error);
      }
    },
  };

