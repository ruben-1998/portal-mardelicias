import MainCard from '../../../ui-component/cards/MainCard';
import CustomTable from '../../../ui-component/table/CustomTable';
import useUsers from '../../../hooks/useUsers';
import TableActions from '../../../ui-component/table/table-actions/TableActions';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from 'store/UserContext';
import { useEffect } from 'react';

const Users = () => {
  const { users, isLoading } = useUsers();
  const { isAdmin } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, []);

  const onEdit = (id) => {
    navigate(`/users/${id}`);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1
    },
    {
      field: 'dni',
      headerName: 'Cédula',
      flex: 1,
      valueGetter: (params) => `${params.row.user_metadata.dni || ''}`
    },
    {
      field: 'user_metadata',
      headerName: 'Nombre Completo',
      sortable: false,
      flex: 1,
      valueGetter: (params) => `${params.row.user_metadata.first_name || ''} ${params.row.user_metadata.last_name || ''}`
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1
    },
    {
      field: 'phone',
      headerName: 'Telefono',
      flex: 1,
      valueGetter: (params) => `+593${params.row.phone}`
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: (params) => <TableActions onEdit={() => onEdit(params.row.id)} />
    }
  ];

  return (
    <>
      <MainCard title="Usuarios" addButtonLink={{ title: 'Añadir Usuario', url: '/users/add' }}>
        <CustomTable rows={users} columns={columns} loading={isLoading} />
      </MainCard>
    </>
  );
};

export default Users;
