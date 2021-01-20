import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Add.module.css";
/* middleware */
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from '../middleware/utils';

/* components */
import Layout from '../components/layout/Layout';

export default class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: "",
      realization: "",
      transfer: "",
      price: "",
      manager: "",
      payment: "Monobank",
      comment: "",
      checked: false,
      date_added: new Date(),

    };

    this.handleInputOrderChange = this.handleInputOrderChange.bind(this);
    this.handleInputRealizationChange = this.handleInputRealizationChange.bind(
      this
    );
    this.handleInputTransferChange = this.handleInputTransferChange.bind(this);
    this.handleInputPriceChange = this.handleInputPriceChange.bind(this);
    this.handleInputManagerChange = this.handleInputManagerChange.bind(this);
    this.handleInputPaymentChange = this.handleInputPaymentChange.bind(this);
    this.handleInputCommentChange = this.handleInputCommentChange.bind(this);
    this.handleOnClickLogout = this.handleOnClickLogout.bind(this);
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

  componentDidMount() {
    const { profile } = this.props.profile;
    console.log(this.props.profile.fullName)
    this.setState({profile: profile});
    this.setState({manager: this.props.profile.fullName});
  }
  handleSubmit = async (event) => {
    fetch("api/addorder", {
      method: "POST",
      body: JSON.stringify(this.state),
    });
  };

  handleOnClickLogout(event) {
    this.setLogout(event);
  }

  render() {
    const { profile } = this.props;
    return (
          <Layout title="Добавити нове замовлення">
      <div>
        <main>
          {!profile ? (
            <a href="/">Login to continue</a>
          ) : (
            <div>
              <div style={{ textAlign: 'left' }}>
                <fieldset>
                  <legend>
                  <h4>Менеджер: {profile.fullName}</h4>
                  </legend>
                  <h4>Email: {profile.email}</h4>
                </fieldset>
              </div>
              <form className={styles.content} onSubmit={this.handleSubmit}>
          <label name="order">
            № Замовлення:
            <input
            type="number"
              value={this.state.order}
              onChange={this.handleInputOrderChange} required
            />
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
              value={this.state.price}
              onChange={this.handleInputPriceChange} required
            />
          </label>

          <label name="manager">
            Відповідальний:
            <input
              type="text"
              value={this.state.manager}
              disabled
            />
          </label>
          <label name="payment">
            Тип оплати:
            <select
              value={this.state.payment}
              onChange={this.handleInputPaymentChange}
            >
              <option value="Monobank">Monobank</option>
              <option value="Privatbank">Privatbank</option>
              <option value="Гоівка">Готівка</option>
              <option value="Інше">Інше</option>
            </select>
          </label>
          <label name="comment">
            Коментар:
            <textarea
              value={this.state.comment}
              onChange={this.handleInputCommentChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
            </div>
          )}
        </main>
        
      </div>
      </Layout>
    );
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

// Add.getInitialProps = async (ctx) => {
//   const { req } = ctx;
//   const { origin } = absoluteUrl(req);

//   const baseApiUrl = `${origin}/api/about`;

//   const { token } = getAppCookies(req);
//   const profile = token ? verifyToken(token.split(' ')[1]) : '';
//   console.log(profile);

//   return {
//     props: {
//       baseApiUrl,
//       profile,
//     },
//   };
// }