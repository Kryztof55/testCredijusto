import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../../Components/Header";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Divider,
  TextField,
  Grid,
} from "@material-ui/core";

import "./style.scss";

const Dashboard = () => {
  const userState = useSelector((state) => state.usersReducer.users);

  const [dataCurrency, setDataCurrency] = useState();
  const [isUpdate, setIsUpdate] = useState(true);

  const [numberBTC, setNumberBTC] = useState(0.0);
  const [numberETH, setNumberETH] = useState(0.0);
  const [numberXRP, setNumberXRP] = useState(0.0);

  useEffect(() => {
    if (isUpdate) {
      requestCurrency();
      setIsUpdate(false);
    } else {
      setInterval(() => {
        requestCurrency();
      }, 15000);
    }
  }, []);

  const requestCurrency = () => {
    fetch(
      "https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,XRP&tsyms=USD,EUR,MXN",
      {
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setDataCurrency(res);
      });
  };

  const onHandleInput = (e) => {
    requestCurrency();

    let convertedBTC = parseFloat(e.target.value) / dataCurrency.BTC.MXN;
    let convertedETH = parseFloat(e.target.value) / dataCurrency.ETH.MXN;
    let convertedXRP = parseFloat(e.target.value) / dataCurrency.XRP.MXN;

    if (isNaN(convertedBTC)) {
      convertedBTC = 0;
      convertedETH = 0;
      convertedXRP = 0;
    }

    setNumberBTC(convertedBTC);
    setNumberETH(convertedETH);
    setNumberXRP(convertedXRP);
  };

  if (!dataCurrency) {
    return <h1>Loading...</h1>;
  }

  return (
    <React.Fragment>
      <Header
        nombre={userState?.nombre ? userState.nombre : "Estimado"}
        apellido={userState?.apellido ? userState.apellido : "Usuario"}
      />
      <Container maxWidth="lg">
        <TableContainer className="table" component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Moneda</TableCell>
                <TableCell align="right">USD</TableCell>
                <TableCell align="right">EUR</TableCell>
                <TableCell align="right">MXN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row">
                  BTC
                </TableCell>
                <TableCell align="right">{dataCurrency.BTC.USD}</TableCell>
                <TableCell align="right">{dataCurrency.BTC.EUR}</TableCell>
                <TableCell align="right">{dataCurrency.BTC.MXN}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  ETH
                </TableCell>
                <TableCell align="right">{dataCurrency.ETH.USD}</TableCell>
                <TableCell align="right">{dataCurrency.ETH.EUR}</TableCell>
                <TableCell align="right">{dataCurrency.ETH.MXN}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                  XRP
                </TableCell>
                <TableCell align="right">{dataCurrency.XRP.USD}</TableCell>
                <TableCell align="right">{dataCurrency.XRP.EUR}</TableCell>
                <TableCell align="right">{dataCurrency.XRP.MXN}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Divider />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="standard-number"
              label="MXN"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              name="number"
              onInput={onHandleInput}
            />
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" gutterBottom>
                  BTC
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {numberBTC}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" gutterBottom>
                  ETH
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {numberETH}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="subtitle2" gutterBottom>
                  XRP
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  {numberXRP}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Dashboard;
