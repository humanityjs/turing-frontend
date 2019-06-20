import React, { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import CreditCardInput from '../core/creditCard';
import {
  getRegions,
  editCustomer,
  editCustomerAddress,
  editCustomerCard
} from 'api/auth.api';
import { AuthContext } from '../context/auth.context';
import style from './account.module.scss';
import CountrySelect from './CountrySelect';

export default function AccountComponent() {
  const { state } = useContext(AuthContext);
  const clonedState = state.user || {};
  const [newState, setState] = useState({ ...clonedState });
  const [regions, setRegions] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  const onChange = event => {
    let stateData = { ...newState };

    if (event.target.name === 'shipping_region_id') {
      const region = regions.find(
        region =>
          parseInt(region.shipping_region_id, 10) ===
          parseInt(event.target.value, 10)
      );
      stateData.region = region.shipping_region;
    }

    if (event.target.name === 'email') {
      return;
    }
    setState({
      ...stateData,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    getRegions().then(({ data }) => {
      setRegions(data);
    });
  }, []);

  const onCreditCardChange = event => {
    setState({
      ...newState,
      credit_card: event.target.value
    });
  };

  const validate = () => {
    const name = newState.name ? newState.name.trim() : newState.name;
    const email = newState.email ? newState.email.trim() : newState.email;
    const address_1 = newState.address_1
      ? newState.address_1.trim()
      : newState.address_1;
    const country = newState.country
      ? newState.country.trim()
      : newState.country;
    const shipping_region_id = newState.region
      ? newState.region.trim()
      : newState.region;
    const city = newState.city ? newState.city.trim() : newState.city;
    const postal_code = newState.postal_code
      ? newState.postal_code.trim()
      : newState.postal_code;
    const credit_card = newState.credit_card
      ? newState.credit_card.trim()
      : newState.credit_card;

    if (
      !name ||
      !email ||
      !address_1 ||
      !country ||
      !shipping_region_id ||
      !city ||
      !postal_code
    ) {
      return false;
    }

    if (credit_card.length !== 19) {
      return false;
    }

    return true;
  };

  const onSubmit = async () => {
    setSubmitting(true);
    if (!validate()) {
      toast.error('Please fill all required fields and try again');
      setSubmitting(false);
      return;
    }
    const customerData = {
      name: newState.name,
      email: newState.email,
      day_phone: newState.day_phone,
      mob_phone: newState.mob_phone
    };

    const customerAddress = {
      address_1: newState.address_1,
      address_2: newState.address_2,
      city: newState.city,
      region: newState.region,
      postal_code: newState.postal_code,
      country: newState.country,
      shipping_region_id: newState.shipping_region_id
    };

    const customerCreditCard = {
      credit_card: newState.credit_card
    };

    try {
      await editCustomer(customerData);
      await editCustomerAddress(customerAddress);
      await editCustomerCard(customerCreditCard);
      toast.success('Details edited successfully');
      setSubmitting(false);
    } catch (e) {
      console.log(console.log(JSON.stringify(e, null, 2)));
      toast.error(
        'Something went wrong. Please check you input and try again.'
      );
      setSubmitting(false);
    }
  };
  console.log(newState);
  return (
    <div className={style.account}>
      <h2>Account Details</h2>
      <div className={style.formCont}>
        <div className="columns">
          <div className="column is-half-desktop">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={newState.name}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="column is-half-desktop">
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={newState.email}
                  onChange={onChange}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Address 1</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Address 1"
                  name="address_1"
                  value={newState.address_1}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Address 2</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Address 2"
                  name="address_2"
                  value={newState.address_2}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third-desktop">
            <CountrySelect
              defaultValue={newState.country}
              onChange={onChange}
            />
          </div>
          <div className="column is-one-third-desktop">
            <div className="field">
              <label className="label">Region</label>
              <div className="control">
                <div className="select">
                  <select
                    defaultValue={parseInt(newState.shipping_region_id, 10)}
                    name="shipping_region_id"
                    onChange={onChange}
                    value={newState.shipping_region_id}
                  >
                    {regions.map(region => (
                      <option
                        key={region.shipping_region_id}
                        value={parseInt(region.shipping_region_id, 10)}
                        // selected={
                        //   parseInt(newState.shipping_region_id, 10) ===
                        //   parseInt(region.shipping_region_id, 10)
                        // }
                      >
                        {region.shipping_region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="column is-one-third-desktop">
            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="City"
                  name="city"
                  value={newState.city}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column is-one-third-desktop">
            <div className="field">
              <label className="label">Postal code</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Postal Code"
                  name="postal_code"
                  value={newState.postal_code}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="column is-one-third-desktop">
            <div className="field">
              <label className="label">Mobile Phone</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Mobile Phone"
                  name="mob_phone"
                  value={newState.mob_phone}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="column is-one-third-desktop">
            <div className="field">
              <label className="label">Day phone</label>
              <div className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Day Phone"
                  name="day_phone"
                  value={newState.day_phone}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Credit Card Number</label>
              <div className="control">
                <CreditCardInput
                  cardNumberInputProps={{
                    value: newState.credit_card,
                    onChange: onCreditCardChange
                  }}
                  fieldClassName="input"
                  name="credit_card"
                />
              </div>
            </div>
          </div>
        </div>

        <div className={style.footer}>
          <button
            disabled={isSubmitting}
            onClick={onSubmit}
            className={style.button}
          >
            {isSubmitting ? 'Saving..' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
