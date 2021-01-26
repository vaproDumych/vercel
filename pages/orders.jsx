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
  const [total, setTotal] = useState(0);
  const [ammont, setAmmont] = useState(0);
  const [managers, setManagers] = useState([]);
  const { profile } = props;
  const [current, setCurrent] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [filterAmmont, setFilterAmmont] = useState(0);
  const [filterTotal, setFilterTotal] = useState(0);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


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
          setFiltered(result);
          let summed = 0;
          let managers = [];
          for (let key in result) {
            summed += Number(result[key].price);
            managers.push(result[key].manager);
          };
          setTotal(summed);
          setAmmont(Object.keys(result).length);
          setFilterTotal(summed);
          setFilterAmmont(Object.keys(result).length);
          let uniqueManagers = [...new Set(managers)];
          setManagers(uniqueManagers);
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


  function handleSelect(e) {
    setCurrent(e.target.value);

    if (e.target.value == "all") {
      setFiltered(items);
      setFilterAmmont(ammont);
      setFilterTotal(total);
    } else {
      let filteredOrders = items.filter(el => el.manager == e.target.value);
      setFiltered(filteredOrders);
      let summed = 0;
      let totalOrders = 0;
      for (let key in filteredOrders) {
        summed += Number(filteredOrders[key].price);
        totalOrders = Object.keys(filteredOrders).length;
      }
      setFilterAmmont(totalOrders);
      setFilterTotal(summed);
    }
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Layout title="Всі замовлення">
        <div className={styles.content}>
          <div>

          </div>
          {!profile ? (
            <a href="/">Login to continue</a>
          ) : (
              <table className="table-content">
                <thead>
                  <tr>
                    <td>Дата</td>
                    <td>№ замовлення</td>
                    <td>№ Видаткової</td>
                    <td>№ Переміщення</td>
                    <td>Сума</td>
                    <td>Відповідальний
                    {profile.fullName == "Гук Василь" ? (
                        <select name="manager" onChange={handleSelect}>
                          {managers.map(a => <option key={a} value={a} >{a}</option>)}
                          <option value="all" key="all" value="all">Всі</option>
                        </select>
                      ) : (
                          null
                        )}

                    </td>
                    <td>Тип оплати</td>
                    <td>Коментар</td>
                    <td>Перевірено</td>
                    <td>Змінити дані</td>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr key={order.order} style={order.checked ? { backgroundColor: '#00640050' } : {}}>
                      <td>{new Date(order.date_added).toLocaleDateString('uk-UA', options)}</td>
                      <td>{order.order}</td>
                      <td>{order.realization}</td>
                      <td>{order.transfer}</td>
                      <td>{order.price}</td>
                      <td>{order.manager}</td>
                      <td>{order.payment}</td>
                      <td>{order.comment}</td>
                      <td>{!order.checked ? (null) : (<p>перевірено</p>)}</td>
                      <td>
                        <Link href={`/order/${order._id}`}>
                          <a>Змінити замовлення</a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3">Разом:</td>
                    <td colSpan="2">Замовлень:  {filterAmmont}</td>
                    <td colSpan="2">На суму:  {new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(filterTotal)}</td>
                    <td colSpan="4"></td>
                  </tr>
                </tfoot>
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