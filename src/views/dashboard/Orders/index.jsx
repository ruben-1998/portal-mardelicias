import { useNavigate } from 'react-router-dom';

import MainCard from '../../../ui-component/cards/MainCard';
import CustomLink from '../../../ui-component/custom-link/CustomLink';
import TableActions from '../../../ui-component/table/table-actions/TableActions';
import CustomTable from '../../../ui-component/table/CustomTable';
import moment from 'moment';
import useOrders from '../../../hooks/useOrders';
import { mutate } from 'swr';
import { deleteEntity } from 'services/methods';
import Swall from 'sweetalert2';
import { useContext } from 'react';
import { UserContext } from 'store/UserContext';

const Orders = () => {
  const { data, isLoading, error } = useOrders();
  const navigate = useNavigate();

  const { isAdmin } = useContext(UserContext);

  const deleteOrder = (id) => {
    Swall.fire({
      title: '¿Está seguro de eliminar la orden?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteEntity('orders', id).then(() => mutate(`/orders`));
      }
    });
  };

  const onView = (id) => {
    navigate(`/orders/${id}`);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'Order ID'
    },
    {
      field: 'users',
      headerName: 'Cliente',
      flex: 1,
      renderCell: (params) =>
        isAdmin ? (
          <CustomLink url={`/users/${params.row.users.id}`} title={`${params.row.users.first_name} ${params.row.users.last_name}`} />
        ) : (
          `${params.row.users.first_name} ${params.row.users.last_name}`
        )
    },
    {
      field: 'payment_method',
      headerName: 'Método de pago',
      flex: 1
    },
    {
      field: 'status',
      headerName: 'Estado',
      flex: 1
    },
    {
      field: 'total',
      headerName: 'Total',
      flex: 1,
      valueGetter: (params) => `$${params.row.total || ''}`
    },
    {
      field: 'created_at',
      headerName: 'Fecha de creación',
      valueGetter: (params) => `${moment(params.row.created_at).format('DD/MM/YYYY')}`,
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: (params) => <TableActions onView={() => onView(params.row.id)} onDelete={() => deleteOrder(params.row.id)} />
    }
  ];

  return (
    <>
      <MainCard title="Ordenes">
        <CustomTable rows={data} columns={columns} loading={isLoading} />
      </MainCard>
    </>
  );
};

export default Orders;
