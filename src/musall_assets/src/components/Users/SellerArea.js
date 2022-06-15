import { faker } from '@faker-js/faker';
import { Container, FormControlLabel, Grid, Stack, Switch, Typography, CircularProgress } from '@mui/material';
import { Button, CardActions, CardContent, Card, CardHeader } from '@mui/material';

import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from "react";
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import {
    AppConversionRates, AppCurrentSubject, AppCurrentVisits, AppNewsUpdate,
    AppOrderTimeline, AppTasks, AppTrafficBySite, AppWebsiteVisits, AppWidgetSummary
} from '../sections/@dashboard/app';

import UserService from "../../services/UserService";
import UploadButton from "../components/fileupload/UploadButton";
import PlugConnect from '@psychedelic/plug-connect';
import canisterIds from "../../../../../.dfx/local/canister_ids.json";



export default function SellerArea({ novaOne, user, setUser }) {
    const theme = useTheme();
    const [loading, setLoading] = useState(false);

    const canisterId1 = canisterIds.__Candid_UI.local;
    const canisterId2 = canisterIds.nova_one;
    const canisterId3 = canisterIds.nova_one_assets;
    const canisterIdUpload = canisterIds.fileupload;


    if (loading) {
        return (
            <Page title="Dashboard">
                <Container maxWidth="xl">
                    <Grid container justifyContent="center">
                        <CircularProgress disableShrink />
                    </Grid>
                </Container>
            </Page>
        )
    }

    return (
        <Page title="Dashboard">
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back {!user ? "" : !user.info[0].name ? user.user_id.toString() : user.info[0].name}!
                </Typography>
                <>
                    <PlugConnect
                        dark
                        title="login"
                        host="https://mainnet.dfinity.network"
                        whitelist={[canisterId1, canisterId2, canisterId3]}
                        onConnectCallback={() => console.log("Some callback")}
                    />
                </>
                <>
                    <UploadButton />
                </>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Weekly Plays" total={714000} icon="el:music" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Yearly Streams" total={1352831} color="info" icon="el:play-circle" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Instrument Orders" total={1723315} color="warning" icon="ic:baseline-add-shopping-cart" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Spam Bug Reports" total={23} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits
                            title="Overall Clicks"
                            subheader="(+69%) than last Month"
                            chartLabels={[
                                '01/01/2003',
                                '02/01/2003',
                                '03/01/2003',
                                '04/01/2003',
                                '05/01/2003',
                                '06/01/2003',
                                '07/01/2003',
                                '08/01/2003',
                                '09/01/2003',
                                '10/01/2003',
                                '11/01/2003',
                            ]}
                            chartData={[
                                {
                                    name: 'Singles',
                                    type: 'column',
                                    fill: 'solid',
                                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                {
                                    name: 'Albums',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                },
                                {
                                    name: 'Instruments',
                                    type: 'line',
                                    fill: 'solid',
                                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title="Current Visits"
                            chartData={[
                                { label: 'America', value: 4344 },
                                { label: 'Asia', value: 5435 },
                                { label: 'Europe', value: 1443 },
                                { label: 'Africa', value: 4443 },
                            ]}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.chart.blue[0],
                                theme.palette.chart.violet[0],
                                theme.palette.chart.yellow[0],
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Streams & Purchases"
                            subheader="(+43%) than last year"
                            chartData={[
                                { label: 'Italy', value: 400 },
                                { label: 'Japan', value: 430 },
                                { label: 'China', value: 448 },
                                { label: 'Canada', value: 470 },
                                { label: 'France', value: 540 },
                                { label: 'Germany', value: 580 },
                                { label: 'South Korea', value: 690 },
                                { label: 'Netherlands', value: 1100 },
                                { label: 'United States', value: 1200 },
                                { label: 'United Kingdom', value: 1380 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Top Plays"
                            chartLabels={['Be Mine', 'Human EP', 'All of Us', 'Grace EP', 'Love & Grace Album', 'Money']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppNewsUpdate
                            title="Upcoming Events"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: faker.name.jobTitle(),
                                description: faker.name.jobTitle(),
                                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                                postedAt: faker.date.recent(),
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppOrderTimeline
                            title="Overall Statistics"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                    '1983, orders, 10.67ETH',
                                    '67, Instrucments Hire',
                                    '10.5M, Album Plays',
                                    '245M,Total Songs Play',
                                    '23B, Total Song Clicks',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppTrafficBySite
                            title="Songs Searches Traffics"
                            list={[
                                {
                                    name: 'FaceBook',
                                    value: 323234,
                                    icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                                },
                                {
                                    name: 'Google',
                                    value: 341212,
                                    icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                                },
                                {
                                    name: 'Linkedin',
                                    value: 411213,
                                    icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                                },
                                {
                                    name: 'Twitter',
                                    value: 443232,
                                    icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppTasks
                            title="Tasks & ToDo"
                            list={[
                                { id: '1', label: 'Tour LA and Shutdow 02 Arena' },
                                { id: '2', label: 'Will Drop "Love & Lust Album."' },
                                { id: '3', label: 'Stakeholder Meeting' },
                                { id: '4', label: 'Studio Time' },
                                { id: '5', label: 'Instagram Live Session.' },
                            ]}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Page>
    );
}
