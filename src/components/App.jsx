import styles from './App.module.css';
import List from './List';
import ContactForm from './Form';
import Toaster from 'react-hot-toast';
import Filter from './Filter';


const App = () => {
  
   return (
      <div className={styles.div}>
        <h1>Phonebook</h1>
        <ContactForm  />
        <h2>Contacts</h2>
        <Filter/>
        <List />
        <Toaster />   
      </div>
    );
};

export default App;