import useSWR from 'swr';

import { getLastOrders, getOrders, getTotalFromAllOrders } from '../services/orders/orders';
import { useEffect, useState } from 'react';

const useOrders = () => {
  const ENTITY = 'orders';
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSells, setTotalSells] = useState(0);

  const { data, error, isLoading } = useSWR(`/${ENTITY}`, () => getOrders());
  const { data: dataTotalSell, isLoading: isLoadingTotalSells } = useSWR(`/${ENTITY}/totals`, () => getTotalFromAllOrders(ENTITY));
  const { data: dataLastOrders, isLoading: isLoadingLastOrders } = useSWR(`/${ENTITY}/last-orders`, () => getLastOrders());

  const getTotalSells = () => {
    let totalSum = 0;
    data?.data?.forEach(({ total }) => {
      totalSum += total;
    });
    setTotalOrders(totalSum);
  };

  const getTotalOrders = () => {
    let totalSum = 0;
    dataTotalSell?.data?.forEach(({ total }) => {
      totalSum += total;
    });
    setTotalSells(totalSum);
  };

  useEffect(() => {
    if (data?.data?.length > 0 && !isLoading) getTotalSells();
  }, [data, data?.data]);

  useEffect(() => {
    if (dataTotalSell?.data?.length > 0 && !isLoadingTotalSells) getTotalOrders();
  }, [dataTotalSell, dataTotalSell?.data]);

  return {
    data: data?.data,
    totalOrders,
    totalSells,
    isLoading,
    isLoadingTotalSells,
    dataLastOrders: dataLastOrders?.data,
    isLoadingLastOrders,
    error
  };
};

export default useOrders;
