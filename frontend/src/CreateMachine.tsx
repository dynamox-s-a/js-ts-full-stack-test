import { EngineeringOutlined } from '@mui/icons-material';
import {
  Container,
  Box,
  Button,
  Avatar,
  Typography,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import UserCard from './components/UserCard';
import { MACHINE_TYPES } from './constants';
import { useNavigate } from 'react-router-dom';
import {
  useCreateMachineMutation,
  useGetMachinesQuery,
} from './features/monitor/monitorSlice';
import useAuth from './useAuth';
import MyCopyright from './components/MyCopyright';

export default function CreateMachine() {
  const n = useNavigate();
  const authContext = useAuth();
  const { refetch } = useGetMachinesQuery(authContext!.user.id);
  const [createMachine] = useCreateMachineMutation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);

    createMachine({
      name: `${d.get('name')}`,
      type: `${d.get('type')}`,
      userId: authContext!.user.id,
    })
      .unwrap()
      .then(() => {
        refetch().then(() => n('/machines'));
      })
      .catch((error: Error) => {
        alert('Error: try update later');
        console.log('Error: ', error);
      });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          paddingTop: '2rem',
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          <Button variant="outlined" onClick={() => n('/machines')}>
            Back
          </Button>
        </Box>

        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexGrow: 1,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <EngineeringOutlined />
          </Avatar>

          <Typography component="h1" variant="h5">
            Create Machine
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              padding: '2rem 0',
              alignSelf: 'stretch',
            }}
          >
            <FormControl fullWidth>
              <TextField
                name="name"
                label="New machine name"
                required
                fullWidth
                autoFocus
              />
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="sslId">Type</InputLabel>
              <Select
                name="type"
                labelId="sslId"
                label="Type"
                defaultValue={MACHINE_TYPES[0]}
                required
              >
                {MACHINE_TYPES.map((i: string | number, k: number) => (
                  <MenuItem key={k} value={i}>
                    {i}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button type="submit" variant="outlined" sx={{ m: '2rem 0' }}>
              Save
            </Button>
          </Box>
        </Box>
        <UserCard />
        <MyCopyright />
      </Box>
    </Container>
  );
}

export type newMachineParams = { userId: string; name: string; type: string };
