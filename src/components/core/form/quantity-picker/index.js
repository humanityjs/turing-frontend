import React, { useState, useEffect, useContext } from 'react';
import { editItem } from 'api/cart.api';
import { actions, ProductContext } from '../../../context/products.context';
import Icon from '../../Icon';
import style from './style.module.scss';

export default function QuantityPicker({
  defaultValue,
  onChange,
  itemId,
  isEdit
}) {
  const [newValue, setNewValue] = useState(parseInt(defaultValue, 10));
  const [isEditing, setEditing] = useState(false);
  const { dispatch, state } = useContext(ProductContext);

  const decrement = () => {
    if (newValue > 1) {
      const value = newValue - 1;
      setNewValue(value);
      onChange(value, itemId);
    }
  };

  const increment = () => {
    const value = newValue + 1;
    setNewValue(value);
    onChange(value, itemId);
  };

  const onInputChange = event => {
    setNewValue(parseInt(event.target.value, 10));
    onChange(parseInt(event.target.value, 10), itemId);
  };

  const onEditItem = async () => {
    setEditing(true);
    try {
      const { data } = await editItem({ itemId, quantity: newValue });
      const oldItemIndex = state.cart.findIndex(
        item => item.item_id === itemId
      );

      const newItemIndex = data.findIndex(item => item.item_id === itemId);
      let newCart = state.cart.map(item => item);
      if (oldItemIndex >= 0) {
        const oldItem = { ...state.cart[oldItemIndex] };
        const updatedItem = { ...data[newItemIndex] };
        const newItem = { ...oldItem, ...updatedItem };
        newCart.splice(oldItemIndex, 1, newItem);
      }
      dispatch(actions.SET_CART(newCart));
      setEditing(false);
    } catch (e) {
      setEditing(false);
      console.log(e.message);
    }
  };

  const showUpdateButton = () => {
    return isEdit && newValue !== defaultValue;
  };
  return (
    <div className={style.quantityPicker}>
      <button onClick={decrement} className={style.controlIcon}>
        <Icon icon={['fas', 'minus']} />
      </button>

      <div className={style.withUpdate}>
        <input
          onChange={onInputChange}
          className={style.quantityInput}
          value={newValue}
        />
        {showUpdateButton() && (
          <button
            onClick={onEditItem}
            disabled={isEditing}
            className={style.updateButton}
          >
            {isEditing ? 'Updating...' : 'Update'}
          </button>
        )}
      </div>

      <button onClick={increment} className={style.controlIcon}>
        <Icon icon={['fas', 'plus']} />
      </button>
    </div>
  );
}
