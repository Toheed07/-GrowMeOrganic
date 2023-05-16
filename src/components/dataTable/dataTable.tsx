import { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DataModel from '../../model/dataModel';

const DataTable = () => {
  const [data, setData] = useState<DataModel[]>([]);
  const [loading, setLoading] = useState(true);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 500 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<DataModel[]>('https://jsonplaceholder.typicode.com/posts');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      {loading ? (
        'Loading...'
      ) : (
        <DataGrid rows={data} columns={columns} />
      )}
    </div>
  );
};

export default DataTable;
