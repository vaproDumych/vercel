import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./Money.module.css";
/* middleware */
import {
  absoluteUrl,
  getAppCookies,
  verifyToken,
  setLogout,
} from '../middleware/utils';

/* components */
import Layout from '../components/layout/Layout';

export default function Orders(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const { profile } = props;
  

  useEffect(() => {
    fetch("../api/orders", {
      method: "POST",
      body: JSON.stringify(profile.fullName),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout title="Добавити нове замовлення">
      <div className={styles.content}>
      {!profile ? (
            <a href="/">Login to continue</a>
          ) : (
            <table className="table-content">
          <tr>
            <td>Дата</td>
            <td>№ замовлення</td>
            <td>№ Видаткової</td>
            <td>№ Переміщення</td>
            <td>Сума</td>
            <td>Відповідальний</td>
            <td>Тип оплати</td>
            <td>Коментар</td>
            <td>Перевірено</td>
            <td>Змінити дані</td>
          </tr>

          {items.map((order) => (
            <tr>
              <td>{order.date_added}</td>
              <td>{order.order}</td>
              <td>{order.realization}</td>
              <td>{order.transfer}</td>
              <td>{order.price}</td>
              <td>{order.manager}</td>
              <td>{order.payment}</td>
              <td>{order.comment}</td>
              <td>{order.checked}</td>
              <td>
                <Link href={`/order/${order._id}`}>
                  <a>Змінити замовлення</a>
                </Link>
              </td>
            </tr>
          ))}
        </table>
          )}
        
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