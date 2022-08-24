import styles from './List.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/itemsSlice';
import { getContacts, getFilter } from '../../redux/selectors';





const List = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const getFilteredContacts = () => {
    if (contacts.length === 0) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();
  return (
    <ul>
      {contacts &&
        filteredContacts.map(({ name, id, number }) => {
        return (
          <li key={id} className={styles.li}>
            {name}: {number}
            <button
              className={styles.button}
              onClick={() => dispatch(removeItem(id))}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default List;

