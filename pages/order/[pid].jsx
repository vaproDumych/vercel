import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../Add.module.css";
/* components */
import Layout from '../../components/layout/Layout';
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from '../../middleware/utils';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      order: "",
      realization: "",
      transfer: "",
      price: "",
      manager: "",
      payment: "",
      comment: "",
      checked: "",
      date_added: new Date(),
      admin: ""
    };

    this.handleCheck = this.handleCheck.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputOrderChange = this.handleInputOrderChange.bind(this);
    this.handleInputRealizationChange = this.handleInputRealizationChange.bind(
      this
    );
    this.handleInputTransferChange = this.handleInputTransferChange.bind(this);
    this.handleInputPriceChange = this.handleInputPriceChange.bind(this);
    this.handleInputManagerChange = this.handleInputManagerChange.bind(this);
    this.handleInputPaymentChange = this.handleInputPaymentChange.bind(this);
    this.handleInputCommentChange = this.handleInputCommentChange.bind(this);
  }

  handleInputOrderChange(event) {
    this.setState({ order: event.target.value });
  }

  handleInputRealizationChange(event) {
    this.setState({ realization: event.target.value });
  }

  handleInputTransferChange(event) {
    this.setState({ transfer: event.target.value });
  }

  handleInputPriceChange(event) {
    this.setState({ price: event.target.value });
  }

  handleInputManagerChange(event) {
    this.setState({ manager: event.target.value });
  }

  handleInputPaymentChange(event) {
    this.setState({ payment: event.target.value });
  }

  handleInputCommentChange(event) {
    this.setState({ comment: event.target.value });
  }


  handleCheck() {
    this.setState({
      checked: !this.state.checked
    })
  }


  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    fetch("../api/updateorder", {
      method: "POST",
      body: JSON.stringify(this.state),
    })
      .then((res) => res.json())
      .then((result) => console.log(result));
    this.componentDidMount();
  };

  componentDidMount() {
    fetch("../api/order")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result[0].order);
          this.setState({
            isLoaded: true,
            order: result[0].order,
            realization: result[0].realization,
            transfer: result[0].transfer,
            price: result[0].price,
            manager: result[0].manager,
            payment: result[0].payment,
            comment: result[0].comment,
            checked: result[0].checked,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );

    const { profile } = this.props.profile;
    console.log(this.props.profile.fullName)
    this.setState({ profile: profile });
    this.setState({ admin: this.props.profile.fullName });
  }


  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <Layout title="Добавити нове замовлення">
          <div>
            <form className={styles.content} onSubmit={this.handleSubmit}>
              <label name="order">
                № Замовлення:
              <input type="number" value={this.state.order} disabled />
              </label>
              <label name="realization">
                № Видаткової:
              <input
                  type="number"
                  value={this.state.realization}
                  onChange={this.handleInputRealizationChange}
                />
              </label>
              <label name="transfer">
                № Переміщення:
              <input
                  type="number"
                  value={this.state.transfer}
                  onChange={this.handleInputTransferChange}
                />
              </label>
              <label name="price">
                Сума:
              <input
                  type="number"
                  onChange={this.handleInputPriceChange}
                  value={this.state.price} required
                />
              </label>

              <label name="manager">
                Відповідальний:
              <input type="text" value={this.state.manager} disabled />
              </label>
              <label name="payment">
                Тип оплати:
              <select style={{ margin: '10px' }}
                  value={this.state.payment}
                  onChange={this.handleInputPaymentChange}
                >
                  <option value="Monobank">Monobank</option>
                  <option value="Privatbank">Privatbank</option>
                  <option value="cache">Готівка</option>
                  <option value="other">Інше</option>
                </select>

                {this.state.admin === "va@tdes.com.ua" ? (null) : (
                  <label name="checked" style={{ display: 'block' }}>
                    Перевірено:
                    <input name="checked" type="checkbox" onChange={this.handleCheck}
                      defaultChecked={this.state.checked} style={{
                        display: 'inline', width: 'auto',
                        height: 'auto', margin: '10px'
                      }} />
                  </label>
                )}


              </label>

              <label name="comment">
                Коментар:
              <textarea
                  value={this.state.comment}
                  onChange={this.handleInputCommentChange}
                />
              </label>
              <input type="submit" value="Змінити замовлення" />
            </form>
          </div>
        </Layout>
      );
    }
  }
}




export async function getServerSideProps(context) {
  const { req } = context;
  const { origin } = absoluteUrl(req);

  const baseApiUrl = `${origin}/api/about`;

  const { token } = getAppCookies(req);
  const profile = token ? verifyToken(token.split(' ')[1]) : '';

  return {
    props: {
      baseApiUrl,
      profile,
    },
  };
}