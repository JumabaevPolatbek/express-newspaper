import * as React from 'react';
import { Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Title } from 'react-admin';
export default function Dashboard() {
	return (
		<Card sx={{ flexGrow: 1 }}>
			<Title title="Admin panel newspaper" />
			<Typography variant="h1">Welcome admin panel</Typography>
		</Card>
	);
}
