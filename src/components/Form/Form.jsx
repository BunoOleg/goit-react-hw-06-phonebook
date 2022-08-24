import { useState } from 'react'
import { nanoid } from 'nanoid';
import styles from './Form.module.css';
import { getContacts } from '../../redux/selectors';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addItem } from '../../redux/itemsSlice';






const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const onSameName = data => {
    return contacts.find(
      ({ name }) => name.toLowerCase() === data.name.toLowerCase()
    );
  };

  const onSamePhoneNumber = data => {
    return contacts.find(({ number }) => number === data.number);
  };

  const onFormSubmit = data => {
    if (onSameName(data)) {
      toast.error(`${data.name} is already in contacts.`);
      return;
    }
    if (onSamePhoneNumber(data)) {
      toast.error(`Contact with ${data.number} number is already in contacts.`);
      return;
    }
    dispatch(addItem(data));
    return;
  };

  const onInputHandler = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const objectCompiler = () => {
    return { name, number, id: nanoid() };
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    onFormSubmit(objectCompiler());
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  
    return (
      <>
        <form className={styles.forms} onSubmit={onSubmitHandler}>
          <label className={styles.label}>
            Name
            <input
            className={styles.input}
              type="text"
              name="name"
              value={name}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={onInputHandler}
            />
          </label>
          <label className={styles.label}>
            Number
            <input
            className={styles.input}
              type="tel"
              name="number"
              value={number}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={onInputHandler}
            />
          </label>
          <button className={styles.button} type="submit">Add contact</button>
        </form>
      </>
    );
  }


export default ContactForm;






