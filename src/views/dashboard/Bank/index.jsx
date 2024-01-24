import MainCard from '../../../ui-component/cards/MainCard';
import CustomTable from '../../../ui-component/table/CustomTable';
import useEntity from '../../../hooks/useEntity';
import TableActions from '../../../ui-component/table/table-actions/TableActions';
import { useNavigate } from 'react-router-dom';
import { isBrowser } from '../../../utils/utils';
import Swall from 'sweetalert2';
import { useContext } from 'react';
import { UserContext } from 'store/UserContext';
import { useEffect } from 'react';

const Banks = () => {
  const { data, isLoading, deleteProduct } = useEntity('bank_accounts');
  const navigate = useNavigate();

  const { isAdmin } = useContext(UserContext);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, []);

  const onEdit = (id) => {
    navigate(`/banks/${id}`);
  };

  const onDelete = (id) => {
    Swall.fire({
      title: '¿Está seguro de eliminar el banco?',
      text: 'Esta acción no se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, borrar!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
      }
    });
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      with: 30
    },
    {
      field: 'id_number',
      headerName: 'Numero de identificación',
      flex: 1
    },
    {
      field: 'account_name',
      headerName: 'Nombre de la cuenta',
      flex: 1
    },
    {
      field: 'bank_name',
      headerName: 'Nombre del banco',
      flex: 1
    },
    {
      field: 'account_number',
      headerName: 'Numero de cuenta',
      flex: 1
    },
    {
      field: 'account_type',
      headerName: 'Tipo de cuenta',
      flex: 1
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      renderCell: (params) => <TableActions onEdit={() => onEdit(params.row.id)} onDelete={() => onDelete(params.row.id)} />
    }
  ];

  return (
    <>
      <MainCard title="Bancos" addButtonLink={{ title: 'Añadir Banco', url: '/banks/add' }}>
        <CustomTable rows={data} columns={columns} loading={isLoading} />
      </MainCard>
    </>
  );
};

export default Banks;
