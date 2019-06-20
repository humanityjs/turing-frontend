import React, { Component } from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Swal from 'sweetalert2';
import { createOrder, processPayment } from 'api/cart.api';
import style from './checkout.module.scss';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state = {
      isSubmitting: false
    };
  }

  async submit(ev) {
    this.setState({
      isSubmitting: true
    });
    try {
      let { token } = await this.props.stripe.createToken({
        name: 'stripeToken'
      });
      const orderPayload = {
        cart_id: window.localStorage.getItem('cartId'),
        shipping_id: this.props.shippingId,
        tax_id: 2
      };
      const { data } = await createOrder(orderPayload);
      const paymentPayload = {
        stripeToken: token.id,
        order_id: data.orderId,
        description: `Payment for order ${data.orderId}`,
        amount: parseFloat(this.props.grandTotal) * 100
      };
      const payment = await processPayment(paymentPayload);
      this.setState({
        isSubmitting: false
      });
      this.props.closeModal();
      Swal.fire({
        title: 'Payment successful',
        html: `Thank you for your purchase, you can find your receipt <a target="__blank" href="${
          payment.data.receipt_url
        }">here</a>`,
        type: 'success'
      }).then(() => {
        window.location.href = '/';
      });
    } catch (e) {
      this.setState({
        isSubmitting: false
      });
      Swal.fire({
        type: 'error',
        html: 'Something went wrong. Please check your payment information'
      });
      console.log(JSON.stringify(e, null, 2));
    }
  }

  render() {
    return (
      <div className={style.checkoutForm}>
        <p>Please enter your card details.</p>
        <div className={style.borderBottom}>
          <CardElement />
        </div>
        <button
          disabled={this.state.isSubmitting}
          className={style.button}
          onClick={this.submit}
        >
          {this.state.isSubmitting ? 'PROCESSING PAYMENT' : 'PAY'}
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
