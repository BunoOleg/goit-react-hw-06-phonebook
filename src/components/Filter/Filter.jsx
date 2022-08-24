import styles from './Filter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { changeFilter, } from '../../redux/filterSlice';
import { getFilter } from '../../redux/selectors';





const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(getFilter);

  const onInputHandler = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

 
  
  return (
      <label className={styles.label}>
      Find contacts by name
          <input
              className={styles.input}
        type="text"
        value={filter}
        onChange={onInputHandler}
      />
    </label>
  );
};

export default Filter;


